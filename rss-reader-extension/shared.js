// Code shared by the reader page, the background service worker (importScripts) and the
// offscreen document. The DOM-based functions are only called where a DOM exists
// (reader page / offscreen document).

// ===== Decoding =====
// Decode a feed response. resp.text() always assumes UTF-8, which garbles Shift_JIS /
// EUC-JP feeds. Order: BOM -> encoding in the XML declaration -> Content-Type charset
// -> UTF-8.
function decodeFeedBytes(buffer, contentType) {
  const bytes = new Uint8Array(buffer);
  let encoding = "";
  if (bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf) encoding = "utf-8";
  else if (bytes[0] === 0xfe && bytes[1] === 0xff) encoding = "utf-16be";
  else if (bytes[0] === 0xff && bytes[1] === 0xfe) encoding = "utf-16le";
  if (!encoding) {
    const head = new TextDecoder("latin1").decode(bytes.subarray(0, 300));
    encoding =
      (head.match(/<\?xml[^>]*\bencoding\s*=\s*["']([\w.:-]+)["']/i) || [])[1] ||
      ((contentType || "").match(/charset\s*=\s*["']?([\w.:-]+)/i) || [])[1] ||
      "utf-8";
  }
  let decoder;
  try {
    decoder = new TextDecoder(encoding);
  } catch {
    decoder = new TextDecoder("utf-8"); // unknown label
  }
  return decoder.decode(bytes);
}

// ===== Dates =====
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

// Sort key: parsed publication time, else the time we first saw the item
function articleSortTime(item) {
  if (typeof item.timestamp === "number") return item.timestamp;
  const t = parseFeedDate(item.pubDate);
  if (t !== null) return t;
  return item.firstSeen || 0;
}

// ===== Merging =====
// Merge new items with existing items. Items that dropped out of the feed are kept while
// bookmarked (always) or unread (newest MAX_KEPT_UNREAD_PER_FEED only, so storage can't
// grow without bound). firstSeen is carried over so undated items keep a stable position.
// The item body is not stored: it is only needed to find an image, which the parser has
// already done, and it is by far the largest part of an item.
const MAX_KEPT_UNREAD_PER_FEED = 200;
function mergeFeedItems(existingItems, newItems, isRead, isBookmarked) {
  const now = Date.now();
  const existingByLink = new Map();
  (existingItems || []).forEach((it) => {
    if (it.link) existingByLink.set(it.link, it);
  });
  const merged = newItems.map((it) => {
    const { description, ...rest } = it;
    const prev = existingByLink.get(it.link);
    const timestamp = parseFeedDate(it.pubDate);
    return {
      ...rest,
      timestamp: timestamp === null ? null : timestamp,
      firstSeen: prev?.firstSeen || now,
    };
  });
  const newLinks = new Set(newItems.map((it) => it.link).filter(Boolean));
  const gone = (existingItems || []).filter((it) => it.link && !newLinks.has(it.link));
  const bookmarked = gone.filter((it) => isBookmarked(it.link));
  const unread = gone
    .filter((it) => !isBookmarked(it.link) && !isRead(it.link))
    .sort((a, b) => articleSortTime(b) - articleSortTime(a))
    .slice(0, MAX_KEPT_UNREAD_PER_FEED);
  return [...merged, ...bookmarked, ...unread];
}

// ===== Feed parsing (needs DOMParser) =====
const ATOM_NS = "http://www.w3.org/2005/Atom";
const RSS_NAMESPACES = [null, "http://purl.org/rss/1.0/", "http://my.netscape.com/rdf/simple/0.9/"];

// Text of an RSS element's own child <name>. A bare selector like "link" also matches
// <atom:link>, which WordPress puts before <link> and which has no text.
function rssChildText(parent, name) {
  for (const el of parent.children) {
    if (el.localName === name && RSS_NAMESPACES.includes(el.namespaceURI)) return el.textContent || "";
  }
  return parent.querySelector(`:scope > ${name}`)?.textContent || "";
}

// Plain text of an HTML fragment (tags dropped, entities decoded)
function htmlToText(html) {
  return new DOMParser().parseFromString(html, "text/html").body.textContent || "";
}

function collapseSpaces(s) {
  return s.replace(/\s+/g, " ").trim();
}

// RSS doesn't say whether a title is plain text or HTML, and many feeds escape twice, so
// "&amp;" or "<b>" show up literally. Decode entities and drop inline formatting tags, but
// leave any other "<...>" alone: a title like "The <dialog> element" is real text.
function cleanRssTitle(raw) {
  let s = (raw || "").replace(/<\/?(?:b|i|em|strong|u|span|font|small|mark|sub|sup|br)\b[^>]*>/gi, "");
  if (/&(?:#\d+|#x[0-9a-f]+|[a-z][a-z0-9]+);/i.test(s)) {
    s = htmlToText(s.replace(/</g, "&lt;")); // decodes entities only
  }
  return collapseSpaces(s);
}

// Atom says what a text construct is: type="html" is markup, anything else is text as is
function atomText(el) {
  if (!el) return "";
  const s = el.textContent || "";
  return collapseSpaces((el.getAttribute("type") || "").toLowerCase() === "html" ? htmlToText(s) : s);
}

function isHttpUrl(s) {
  return /^\s*https?:\/\//i.test(s || "");
}

// Article link as stored. Absolute http(s) links are returned exactly as written, because
// read / bookmark state is keyed by this string and must not change for existing items.
// Relative links are resolved against the feed URL; anything that isn't http(s) is dropped.
function resolveItemLink(raw, baseUrl) {
  const s = raw || "";
  if (isHttpUrl(s)) return s;
  if (!s.trim()) return "";
  try {
    const abs = new URL(s.trim(), baseUrl).href;
    return isHttpUrl(abs) ? abs : "";
  } catch {
    return "";
  }
}

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

function isTinyImage(img, src) {
  if (/favicon|\/s2\/favicons|st-hatena\.com\/64|\.gif(\?|$)/i.test(src)) return true;
  const w = parseInt(img.getAttribute("width"), 10);
  const h = parseInt(img.getAttribute("height"), 10);
  return (!isNaN(w) && w <= 64) || (!isNaN(h) && h <= 64);
}

// Find a representative image for an item: enclosure / media:thumbnail / media:content,
// else the first <img> in the HTML body. Returns "" if none.
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

// Parse RSS 2.0 / RSS 1.0 / Atom text into { title, description, siteUrl, items }.
// baseUrl (the feed's URL) is used to resolve relative article links.
// Throws an Error with .code "xml" (not well-formed) or "format" (not a feed).
// Items without a usable http(s) link are skipped: the reader can only open links, and
// everything about an article (read state, bookmarks) is keyed by its link.
function parseFeedXml(text, baseUrl) {
  const xml = new DOMParser().parseFromString(text, "text/xml");
  if (xml.querySelector("parsererror")) {
    throw Object.assign(new Error("XML parse error"), { code: "xml" });
  }

  const result = { title: "", description: "", siteUrl: "", items: [] };
  const addItem = (item) => {
    if (item.link) result.items.push(item);
  };

  // RSS 2.0 / RSS 1.0 (RDF)
  const channel = xml.querySelector("channel");
  if (channel) {
    result.title = cleanRssTitle(rssChildText(channel, "title"));
    result.description = rssChildText(channel, "description");
    result.siteUrl = rssChildText(channel, "link").trim();

    xml.querySelectorAll("item").forEach((item) => {
      const description = rssChildText(item, "description");
      const encoded =
        item.getElementsByTagNameNS("http://purl.org/rss/1.0/modules/content/", "encoded")[0]?.textContent || "";
      // <guid> is the article URL in many feeds that omit <link>
      const guid = rssChildText(item, "guid");
      addItem({
        title: cleanRssTitle(rssChildText(item, "title")),
        link: resolveItemLink(rssChildText(item, "link"), baseUrl) || (isHttpUrl(guid) ? guid : ""),
        description,
        pubDate: extractItemDate(item, ["pubDate", "pubdate", "date"]),
        image: extractItemImage(item, [encoded, description]),
      });
    });
    return result;
  }

  // Atom
  const atomFeed = xml.querySelector("feed");
  if (atomFeed) {
    result.title = atomText(atomFeed.querySelector(":scope > title"));
    result.description = atomFeed.querySelector(":scope > subtitle")?.textContent || "";
    const siteLink =
      atomFeed.querySelector(':scope > link[rel="alternate"]') ||
      atomFeed.querySelector(":scope > link:not([rel])");
    result.siteUrl = siteLink?.getAttribute("href") || "";

    xml.querySelectorAll("entry").forEach((entry) => {
      const rawLink =
        entry.querySelector('link[rel="alternate"]')?.getAttribute("href") ||
        entry.querySelector("link")?.getAttribute("href") ||
        entry.querySelector("link")?.textContent ||
        "";
      const id = entry.querySelector(":scope > id")?.textContent || "";
      const summary = entry.querySelector("summary")?.textContent || "";
      const content = entry.querySelector("content")?.textContent || "";
      addItem({
        title: atomText(entry.querySelector(":scope > title")),
        link: resolveItemLink(rawLink, baseUrl) || (isHttpUrl(id) ? id : ""),
        description: summary || content,
        pubDate: extractItemDate(entry, ["published", "updated", "issued", "modified"]),
        image: extractItemImage(entry, [content, summary]),
      });
    });
    return result;
  }

  throw Object.assign(new Error("Unsupported feed format"), { code: "format" });
}
