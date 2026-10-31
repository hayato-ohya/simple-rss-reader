// Offscreen document: parses feed XML with DOMParser on behalf of the service worker
// (MV3 service workers have no DOM APIs).

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg?.target !== "offscreen" || msg.type !== "parseFeed") return;
  try {
    sendResponse({ ok: true, items: parseFeedText(msg.text) });
  } catch (e) {
    sendResponse({ ok: false, error: e.message || String(e) });
  }
  return true;
});

// Get the first non-empty date string from an item, checking common tag names
// (pubDate / dc:date / published / updated / date, including namespaced ones)
function extractItemDate(el, tagNames) {
  for (const name of tagNames) {
    const nodes = el.getElementsByTagName(name);
    for (const n of nodes) {
      const v = (n.textContent || "").trim();
      if (v) return v;
    }
  }
  const DC = "http://purl.org/dc/elements/1.1/";
  const nodes = el.getElementsByTagNameNS(DC, "date");
  for (const n of nodes) {
    const v = (n.textContent || "").trim();
    if (v) return v;
  }
  return "";
}

function parseFeedText(text) {
  const xml = new DOMParser().parseFromString(text, "text/xml");
  if (xml.querySelector("parsererror")) throw new Error("XML parse error");

  const items = [];
  // RSS 2.0 / RSS 1.0
  const rssItems = xml.querySelectorAll("item");
  if (rssItems.length > 0) {
    rssItems.forEach((item) => {
      items.push({
        title: item.querySelector("title")?.textContent || "",
        link: item.querySelector("link")?.textContent || "",
        description: item.querySelector("description")?.textContent || "",
        pubDate: extractItemDate(item, ["pubDate", "pubdate", "date"]),
      });
    });
    return items;
  }
  // Atom
  xml.querySelectorAll("entry").forEach((entry) => {
    items.push({
      title: entry.querySelector("title")?.textContent || "",
      link:
        entry.querySelector('link[rel="alternate"]')?.getAttribute("href") ||
        entry.querySelector("link")?.getAttribute("href") ||
        entry.querySelector("link")?.textContent ||
        "",
      description:
        entry.querySelector("summary")?.textContent ||
        entry.querySelector("content")?.textContent ||
        "",
      pubDate: extractItemDate(entry, ["published", "updated", "issued", "modified"]),
    });
  });
  return items;
}
