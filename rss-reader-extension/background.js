importScripts("shared.js"); // parseFeedDate, mergeFeedItems, decodeFeedBytes, ...

// Open the reader, or focus it if a tab already has it open: each reader tab keeps its
// own copy of the state, so a second tab would overwrite the first one's changes.
chrome.action.onClicked.addListener(async () => {
  const readerUrl = chrome.runtime.getURL("reader.html");
  try {
    const contexts = await chrome.runtime.getContexts({ contextTypes: ["TAB"] });
    const open = contexts.find((c) => c.tabId >= 0 && (c.documentUrl || "").startsWith(readerUrl));
    if (open) {
      await chrome.tabs.update(open.tabId, { active: true });
      await chrome.windows.update(open.windowId, { focused: true });
      return;
    }
  } catch (e) {
    // fall through and open a new tab
  }
  chrome.tabs.create({ url: readerUrl });
});

function setIconFromPreference(isDark) {
  const folder = isDark ? "icons/dark" : "icons";
  chrome.action.setIcon({
    path: {
      16: `${folder}/icon16.png`,
      48: `${folder}/icon48.png`,
      128: `${folder}/icon128.png`,
    },
  });
}

async function restoreIcon() {
  const { prefersDarkIcon = false } = await chrome.storage.local.get("prefersDarkIcon");
  setIconFromPreference(prefersDarkIcon);
}

// Restore icon after browser restart (fires after Chrome finishes initializing the UI)
chrome.runtime.onStartup.addListener(restoreIcon);

// Restore icon when extension is installed/updated
chrome.runtime.onInstalled.addListener(restoreIcon);

// Update icon immediately when reader.js saves the preference
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.prefersDarkIcon !== undefined) {
    setIconFromPreference(changes.prefersDarkIcon.newValue);
  }
});

// Set up alarm based on stored interval. The service worker is restarted often (every
// storage write from the reader wakes it), so only touch the alarm when it is missing or
// its period changed; clearing and re-creating it on every start would keep postponing it.
async function setupAlarm() {
  const { autoRefreshMinutes = 5, backgroundRefresh = true } = await chrome.storage.local.get(["autoRefreshMinutes", "backgroundRefresh"]);
  const wanted = backgroundRefresh && autoRefreshMinutes > 0 ? autoRefreshMinutes : 0;
  const existing = await chrome.alarms.get("updateFeeds");
  if (!wanted) {
    if (existing) await chrome.alarms.clear("updateFeeds");
    return;
  }
  if (existing && existing.periodInMinutes === wanted) return;
  await chrome.alarms.clear("updateFeeds");
  chrome.alarms.create("updateFeeds", { delayInMinutes: wanted, periodInMinutes: wanted });
}

setupAlarm();

// Re-setup alarm when settings change
chrome.storage.onChanged.addListener((changes) => {
  if (changes.autoRefreshMinutes || changes.backgroundRefresh) {
    setupAlarm();
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "updateFeeds") {
    updateAllFeeds();
  }
});

async function isReaderOpen() {
  try {
    if (chrome.runtime.getContexts) {
      const ctx = await chrome.runtime.getContexts({ contextTypes: ["TAB"] });
      return ctx.length > 0;
    }
    const tabs = await chrome.tabs.query({ url: chrome.runtime.getURL("reader.html") + "*" });
    return tabs.length > 0;
  } catch (e) {
    return false; // when in doubt, refresh
  }
}

const FEED_FETCH_CONCURRENCY = 4;
let updating = false; // resets with the service worker, so a killed run can't leave it stuck

async function updateAllFeeds() {
  // A slow run must not overlap the next alarm: the two would close each other's
  // offscreen document and report bogus parse errors.
  if (updating) return;
  updating = true;
  try {
    await runFeedUpdate();
  } finally {
    updating = false;
  }
}

async function runFeedUpdate() {
  // Skip while the reader tab is open: it refreshes on its own timer.
  if (await isReaderOpen()) return;

  const { feeds: snapshot = [] } = await chrome.storage.local.get("feeds");
  if (snapshot.length === 0) return;

  // Results waiting to be written, keyed by feed URL. They are saved as they arrive
  // rather than once at the end, so a run cut short by the service worker's idle limit
  // keeps what it got; each save is also an extension API call, which resets that limit.
  const pending = new Map();
  let aborted = false;
  let saving = Promise.resolve();

  // Saves are chained so that concurrent workers never interleave their read-modify-write.
  const flush = () => {
    saving = saving
      .then(async () => {
        if (aborted || pending.size === 0) return;
        // If the reader was opened meanwhile it owns the data now; drop the rest of the
        // run rather than overwrite what the user is doing.
        if (await isReaderOpen()) {
          aborted = true;
          return;
        }
        const results = new Map(pending);
        pending.clear();
        // Re-read storage right before writing so edits made meanwhile (delete / move /
        // add) are preserved; merge results into the latest list by URL.
        const { feeds = [], readArticles = [], bookmarkedArticles = [] } =
          await chrome.storage.local.get(["feeds", "readArticles", "bookmarkedArticles"]);
        const readSet = new Set(readArticles);
        const bookmarkSet = new Set(bookmarkedArticles);
        for (const feed of feeds) {
          const r = results.get(feed.url);
          if (!r) continue;
          if (r.error) {
            feed.error = r.error;
            continue;
          }
          feed.items = mergeFeedItems(
            feed.items,
            r.items,
            (link) => readSet.has(link),
            (link) => bookmarkSet.has(link)
          );
          feed.lastUpdated = Date.now();
          delete feed.error;
        }
        await chrome.storage.local.set({ feeds });
      })
      .catch((e) => console.warn("Failed to save feeds", e));
    return saving;
  };

  const urls = [...new Set(snapshot.map((f) => f.url))];
  let next = 0;
  async function worker() {
    while (!aborted && next < urls.length) {
      const url = urls[next++];
      let result;
      try {
        const resp = await fetch(url, { cache: "no-cache", signal: AbortSignal.timeout(15000) });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const text = decodeFeedBytes(await resp.arrayBuffer(), resp.headers.get("content-type"));
        result = { items: await parseFeedViaOffscreen(text, resp.url || url) };
      } catch (e) {
        result = { error: e.message || String(e) };
      }
      pending.set(url, result);
      await flush();
    }
  }
  try {
    await Promise.all(Array.from({ length: FEED_FETCH_CONCURRENCY }, worker));
    await saving;
  } finally {
    await closeOffscreenDocument();
  }
  if (aborted) return;

  const { feeds = [], readArticles = [] } = await chrome.storage.local.get(["feeds", "readArticles"]);
  await prefetchArticleImages(feeds, new Set(readArticles));
}

