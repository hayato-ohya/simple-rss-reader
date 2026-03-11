chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: chrome.runtime.getURL("reader.html") });
});

// Set up alarm based on stored interval
async function setupAlarm() {
  const { autoRefreshMinutes = 5 } = await chrome.storage.local.get("autoRefreshMinutes");
  await chrome.alarms.clear("updateFeeds");
  if (autoRefreshMinutes > 0) {
    chrome.alarms.create("updateFeeds", { periodInMinutes: autoRefreshMinutes });
  }
}

setupAlarm();

// Re-setup alarm when settings change
chrome.storage.onChanged.addListener((changes) => {
  if (changes.autoRefreshMinutes) {
    setupAlarm();
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "updateFeeds") {
    updateAllFeeds();
  }
});

async function updateAllFeeds() {
  const { feeds = [] } = await chrome.storage.local.get("feeds");
  for (const feed of feeds) {
    try {
      const resp = await fetch(feed.url);
      const text = await resp.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "text/xml");
      const items = parseItems(xml);
      feed.items = items;
      feed.lastUpdated = Date.now();
    } catch (e) {
      // skip failed feeds
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
