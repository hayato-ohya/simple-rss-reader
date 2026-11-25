// Offscreen document: parses feed XML with DOMParser on behalf of the service worker
// (MV3 service workers have no DOM APIs). The parser itself lives in shared.js.

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg?.target !== "offscreen" || msg.type !== "parseFeed") return;
  try {
    const { items, siteUrl, iconUrl, logoUrl } = parseFeedXml(msg.text, msg.baseUrl);
    sendResponse({ ok: true, result: { items, siteUrl, iconUrl, logoUrl } });
  } catch (e) {
    sendResponse({ ok: false, error: e.message || String(e) });
  }
  return true;
});
