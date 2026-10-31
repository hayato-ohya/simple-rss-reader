chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: chrome.runtime.getURL("reader.html") });
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

// Set up alarm based on stored interval
async function setupAlarm() {
  const { autoRefreshMinutes = 5, backgroundRefresh = true } = await chrome.storage.local.get(["autoRefreshMinutes", "backgroundRefresh"]);
  await chrome.alarms.clear("updateFeeds");
  if (backgroundRefresh && autoRefreshMinutes > 0) {
    chrome.alarms.create("updateFeeds", { periodInMinutes: autoRefreshMinutes });
  }
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

async function updateAllFeeds() {
  const { feeds = [], readArticles = [] } = await chrome.storage.local.get(["feeds", "readArticles"]);
  const readSet = new Set(readArticles);

  for (const feed of feeds) {
    try {
      const resp = await fetch(feed.url);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const text = await resp.text();
      const newItems = await parseFeedViaOffscreen(text);

      feed.items = mergeFeedItems(feed.items, newItems, (link) => readSet.has(link));
      feed.lastUpdated = Date.now();
      delete feed.error;
    } catch (e) {
      feed.error = e.toString();
    }
  }
  await chrome.storage.local.set({ feeds });
  await closeOffscreenDocument();
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

async function parseFeedViaOffscreen(text) {
  await ensureOffscreenDocument();
  const res = await chrome.runtime.sendMessage({ target: "offscreen", type: "parseFeed", text });
  if (!res) throw new Error("No response from parser");
  if (!res.ok) throw new Error(res.error);
  return res.items;
}

// ===== Date helpers =====
// Parse a feed date string into a millisecond timestamp. Returns null if unparseable.
function parseFeedDate(str) {
  if (!str) return null;
  let s = String(str).trim();
  if (!s) return null;

  // Normalize common non-standard timezone abbreviations
  s = s.replace(/\b(JST)\b/i, "+0900").replace(/\bUT\b/, "UTC");

  let t = Date.parse(s);
  if (!isNaN(t)) return t;

  // YYYY-MM-DD[ T]hh:mm[:ss][.sss][Z|+hh:mm|+hhmm]  (also with "/" separators)
  const m = s.match(
    /^(\d{4})[-\/.](\d{1,2})[-\/.](\d{1,2})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?(?:\.\d+)?)?\s*(Z|[+-]\d{2}:?\d{2})?$/i
  );
  if (m) {
    const [, y, mo, d, h = "0", mi = "0", se = "0", tz] = m;
    if (tz) {
      const tzNorm = tz.toUpperCase() === "Z" ? "Z" : tz.replace(/^([+-]\d{2})(\d{2})$/, "$1:$2");
      t = Date.parse(
        `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}T${h.padStart(2, "0")}:${mi}:${se}${tzNorm}`
      );
    } else {
      t = new Date(+y, +mo - 1, +d, +h, +mi, +se).getTime();
    }
    if (!isNaN(t)) return t;
  }

  // Last resort: strip day-of-week / trailing text and retry
  const stripped = s.replace(/^[A-Za-z]{3,},\s*/, "").replace(/\s*\(.*\)$/, "");
  t = Date.parse(stripped);
  return isNaN(t) ? null : t;
}

// Merge new items with existing items: keep unread items missing from the new fetch,
// and carry over firstSeen so undated items keep a stable position.
function mergeFeedItems(existingItems, newItems, isRead) {
  const now = Date.now();
  const existingByLink = new Map();
  (existingItems || []).forEach((it) => {
    if (it.link) existingByLink.set(it.link, it);
  });
  const merged = newItems.map((it) => {
    const prev = existingByLink.get(it.link);
    const timestamp = parseFeedDate(it.pubDate);
    return {
      ...it,
      timestamp: timestamp === null ? null : timestamp,
      firstSeen: prev?.firstSeen || now,
    };
  });
  const newLinks = new Set(newItems.map((it) => it.link).filter(Boolean));
  const keptUnread = (existingItems || []).filter(
    (it) => it.link && !newLinks.has(it.link) && !isRead(it.link)
  );
  return [...merged, ...keptUnread];
}
