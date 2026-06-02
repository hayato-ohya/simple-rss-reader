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
      const text = await resp.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "text/xml");
      const newItems = parseItems(xml);

      // Keep existing unread articles not present in the new fetch
      const newLinks = new Set(newItems.map(i => i.link).filter(Boolean));
      const keptUnread = (feed.items || []).filter(
        item => item.link && !newLinks.has(item.link) && !readSet.has(item.link)
      );
      feed.items = [...newItems, ...keptUnread];
      feed.lastUpdated = Date.now();
      delete feed.error;
    } catch (e) {
      feed.error = e.toString();
    }
  }
  await chrome.storage.local.set({ feeds });
}

function parseItems(xml) {
  const items = [];
  // RSS 2.0
  const rssItems = xml.querySelectorAll("item");
  if (rssItems.length > 0) {
    rssItems.forEach((item) => {
      items.push({
        title: item.querySelector("title")?.textContent || "",
        link: item.querySelector("link")?.textContent || "",
        description: item.querySelector("description")?.textContent || "",
        pubDate: item.querySelector("pubDate")?.textContent || "",
      });
    });
    return items;
  }
  // Atom
  const entries = xml.querySelectorAll("entry");
  entries.forEach((entry) => {
    items.push({
      title: entry.querySelector("title")?.textContent || "",
      link:
        entry.querySelector("link")?.getAttribute("href") ||
        entry.querySelector("link")?.textContent ||
        "",
      description:
        entry.querySelector("summary")?.textContent ||
        entry.querySelector("content")?.textContent ||
        "",
      pubDate:
        entry.querySelector("published")?.textContent ||
        entry.querySelector("updated")?.textContent ||
        "",
    });
  });
  return items;
}
