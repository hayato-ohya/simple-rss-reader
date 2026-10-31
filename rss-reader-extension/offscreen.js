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

// Find a representative image for an item: enclosure / media:thumbnail / media:content,
// else the first <img> in the HTML body. Returns "" if none.
function isTinyImage(img, src) {
  if (/favicon|\/s2\/favicons|st-hatena\.com\/64|\.gif(\?|$)/i.test(src)) return true;
  const w = parseInt(img.getAttribute("width"), 10);
  const h = parseInt(img.getAttribute("height"), 10);
  return (!isNaN(w) && w <= 64) || (!isNaN(h) && h <= 64);
}

function extractItemImage(el, htmlCandidates) {
  const HATENA = "http://www.hatena.ne.jp/info/xmlns#";
  for (const n of el.getElementsByTagNameNS(HATENA, "imageurl")) {
    const url = (n.textContent || "").trim();
    if (/^https?:\/\//i.test(url)) return url;
  }
  const MRSS = "http://search.yahoo.com/mrss/";
  for (const enc of el.getElementsByTagName("enclosure")) {
    const type = enc.getAttribute("type") || "";
    const url = enc.getAttribute("url") || "";
    if (url && (type.startsWith("image/") || /\.(jpe?g|png|gif|webp|avif)(\?|$)/i.test(url))) return url;
  }
  for (const tag of ["thumbnail", "content"]) {
    for (const m of el.getElementsByTagNameNS(MRSS, tag)) {
      const url = m.getAttribute("url") || "";
      const type = m.getAttribute("type") || "";
      const medium = m.getAttribute("medium") || "";
      if (url && (tag === "thumbnail" || medium === "image" || type.startsWith("image/") || /\.(jpe?g|png|gif|webp|avif)(\?|$)/i.test(url))) return url;
    }
  }
  for (const html of htmlCandidates) {
    if (!html || !html.includes("<")) continue;
    const doc = new DOMParser().parseFromString(html, "text/html");
    for (const img of doc.querySelectorAll("img[src]")) {
      const src = img.getAttribute("src") || "";
      if (!/^https?:\/\//i.test(src)) continue;
      if (isTinyImage(img, src)) continue; // skip favicons / tracking pixels
      return src;
    }
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
      const description = item.querySelector("description")?.textContent || "";
      const encoded = item.getElementsByTagNameNS("http://purl.org/rss/1.0/modules/content/", "encoded")[0]?.textContent || "";
      items.push({
        title: item.querySelector("title")?.textContent || "",
        link: item.querySelector("link")?.textContent || "",
        description,
        pubDate: extractItemDate(item, ["pubDate", "pubdate", "date"]),
        image: extractItemImage(item, [encoded, description]),
      });
    });
    return items;
  }
  // Atom
  xml.querySelectorAll("entry").forEach((entry) => {
    const summary = entry.querySelector("summary")?.textContent || "";
    const content = entry.querySelector("content")?.textContent || "";
    items.push({
      title: entry.querySelector("title")?.textContent || "",
      link:
        entry.querySelector('link[rel="alternate"]')?.getAttribute("href") ||
        entry.querySelector("link")?.getAttribute("href") ||
        entry.querySelector("link")?.textContent ||
        "",
      description: summary || content,
      pubDate: extractItemDate(entry, ["published", "updated", "issued", "modified"]),
      image: extractItemImage(entry, [content, summary]),
    });
  });
  return items;
}