// ===== og:image prefetch for unread articles without a feed image =====
const PREFETCH_MAX_PER_RUN = 40;
const PREFETCH_CONCURRENCY = 4;
const IMAGE_CACHE_MAX = 1500;

async function prefetchArticleImages(feeds, readSet) {
  const { imageCache = {} } = await chrome.storage.local.get("imageCache");
  const targets = [];
  for (const feed of feeds) {
    for (const it of feed.items || []) {
      if (!it.link || it.image || readSet.has(it.link)) continue;
      if (Object.prototype.hasOwnProperty.call(imageCache, it.link)) continue;
      if (!/^https?:\/\//i.test(it.link)) continue;
      targets.push(it);
    }
  }
  if (targets.length === 0) return;
  // Newest first so what the user sees at the top is ready
  targets.sort((a, b) => articleSortTime(b) - articleSortTime(a));
  const batch = targets.slice(0, PREFETCH_MAX_PER_RUN);

  const present = new Set();
  feeds.forEach((f) => (f.items || []).forEach((it) => it.link && present.add(it.link)));
  const persist = async () => {
    const entries = Object.entries(imageCache).filter(([l]) => present.has(l));
    await chrome.storage.local.set({ imageCache: Object.fromEntries(entries.slice(-IMAGE_CACHE_MAX)) });
  };

  // Page fetches are not extension API calls, so they don't keep the service worker
  // alive; persisting after every result both saves progress and resets the idle timer.
  let idx = 0;
  async function worker() {
    while (idx < batch.length) {
      const it = batch[idx++];
      imageCache[it.link] = await fetchPageImage(it.link).catch(() => "");
      await persist();
    }
  }
  await Promise.all(Array.from({ length: PREFETCH_CONCURRENCY }, worker));
}

// Fetch the head of an article page and pull og:image / twitter:image out of it
async function fetchPageImage(link) {
  const resp = await fetch(link, { signal: AbortSignal.timeout(10000), credentials: "omit" });
  if (!resp.ok) return "";
  const type = resp.headers.get("content-type") || "";
  if (type && !/html|xml/i.test(type)) return "";
  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let html = "";
  while (html.length < 200000) {
    const { done, value } = await reader.read();
    if (done) break;
    html += decoder.decode(value, { stream: true });
    if (html.includes("</head>")) break;
  }
  reader.cancel().catch(() => {});
  return extractOgImage(html, link);
}

function extractOgImage(html, baseUrl) {
  const metaRe = /<meta\b[^>]*>/gi;
  const names = /^(og:image|og:image:url|og:image:secure_url|twitter:image|twitter:image:src)$/i;
  let m;
  while ((m = metaRe.exec(html))) {
    const tag = m[0];
    const key = (tag.match(/\b(?:property|name)\s*=\s*["']([^"']+)["']/i) || [])[1];
    if (!key || !names.test(key.trim())) continue;
    const content = (tag.match(/\bcontent\s*=\s*["']([^"']*)["']/i) || [])[1];
    if (!content) continue;
    try {
      const abs = new URL(content.replace(/&amp;/g, "&").trim(), baseUrl).href;
      if (/^https?:\/\//i.test(abs)) return abs;
    } catch {
      // ignore malformed URL
    }
  }
  return "";
}

// ===== Offscreen document (DOMParser is unavailable in MV3 service workers) =====
const OFFSCREEN_URL = "offscreen.html";
let offscreenCreating = null;

async function ensureOffscreenDocument() {
  const contexts = await chrome.runtime.getContexts({
    contextTypes: ["OFFSCREEN_DOCUMENT"],
    documentUrls: [chrome.runtime.getURL(OFFSCREEN_URL)],
  });
  if (contexts.length > 0) return;
  if (!offscreenCreating) {
    offscreenCreating = chrome.offscreen
      .createDocument({
        url: OFFSCREEN_URL,
        reasons: ["DOM_PARSER"],
        justification: "Parse RSS/Atom feed XML with DOMParser",
      })
      .finally(() => {
        offscreenCreating = null;
      });
  }
  await offscreenCreating;
}

async function closeOffscreenDocument() {
  try {
    await chrome.offscreen.closeDocument();
  } catch (e) {
    // No document open — ignore
  }
}

async function parseFeedViaOffscreen(text, baseUrl) {
  await ensureOffscreenDocument();
  const res = await chrome.runtime.sendMessage({ target: "offscreen", type: "parseFeed", text, baseUrl });
  if (!res) throw new Error("No response from parser");
  if (!res.ok) throw new Error(res.error);
  return res.items;
}
