// ===== i18n =====
const translations = {
  ja: {
    appTitle: "RSSリーダー",
    refresh: "更新",
    settings: "設定",
    addFolder: "フォルダを追加",
    addFeed: "フィードを追加",
    search: "検索...",
    listView: "リスト表示",
    cardView: "カード表示",
    selectFeed: "フィードを選択してください",
    allFeeds: "すべてのフィード",
    bookmarks: "ブックマーク",
    noFeeds: "フィードが登録されていません",
    noFeedsHint: "「フィードを追加」からRSSフィードを登録してください",
    noArticles: "記事がありません",
    showReadArticles: "既読の記事を表示",
    markAllRead: "すべて既読にする",
    markAllReadConfirm: "表示中の未読 ${n} 件をすべて既読にしますか？",
    shortcuts: "⌨ キーボードショートカット",
    keyNextPrev: "次 / 前の記事を選択",
    keyOpen: "選択した記事を開く",
    keyOpenBackground: "バックグラウンドで開く",
    keyRead: "既読 / 未読を切り替え",
    keyBookmark: "ブックマークを切り替え",
    keySearch: "検索欄へ移動",
    keyRefresh: "フィードを更新",
    keyHelp: "このヘルプを表示",
    keyEscape: "ダイアログを閉じる / 検索欄から抜ける",
    close: "閉じる",
    feedExists: "このフィードは登録済みです",
    invalidUrl: "URLが正しくありません",
    shareTwitter: "Twitterで共有",
    shareFacebook: "Facebookで共有",
    bookmark: "ブックマーク",
    moveToFolder: "フォルダに移動",
    removeFromFolder: "フォルダから外す",
    deleteFeed: "フィードを削除",
    renameFolder: "名前を変更",
    deleteFolder: "フォルダを削除",
    newFolderName: "新しいフォルダ名:",
    feedUrl: "フィードURL",
    feedName: "表示名（任意）",
    feedFolder: "フォルダ（任意）",
    folderNone: "なし（ルート）",
    cancel: "キャンセル",
    add: "追加",
    folderName: "フォルダ名",
    enterUrl: "URLを入力してください",
    enterFolderName: "フォルダ名を入力してください",
    loading: "読み込み中...",
    fetchError: "フィードの取得に失敗しました: ",
    xmlParseError: "XMLの解析に失敗しました",
    feedTooLarge: "フィードが大きすぎます（10MB超）",
    feedNamePlaceholder: "フィード名",
    deleteFeedConfirm: "フィード「${name}」を削除しますか？",
    deleteFeedConfirmBookmarks: "フィード「${name}」を削除しますか？\nこのフィードのブックマーク ${n} 件も削除されます。",
    deleteFolderConfirm: "フォルダ「${name}」を削除しますか？（中のフィードは残ります）",
    unsupportedFormat: "対応するフィード形式が見つかりません",
    justNow: "たった今",
    minutesAgo: "${n} 分前",
    hoursAgo: "${n} 時間前",
    daysAgo: "${n} 日前",
    opmlImport: "OPMLインポート",
    opmlExport: "OPMLエクスポート",
    opmlExportTitle: "RSSリーダー フィード一覧",
    opmlParseError: "OPMLファイルの解析に失敗しました。",
    opmlFormatError: "OPMLの形式が正しくありません。",
    opmlImportDone: "インポート完了: ${feeds} フィード、${folders} フォルダを追加しました。",
    opmlImportError: "インポートに失敗しました: ",
    darkMode: "🌙 ダークモード",
    lightMode: "☀ ライトモード",
    markReadOnScroll: "スクロールで既読にする",
    hideRead: "既読を非表示にする",
    font: "フォント",
    fontDefault: "デフォルト",
    autoRefresh: "自動更新間隔",
    backgroundRefresh: "バックグラウンド更新",
    off: "オフ",
    minutes: "${n}分",
    language: "言語 / Language",
    defaultFolder: "フォルダ",
    feedStats: "フィード統計",
    statFeeds: "登録フィード数",
    statFeedsSub: "フォルダ内 ${inFolder} / フォルダなし ${root}",
    statActive30: "30日以内に更新あり",
    statDormant: "半年以上更新なし",
    statTotalRate: "全体の更新ペース",
    statErrors: "取得エラー ${n} 件",
    statsNote: "更新頻度は各フィードに現在含まれている記事の日付から推定しています（フィードに載る件数はサイトにより異なります。古い記事が混ざっていても影響しないよう、最も古い2割は除いて計算）。「直近30日」の「+」は、フィード内の記事がすべて30日以内のもので、実際にはそれ以上更新されている可能性があることを示します。見出しをクリックすると並べ替え、行をクリックするとそのフィードを表示します。",
    colFeed: "フィード",
    colLast: "最終更新",
    colRate: "更新頻度",
    colInterval: "平均間隔",
    colLast30: "直近30日",
    colUnread: "未読",
    perWeek: "週 ${n} 件",
    perMonth: "月 ${n} 件",
    perYear: "年 ${n} 件",
    intervalDays: "${n} 日",
    intervalHours: "${n} 時間",
    noDates: "日付なし",
  },
  en: {
    appTitle: "RSS Reader",
    refresh: "Refresh",
    settings: "Settings",
    addFolder: "Add Folder",
    addFeed: "Add Feed",
    search: "Search...",
    listView: "List View",
    cardView: "Card View",
    selectFeed: "Select a feed",
    allFeeds: "All Feeds",
    bookmarks: "Bookmarks",
    noFeeds: "No feeds registered",
    noFeedsHint: "Click \"Add Feed\" to register an RSS feed",
    noArticles: "No articles",
    showReadArticles: "Show read articles",
    markAllRead: "Mark all as read",
    markAllReadConfirm: "Mark the ${n} unread article(s) in this view as read?",
    shortcuts: "⌨ Keyboard shortcuts",
    keyNextPrev: "Select next / previous article",
    keyOpen: "Open the selected article",
    keyOpenBackground: "Open in the background",
    keyRead: "Toggle read / unread",
    keyBookmark: "Toggle bookmark",
    keySearch: "Go to the search box",
    keyRefresh: "Refresh feeds",
    keyHelp: "Show this help",
    keyEscape: "Close a dialog / leave the search box",
    close: "Close",
    feedExists: "This feed is already registered",
    invalidUrl: "Invalid URL",
    shareTwitter: "Share on Twitter",
    shareFacebook: "Share on Facebook",
    bookmark: "Bookmark",
    moveToFolder: "Move to Folder",
    removeFromFolder: "Remove from Folder",
    deleteFeed: "Delete Feed",
    renameFolder: "Rename",
    deleteFolder: "Delete Folder",
    newFolderName: "New folder name:",
    feedUrl: "Feed URL",
    feedName: "Display Name (optional)",
    feedFolder: "Folder (optional)",
    folderNone: "None (Root)",
    cancel: "Cancel",
    add: "Add",
    folderName: "Folder Name",
    enterUrl: "Please enter a URL",
    enterFolderName: "Please enter a folder name",
    loading: "Loading...",
    fetchError: "Failed to fetch feed: ",
    xmlParseError: "Failed to parse XML",
    feedTooLarge: "The feed is too large (over 10 MB)",
    feedNamePlaceholder: "Feed name",
    deleteFeedConfirm: "Delete the feed \"${name}\"?",
    deleteFeedConfirmBookmarks: "Delete the feed \"${name}\"?\nIts ${n} bookmark(s) will be deleted too.",
    deleteFolderConfirm: "Delete the folder \"${name}\"? (Its feeds are kept.)",
    unsupportedFormat: "Unsupported feed format",
    justNow: "Just now",
    minutesAgo: "${n}m ago",
    hoursAgo: "${n}h ago",
    daysAgo: "${n}d ago",
    opmlImport: "Import OPML",
    opmlExport: "Export OPML",
    opmlExportTitle: "RSS Reader Feed List",
    opmlParseError: "Failed to parse OPML file.",
    opmlFormatError: "Invalid OPML format.",
    opmlImportDone: "Import complete: ${feeds} feed(s), ${folders} folder(s) added.",
    opmlImportError: "Import failed: ",
    darkMode: "🌙 Dark Mode",
    lightMode: "☀ Light Mode",
    markReadOnScroll: "Mark as read on scroll",
    hideRead: "Hide read articles",
    font: "Font",
    fontDefault: "Default",
    autoRefresh: "Auto-refresh Interval",
    backgroundRefresh: "Background Refresh",
    off: "Off",
    minutes: "${n}min",
    language: "Language / 言語",
    defaultFolder: "Folder",
    feedStats: "Feed Stats",
    statFeeds: "Feeds",
    statFeedsSub: "${inFolder} in folders / ${root} without",
    statActive30: "Updated in last 30 days",
    statDormant: "No updates for 6+ months",
    statTotalRate: "Total update pace",
    statErrors: "${n} failed to load",
    statsNote: "Update frequency is estimated from the dates of the articles each feed currently contains (how many a feed carries varies by site; the oldest 20% are left out so that a few old articles mixed in don't skew it). A \"+\" in Last 30 days means every article in the feed is from the last 30 days, so the feed may update more than shown. Click a heading to sort, or a row to open the feed.",
    colFeed: "Feed",
    colLast: "Last update",
    colRate: "Frequency",
    colInterval: "Avg. interval",
    colLast30: "Last 30 days",
    colUnread: "Unread",
    perWeek: "${n}/week",
    perMonth: "${n}/month",
    perYear: "${n}/year",
    intervalDays: "${n} days",
    intervalHours: "${n} hours",
    noDates: "No dates",
  },
};

let language = "ja";

function t(key, params) {
  const str = (translations[language] || translations.ja)[key] || key;
  if (!params) return str;
  return str.replace(/\$\{(\w+)\}/g, (_, k) => params[k] ?? "");
}

// ===== State =====
let feeds = [];
let folders = []; // { id, name, collapsed }
let selection = { type: "all" }; // { type: 'all' } | { type: 'folder', folderId } | { type: 'feed', feedIndex }
let readArticles = new Set();
let bookmarkedArticles = new Set();
let searchQuery = "";
let isCardView = false;
let darkMode = false;
let markReadOnScroll = true;
let hideReadArticles = true;
let tempShowRead = false;
let fontFamily = "";
let autoRefreshMinutes = 5;
let autoRefreshTimer = null;
let backgroundRefresh = true;
let refreshing = false;
// Timestamps used to tell user scrolling apart from scrolls we trigger ourselves
let lastUserScrollAt = -Infinity;
let lastProgrammaticScrollAt = -Infinity;
const USER_SCROLL_WINDOW_MS = 1500;
let imageCache = {}; // link -> image URL ("" = none found)
let imageCacheDirty = false;
let imageCacheSaveTimer = null;
const imageFetchQueue = [];
const imageFetchQueued = new Set();
let imageFetchActive = 0;
const IMAGE_FETCH_CONCURRENCY = 4;
const IMAGE_CACHE_MAX = 1500;
let lastSavedFeedsJson = null; // to ignore storage.onChanged for our own writes

// ===== DOM Elements =====
const feedListEl = document.getElementById("feed-list");
const articleListEl = document.getElementById("article-list");
const feedTitleEl = document.getElementById("feed-title");
const searchInput = document.getElementById("search-input");
const modalOverlay = document.getElementById("modal-overlay");
const modalError = document.getElementById("modal-error");
const feedUrlInput = document.getElementById("feed-url-input");
const feedNameInput = document.getElementById("feed-name-input");
const feedFolderSelect = document.getElementById("feed-folder-select");
const folderModalOverlay = document.getElementById("folder-modal-overlay");
const helpModalOverlay = document.getElementById("help-modal-overlay");
const folderNameInput = document.getElementById("folder-name-input");
const folderModalError = document.getElementById("folder-modal-error");

// ===== Init =====
document.addEventListener("DOMContentLoaded", async () => {
  // Only one reader tab: each tab holds its own copy of the data and would overwrite the
  // other's changes. A second one (opened from a bookmark, a duplicated tab, ...) hands
  // over to the first and closes (B3).
  if (await focusExistingReader()) return;
  await loadState();
  selection = selectionFromHash(location.hash); // a reload stays on the same view
  const restoredScroll = history.state?.scroll || 0; // kept by the browser across reloads
  history.replaceState({ ...(history.state || {}), scroll: restoredScroll }, "", selectionHash(selection));
  renderFeedList();
  renderArticles();
  setScrollTop(restoredScroll);
  bindEvents();
  // Set icon on load and watch for OS color scheme changes
  updateActionIcon();
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateActionIcon);
  // Refresh on open only if the stored data is stale (background refresh keeps it fresh)
  if (isStale()) refreshAll();
  // When background service worker updates feeds in storage, reload and re-render
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "local") return;
    // Pick up changes made by another reader tab, so that saving from this tab doesn't
    // overwrite them with stale state. (Our own writes arrive here too and are no-ops.)
    if (changes.readArticles) {
      // Read marks are only ever added by the user, so merge rather than replace
      let added = false;
      for (const link of changes.readArticles.newValue || []) {
        if (!readArticles.has(link)) {
          readArticles.add(link);
          added = true;
        }
      }
      if (added) {
        renderFeedList();
        renderArticles();
      }
    }
    if (changes.bookmarkedArticles) {
      const incoming = changes.bookmarkedArticles.newValue || [];
      if (incoming.length !== bookmarkedArticles.size || incoming.some((l) => !bookmarkedArticles.has(l))) {
        bookmarkedArticles = new Set(incoming);
        renderFeedList();
        renderArticles();
      }
    }
    if (changes.folders) {
      const incoming = changes.folders.newValue || [];
      if (JSON.stringify(incoming) !== JSON.stringify(folders)) {
        folders = incoming;
        if (selection.type === "folder" && !folders.some((f) => f.id === selection.folderId)) {
          selection = { type: "all" };
          syncUrl();
        }
        renderFeedList();
        renderArticles();
      }
    }
    if (changes.feeds) {
      if (refreshing) return; // our own incremental saves
      const incoming = changes.feeds.newValue || [];
      if (JSON.stringify(incoming) === lastSavedFeedsJson) return; // our own write
      // The selected feed is found again by URL: its index may differ in the new list
      const selectedUrl = selection.type === "feed" ? feeds[selection.feedIndex]?.url : null;
      feeds = incoming;
      if (selectedUrl !== null) {
        const idx = feeds.findIndex((f) => f.url === selectedUrl);
        selection = idx >= 0 ? { type: "feed", feedIndex: idx } : { type: "all" };
        if (idx < 0) syncUrl();
      }
      renderFeedList();
      renderArticles();
    }
    if (changes.imageCache && !imageCacheDirty) {
      imageCache = changes.imageCache.newValue || {};
      if (isCardView) renderArticles();
    }
  });
});

async function focusExistingReader() {
  try {
    const self = await chrome.tabs.getCurrent();
    const readerUrl = chrome.runtime.getURL("reader.html");
    const contexts = await chrome.runtime.getContexts({ contextTypes: ["TAB"] });
    const other = contexts.find((c) => c.tabId >= 0 && c.tabId !== self?.id && (c.documentUrl || "").startsWith(readerUrl));
    if (!other || !self) return false;
    await chrome.tabs.update(other.tabId, { active: true });
    await chrome.windows.update(other.windowId, { focused: true });
    await chrome.tabs.remove(self.id);
    return true;
  } catch {
    return false; // when in doubt, just open normally
  }
}

// ===== Storage =====
async function loadState() {
  const data = await chrome.storage.local.get(["feeds", "folders", "readArticles", "bookmarkedArticles", "darkMode", "markReadOnScroll", "hideReadArticles", "fontFamily", "autoRefreshMinutes", "language", "backgroundRefresh", "isCardView", "imageCache"]);
  feeds = data.feeds || [];
  folders = data.folders || [];
  readArticles = new Set(data.readArticles || []);
  bookmarkedArticles = new Set(data.bookmarkedArticles || []);
  darkMode = data.darkMode || false;
  markReadOnScroll = data.markReadOnScroll ?? true;
  hideReadArticles = data.hideReadArticles ?? true;
  fontFamily = data.fontFamily || "";
  autoRefreshMinutes = data.autoRefreshMinutes ?? 5;
  language = data.language || "ja";
  backgroundRefresh = data.backgroundRefresh ?? true;
  isCardView = data.isCardView || false;
  imageCache = data.imageCache || {};
  applyViewButtons();
  applyDarkMode();
  applyFont();
  applyLanguage();
  startAutoRefresh();
}

async function saveFeeds() {
  lastSavedFeedsJson = JSON.stringify(feeds);
  await chrome.storage.local.set({ feeds });
}

async function saveFolders() {
  await chrome.storage.local.set({ folders });
}

async function saveReadArticles() {
  readArticles = new Set(pruneReadArticles([...readArticles], feeds));
  await chrome.storage.local.set({ readArticles: [...readArticles] });
}

async function saveBookmarks() {
  await chrome.storage.local.set({ bookmarkedArticles: [...bookmarkedArticles] });
}

// ===== Events =====
function bindEvents() {
  document.getElementById("btn-add-feed").addEventListener("click", openModal);
  document.getElementById("btn-add-folder").addEventListener("click", openFolderModal);
  document.getElementById("btn-modal-cancel").addEventListener("click", closeModal);
  document.getElementById("btn-modal-add").addEventListener("click", addFeed);
  document.getElementById("btn-folder-modal-cancel").addEventListener("click", closeFolderModal);
  document.getElementById("btn-folder-modal-add").addEventListener("click", addFolder);
  document.getElementById("btn-refresh").addEventListener("click", refreshAll);
  document.getElementById("btn-mark-all-read").addEventListener("click", markAllRead);
  document.getElementById("btn-view-list").addEventListener("click", () => setView(false));
  document.getElementById("btn-view-card").addEventListener("click", () => setView(true));

  document.getElementById("btn-settings").addEventListener("click", showSettingsMenu);

  const opmlInput = document.getElementById("opml-file-input");
  opmlInput.addEventListener("change", handleOpmlImport);

  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase();
    setScrollTop(0);
    renderArticles();
  });

  // Remember when the user last scrolled the list; only such scrolls may mark articles read
  articleListEl.addEventListener(
    "scroll",
    () => {
      if (performance.now() - lastProgrammaticScrollAt > 300) lastUserScrollAt = performance.now();
      rememberScroll();
    },
    { passive: true }
  );

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  folderModalOverlay.addEventListener("click", (e) => {
    if (e.target === folderModalOverlay) closeFolderModal();
  });

  // Drop target: remove from folder (sidebar itself)
  feedListEl.addEventListener("dragover", (e) => e.preventDefault());
  feedListEl.addEventListener("drop", async (e) => {
    if (e.target !== feedListEl) return;
    const feed = draggedFeed(e);
    if (!feed) return;
    e.preventDefault();
    feed.folderId = null;
    await saveFeeds();
    renderFeedList();
  });

  // isComposing: Enter that confirms an IME conversion must not submit the form
  feedUrlInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.isComposing) addFeed();
  });

  folderNameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.isComposing) addFolder();
  });

  document.addEventListener("keydown", handleShortcut);
  helpModalOverlay.addEventListener("click", (e) => {
    if (e.target === helpModalOverlay || e.target.id === "btn-help-close") closeHelp();
  });

  // Close context menu on click elsewhere
  document.addEventListener("click", (e) => {
    if (e.target.closest(".feed-context-menu") || e.target.id === "btn-settings") return;
    document.querySelectorAll(".feed-context-menu").forEach((m) => m.remove());
  });
}

// ===== Feed List Rendering =====
function renderFeedList() {
  feedListEl.innerHTML = "";

  // "All Feeds" item
  const allLi = document.createElement("li");
  allLi.className = selection.type === "all" ? "active" : "";
  allLi.innerHTML = `
    <span class="feed-icon" style="font-size:14px;">📰</span>
    <span class="feed-name">${t("allFeeds")}</span>
    <span class="feed-count">${getTotalUnread()}</span>
  `;
  allLi.addEventListener("click", () => selectAndRender({ type: "all" }));
  feedListEl.appendChild(allLi);

  // "Bookmarks" item
  const bookmarkLi = document.createElement("li");
  bookmarkLi.className = selection.type === "bookmark" ? "active" : "";
  bookmarkLi.innerHTML = `
    <span class="feed-icon" style="font-size:14px;">🔖</span>
    <span class="feed-name">${t("bookmarks")}</span>
    <span class="feed-count">${getBookmarkCount()}</span>
  `;
  bookmarkLi.addEventListener("click", () => selectAndRender({ type: "bookmark" }));
  feedListEl.appendChild(bookmarkLi);

  // "Feed Stats" item: its count is the number of registered feeds
  const statsLi = document.createElement("li");
  statsLi.className = selection.type === "stats" ? "active" : "";
  statsLi.innerHTML = `
    <span class="feed-icon" style="font-size:14px;">📊</span>
    <span class="feed-name">${t("feedStats")}</span>
    <span class="feed-count">${feeds.length}</span>
  `;
  statsLi.addEventListener("click", () => selectAndRender({ type: "stats" }));
  feedListEl.appendChild(statsLi);

  // Feeds not in any folder
  const unfoldered = feeds
    .map((f, i) => ({ feed: f, index: i }))
    .filter((fi) => !fi.feed.folderId);
  unfoldered.forEach((fi) => feedListEl.appendChild(createFeedLi(fi.feed, fi.index)));

  // Folders
  folders.forEach((folder) => {
    const folderLi = document.createElement("li");
    folderLi.className = "folder-item" + (selection.type === "folder" && selection.folderId === folder.id ? " active" : "");
    folderLi.setAttribute("data-folder-id", folder.id);
    const folderFeeds = feeds.filter((f) => f.folderId === folder.id);
    const folderUnread = unreadLinks(folderFeeds).size;

    folderLi.innerHTML = `
      <span class="folder-toggle">${folder.collapsed ? "▶" : "▼"}</span>
      <span class="feed-icon" style="font-size:14px;">📁</span>
      <span class="feed-name" title="${escapeHtml(folder.name)}">${escapeHtml(folder.name)}</span>
      <span class="feed-count">${folderUnread}</span>
    `;

    folderLi.querySelector(".folder-toggle").addEventListener("click", async (e) => {
      e.stopPropagation();
      folder.collapsed = !folder.collapsed;
      await saveFolders();
      renderFeedList();
    });

    folderLi.addEventListener("click", () => selectAndRender({ type: "folder", folderId: folder.id }));

    folderLi.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      showFolderContextMenu(e, folder);
    });

    // Drop target for feeds
    folderLi.addEventListener("dragover", (e) => {
      e.preventDefault();
      folderLi.classList.add("drag-over");
    });
    folderLi.addEventListener("dragleave", () => {
      folderLi.classList.remove("drag-over");
    });
    folderLi.addEventListener("drop", async (e) => {
      e.preventDefault();
      folderLi.classList.remove("drag-over");
      const feed = draggedFeed(e);
      if (!feed) return;
      feed.folderId = folder.id;
      await saveFeeds();
      renderFeedList();
    });

    feedListEl.appendChild(folderLi);

    // Feeds inside folder
    if (!folder.collapsed) {
      const childFeeds = feeds
        .map((f, i) => ({ feed: f, index: i }))
        .filter((fi) => fi.feed.folderId === folder.id);
      childFeeds.forEach((fi) => {
        const li = createFeedLi(fi.feed, fi.index);
        li.classList.add("in-folder");
        feedListEl.appendChild(li);
      });
    }
  });

  bindFaviconErrors(feedListEl);
}

// Change the current selection; this also ends any temporary "show read" view
// Scroll the list ourselves without it counting as a user scroll
function setScrollTop(v) {
  lastProgrammaticScrollAt = performance.now();
  articleListEl.scrollTop = v;
}

// Switch the view. Each switch is a browser history entry with the view in the URL hash,
// so back / forward move between views and a reload stays on the same one. Feeds are
// recorded by URL, since their index shifts when feeds are added or removed.
function selectAndRender(sel, { fromHistory = false, scrollTop = 0 } = {}) {
  if (!fromHistory) {
    // Save where the view being left was scrolled, then add an entry for the new one
    clearTimeout(historyScrollTimer);
    historyScrollTimer = null;
    history.replaceState({ ...(history.state || {}), scroll: articleListEl.scrollTop }, "");
    const hash = selectionHash(sel);
    // Compare with the URL, not the old selection: they differ when the selection was
    // changed without an entry (e.g. the shown feed was deleted) (B8)
    if (hash !== location.hash) history.pushState({ scroll: 0 }, "", hash);
  }
  selection = sel;
  tempShowRead = false;
  cursorLink = null;
  renderFeedList();
  renderArticles();
  setScrollTop(scrollTop);
}

function selectionHash(sel) {
  if (sel.type === "feed") return "#feed/" + encodeURIComponent(feeds[sel.feedIndex]?.url || "");
  if (sel.type === "folder") return "#folder/" + encodeURIComponent(sel.folderId);
  return "#" + sel.type;
}

// The view a URL hash names, or "all" if the feed / folder it names is gone
function selectionFromHash(hash) {
  const m = (hash || "").match(/^#(\w+)(?:\/(.*))?$/);
  if (!m) return { type: "all" };
  let arg = "";
  try {
    arg = m[2] ? decodeURIComponent(m[2]) : "";
  } catch {
    return { type: "all" }; // a malformed hash (hand-edited, cut off) must not stop the page (B2)
  }
  if (["all", "bookmark", "stats"].includes(m[1])) return { type: m[1] };
  if (m[1] === "folder" && folders.some((f) => f.id === arg)) return { type: "folder", folderId: arg };
  if (m[1] === "feed") {
    const idx = feeds.findIndex((f) => f.url === arg);
    if (idx >= 0) return { type: "feed", feedIndex: idx };
  }
  return { type: "all" };
}

window.addEventListener("popstate", (e) => {
  const sel = selectionFromHash(location.hash);
  // Correct the URL when it named something that no longer exists
  if (selectionHash(sel) !== location.hash) history.replaceState(e.state, "", selectionHash(sel));
  selectAndRender(sel, { fromHistory: true, scrollTop: e.state?.scroll || 0 });
});

// Point the current history entry's URL at the current selection, for changes made
// without navigating (deleting the shown feed or folder) (B8)
function syncUrl() {
  const hash = selectionHash(selection);
  if (hash !== location.hash) history.replaceState(history.state, "", hash);
}

// Keep the current history entry's scroll position up to date, so coming back to a view
// (with back or forward) returns to where it was left. Short interval: on back / forward
// the entry has already changed, so a pending save for the old view can't be flushed.
let historyScrollTimer = null;
function rememberScroll() {
  if (historyScrollTimer) return;
  historyScrollTimer = setTimeout(() => {
    historyScrollTimer = null;
    history.replaceState({ ...(history.state || {}), scroll: articleListEl.scrollTop }, "");
  }, 120);
}

// CSP blocks inline onerror handlers in extension pages, so bind them here
function bindFaviconErrors(container) {
  container.querySelectorAll("img.feed-icon, img.article-favicon, .article-image img").forEach((img) => {
    img.addEventListener("error", () => {
      const wrapper = img.closest(".article-image");
      (wrapper || img).style.display = "none";
    });
  });
}

// Feeds are dragged under a private data type carrying their URL. Text dragged from
// anywhere else ("3 ways to ...") has no such type, so it can never move a feed (B1).
const FEED_DRAG_TYPE = "application/x-rss-reader-feed";

function draggedFeed(e) {
  if (!e.dataTransfer.types.includes(FEED_DRAG_TYPE)) return null;
  const url = e.dataTransfer.getData(FEED_DRAG_TYPE);
  return feeds.find((f) => f.url === url) || null;
}

function createFeedLi(feed, idx) {
  const li = document.createElement("li");
  const isActive = selection.type === "feed" && selection.feedIndex === idx;
  li.className = isActive ? "active" : "";
  li.setAttribute("draggable", "true");
  li.setAttribute("data-feed-index", idx);

  const faviconUrl = getFaviconUrl(feed);
  const errorIcon = feed.error
    ? `<span class="feed-error" title="${escapeHtml(describeFeedError(feed.error))}">⚠</span>`
    : "";
  li.innerHTML = `
    <img class="feed-icon" src="${escapeHtml(faviconUrl)}">
    <span class="feed-name" title="${escapeHtml(feed.title)}">${escapeHtml(feed.title)}</span>
    ${errorIcon}
    <span class="feed-count">${getUnreadCount(feed)}</span>
  `;

  li.addEventListener("click", () => selectAndRender({ type: "feed", feedIndex: idx }));

  li.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    showFeedContextMenu(e, idx);
  });

  li.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData(FEED_DRAG_TYPE, feed.url);
    e.dataTransfer.effectAllowed = "move";
    li.classList.add("dragging");
  });
  li.addEventListener("dragend", () => li.classList.remove("dragging"));

  return li;
}

// Add a context / settings menu to the page, nudged back inside the window if it would
// stick out (its height is capped in CSS, so it scrolls instead of being cut off).
function showMenu(menu) {
  document.body.appendChild(menu);
  const r = menu.getBoundingClientRect();
  const left = Math.max(4, Math.min(r.left, window.innerWidth - r.width - 4));
  const top = Math.max(4, Math.min(r.top, window.innerHeight - r.height - 4));
  menu.style.left = left + "px";
  menu.style.top = top + "px";
}

function showFeedContextMenu(e, feedIndexAtOpen) {
  document.querySelectorAll(".feed-context-menu").forEach((m) => m.remove());
  // Hold on to the feed's URL, not its index: the list can change while the menu is open
  // (a refresh, another change), and the index would then point at a different feed (B3).
  const feedUrl = feeds[feedIndexAtOpen]?.url;
  const current = () => feeds.find((f) => f.url === feedUrl);
  if (!current()) return;
  const menu = document.createElement("div");
  menu.className = "feed-context-menu";
  menu.style.left = e.clientX + "px";
  menu.style.top = e.clientY + "px";

  // Move to folder submenu
  if (folders.length > 0) {
    const moveHeader = document.createElement("div");
    moveHeader.className = "context-menu-header";
    moveHeader.textContent = t("moveToFolder");
    menu.appendChild(moveHeader);

    folders.forEach((folder) => {
      const moveBtn = document.createElement("div");
      moveBtn.className = "context-menu-sub";
      moveBtn.textContent = folder.name;
      moveBtn.addEventListener("click", async (ev) => {
        ev.stopPropagation();
        if (current()) current().folderId = folder.id;
        await saveFeeds();
        renderFeedList();
        menu.remove();
      });
      menu.appendChild(moveBtn);
    });

    if (current().folderId) {
      const removeFromFolder = document.createElement("div");
      removeFromFolder.className = "context-menu-sub";
      removeFromFolder.textContent = t("removeFromFolder");
      removeFromFolder.addEventListener("click", async (ev) => {
        ev.stopPropagation();
        if (current()) current().folderId = null;
        await saveFeeds();
        renderFeedList();
        menu.remove();
      });
      menu.appendChild(removeFromFolder);
    }

    const sep = document.createElement("div");
    sep.className = "context-menu-sep";
    menu.appendChild(sep);
  }

  const deleteBtn = document.createElement("div");
  deleteBtn.className = "context-menu-danger";
  deleteBtn.textContent = t("deleteFeed");
  deleteBtn.addEventListener("click", async (ev) => {
    ev.stopPropagation();
    menu.remove();
    const target = current();
    if (!target) return;
    const feedIndex = feeds.indexOf(target);
    // Bookmarks only store links; the ones whose article goes away with the feed are lost
    const present = new Set();
    feeds.forEach((f) => f !== target && (f.items || []).forEach((it) => it.link && present.add(it.link)));
    const remaining = [...bookmarkedArticles].filter((l) => present.has(l));
    const lost = bookmarkedArticles.size - remaining.length;
    const name = target.title || target.url;
    if (!confirm(lost ? t("deleteFeedConfirmBookmarks", { name, n: lost }) : t("deleteFeedConfirm", { name }))) return;
    feeds.splice(feedIndex, 1);
    if (selection.type === "feed") {
      if (selection.feedIndex === feedIndex) {
        selection = { type: "all" };
        syncUrl();
      } else if (selection.feedIndex > feedIndex) selection.feedIndex--;
    }
    if (remaining.length !== bookmarkedArticles.size) {
      bookmarkedArticles = new Set(remaining);
      await saveBookmarks();
    }
    await saveFeeds();
    renderFeedList();
    renderArticles();
  });

  menu.appendChild(deleteBtn);
  showMenu(menu);
}

function showFolderContextMenu(e, folder) {
  document.querySelectorAll(".feed-context-menu").forEach((m) => m.remove());
  const menu = document.createElement("div");
  menu.className = "feed-context-menu";
  menu.style.left = e.clientX + "px";
  menu.style.top = e.clientY + "px";

  const renameBtn = document.createElement("div");
  renameBtn.textContent = t("renameFolder");
  renameBtn.addEventListener("click", (ev) => {
    ev.stopPropagation();
    menu.remove();
    const newName = prompt(t("newFolderName"), folder.name);
    if (newName && newName.trim()) {
      folder.name = newName.trim();
      saveFolders();
      renderFeedList();
    }
  });
  menu.appendChild(renameBtn);

  const sep = document.createElement("div");
  sep.className = "context-menu-sep";
  menu.appendChild(sep);

  const deleteBtn = document.createElement("div");
  deleteBtn.className = "context-menu-danger";
  deleteBtn.textContent = t("deleteFolder");
  deleteBtn.addEventListener("click", async (ev) => {
    ev.stopPropagation();
    menu.remove();
    if (!confirm(t("deleteFolderConfirm", { name: folder.name }))) return;
    // Remove folder, move feeds to root
    feeds.forEach((f) => {
      if (f.folderId === folder.id) f.folderId = null;
    });
    folders = folders.filter((f) => f.id !== folder.id);
    if (selection.type === "folder" && selection.folderId === folder.id) {
      selection = { type: "all" };
      syncUrl();
    }
    await saveFeeds();
    await saveFolders();
    renderFeedList();
    renderArticles();
  });
  menu.appendChild(deleteBtn);
  showMenu(menu);
}

// ===== Article List Rendering =====
function renderArticles() {
  const isStats = selection.type === "stats";
  document.getElementById("content-actions").style.display = isStats ? "none" : "";
  if (isStats) {
    renderFeedStats();
    return;
  }
  const articles = getFilteredArticles();

  // Update header title
  if (selection.type === "all") {
    feedTitleEl.textContent = t("allFeeds");
  } else if (selection.type === "bookmark") {
    feedTitleEl.textContent = t("bookmarks");
  } else if (selection.type === "folder") {
    const folder = folders.find((f) => f.id === selection.folderId);
    feedTitleEl.textContent = folder ? folder.name : "";
  } else {
    const feed = feeds[selection.feedIndex];
    feedTitleEl.textContent = feed
      ? `${feed.title}${feed.description ? " / " + collapseSpaces(htmlToText(feed.description)) : ""}`
      : "";
  }

  if (feeds.length === 0) {
    articleListEl.className = "";
    articleListEl.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📡</div>
        <div>${t("noFeeds")}</div>
        <div>${t("noFeedsHint")}</div>
      </div>
    `;
    return;
  }

  if (articles.length === 0) {
    // Drop the card-view class: as a wrapping flex container it would shrink the
    // empty-state block to its content and pin it to the left edge.
    articleListEl.className = "";
    // Check if there are read articles being hidden
    const hasHiddenRead = hideReadArticles && !tempShowRead && getFilteredArticlesIgnoringRead().length > 0;
    articleListEl.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📭</div>
        <div>${t("noArticles")}</div>
        ${hasHiddenRead ? `<button id="btn-show-read" class="show-read-btn">${t("showReadArticles")}</button>` : ""}
      </div>
    `;
    if (hasHiddenRead) {
      document.getElementById("btn-show-read").addEventListener("click", () => {
        tempShowRead = true;
        renderArticles();
      });
    }
    return;
  }

  const viewClass = isCardView ? "card-view" : "";
  const viewChanged = articleListEl.className !== viewClass;
  articleListEl.className = viewClass;

  // Keep the first visible row anchored so inserting rows above doesn't shift the view.
  // At the very top we don't anchor: new articles should appear in view, not above it.
  const surviving = new Set(articles.map((a) => a.link));
  const anchor = articleListEl.scrollTop > 0 ? findAnchorRow(surviving) : null;

  // Reuse existing rows (same link) so in-flight image loads and the user's place survive
  const existing = new Map();
  if (!viewChanged) {
    articleListEl.querySelectorAll(":scope > .article-row").forEach((row) => existing.set(row.dataset.link, row));
  }
  // The selected article may drop out (read articles hidden): move the selection to the
  // next one that stays, so j / k carry on from the same place
  if (cursorLink && !surviving.has(cursorLink)) {
    const old = [...articleListEl.querySelectorAll(":scope > .article-row")].map((r) => r.dataset.link);
    const i = old.indexOf(cursorLink);
    cursorLink = (i >= 0 && (old.slice(i + 1).find((l) => surviving.has(l)) || old.slice(0, i).reverse().find((l) => surviving.has(l)))) || null;
  }

  const usedLinks = new Set();
  const rows = [];
  for (const a of articles) {
    if (usedLinks.has(a.link)) continue; // same URL in several feeds: show it once
    usedLinks.add(a.link);
    const row = existing.get(a.link);
    if (row) {
      updateArticleRow(row, a);
      rows.push(row);
    } else {
      rows.push(createArticleRow(a));
    }
  }
  articleListEl.replaceChildren(...rows);

  if (anchor && anchor.row.isConnected) {
    const newTop = anchor.row.getBoundingClientRect().top;
    if (newTop !== anchor.top) setScrollTop(articleListEl.scrollTop + (newTop - anchor.top));
  }

  if (isCardView) {
    rows.forEach((row) => {
      if (row.querySelector(".article-image.pending")) queueImageFetch(row.dataset.link);
    });
  }

  // Keep the keyboard selection on its article across re-renders
  cursorElement()?.classList.add("cursor");

  // Mark as read on scroll (IntersectionObserver)
  setupScrollReadObserver();
}

// The first row (among those that will still be shown) whose bottom edge is inside the
// viewport, with its current top offset
function findAnchorRow(surviving) {
  const rootTop = articleListEl.getBoundingClientRect().top;
  for (const row of articleListEl.querySelectorAll(":scope > .article-row")) {
    if (!surviving.has(row.dataset.link)) continue;
    const r = row.getBoundingClientRect();
    if (r.bottom > rootTop) return { row, top: r.top };
  }
  return null;
}

function createArticleRow(a) {
  const isRead = readArticles.has(a.link);
  const isBookmarked = bookmarkedArticles.has(a.link);
  let imageHtml = "";
  if (isCardView) {
    const image = getArticleImage(a);
    if (image) {
      imageHtml = `<div class="article-image"><img src="${escapeHtml(image)}" loading="lazy" alt=""></div>`;
    } else if (image === null) {
      // Unknown yet: render a hidden slot and fetch og:image from the article page
      imageHtml = `<div class="article-image pending"></div>`;
    }
  }
  const row = document.createElement("div");
  row.className = "article-row" + (isRead ? " read" : "");
  row.dataset.link = a.link;
  row.dataset.feedIndex = String(a._feedIndex);
  row.innerHTML = `
        ${imageHtml}
        <div class="article-source">
          <img class="article-favicon" src="${escapeHtml(getFaviconUrl(feeds[a._feedIndex]))}" width="16" height="16">
          <span class="article-source-name">${escapeHtml(a._feedTitle)}</span>
        </div>
        <a class="article-title"${isHttpUrl(a.link) ? ` href="${escapeHtml(a.link.trim())}"` : ""} rel="noopener" title="${escapeHtml(a.title)}">${escapeHtml(a.title)}</a>
        <div class="article-meta">
          <div class="article-share">
            <button class="bookmark-btn ${isBookmarked ? "bookmarked" : ""}" title="${t("bookmark")}">${isBookmarked ? "★" : "☆"}</button>
            <button class="share-btn" data-share="twitter" title="${t("shareTwitter")}">𝕏</button>
            <button class="share-btn" data-share="facebook" title="${t("shareFacebook")}">f</button>
          </div>
          <span class="article-time">${relativeTime(a.pubDate)}</span>
        </div>
  `;
  bindFaviconErrors(row);

  row.addEventListener("click", (e) => {
    if (e.target.classList.contains("share-btn")) {
      handleShare(e.target, row.dataset.link, row.querySelector(".article-title").textContent);
      return;
    }
    if (e.target.classList.contains("bookmark-btn")) {
      toggleBookmark(row.dataset.link, e.target);
      return;
    }
    // The title is a real link (for "copy link address", keyboard focus, etc.), but
    // opening goes through openOriginal so the article is also marked read.
    e.preventDefault();
    openOriginal(row, !(e.metaKey || e.ctrlKey)); // Cmd/Ctrl+click opens in the background
  });
  row.addEventListener("auxclick", (e) => {
    if (e.button === 1) {
      e.preventDefault();
      openOriginal(row, false);
    }
  });
  return row;
}

// Refresh the parts of an existing row that can change between renders
function updateArticleRow(row, a) {
  row.classList.toggle("read", readArticles.has(a.link));
  row.dataset.feedIndex = String(a._feedIndex);
  const timeEl = row.querySelector(".article-time");
  if (timeEl) timeEl.textContent = relativeTime(a.pubDate);
  const bm = row.querySelector(".bookmark-btn");
  if (bm) {
    const on = bookmarkedArticles.has(a.link);
    bm.classList.toggle("bookmarked", on);
    bm.textContent = on ? "★" : "☆";
  }
  // Image may have been learned since (feed refresh or background prefetch)
  if (isCardView && !row.querySelector(".article-image img")) {
    const image = getArticleImage(a);
    if (image) {
      const slot = row.querySelector(".article-image") || row.insertBefore(document.createElement("div"), row.firstChild);
      slot.className = "article-image";
      slot.innerHTML = `<img src="${escapeHtml(image)}" loading="lazy" alt="">`;
      bindFaviconErrors(slot);
    }
  }
}

let scrollReadObserver = null;

function setupScrollReadObserver() {
  if (scrollReadObserver) {
    scrollReadObserver.disconnect();
    scrollReadObserver = null;
  }
  if (!markReadOnScroll) return;

  // Rows awaiting their first notification. An observer's initial callback only reports
  // where a row currently is; it never means the user scrolled past it, so it must not
  // mark anything read. Only later, scroll-driven notifications may.
  const firstNotification = new Set();

  scrollReadObserver = new IntersectionObserver(
    (entries) => {
      let changed = false;
      entries.forEach((entry) => {
        const row = entry.target;
        if (!entry.rootBounds) return;
        const above = !entry.isIntersecting && entry.boundingClientRect.bottom < entry.rootBounds.top;
        const initial = firstNotification.delete(row);

        // Record where the row is now (overwrite, don't accumulate)
        delete row.dataset.seen;
        delete row.dataset.below;
        if (entry.isIntersecting) row.dataset.seen = "1";
        else if (!above) row.dataset.below = "1";

        if (initial || !above) return;
        // Rows can also move above the viewport without any scrolling (window resize,
        // card reflow, font change, images appearing). Only count real scrolling.
        if (performance.now() - lastUserScrollAt > USER_SCROLL_WINDOW_MS) return;
        const link = row.dataset.link;
        if (link && !readArticles.has(link)) {
          readArticles.add(link);
          row.classList.add("read");
          changed = true;
        }
      });
      if (changed) {
        saveReadArticles();
        renderFeedList();
      }
    },
    { root: articleListEl, threshold: 0 }
  );

  articleListEl.querySelectorAll(".article-row:not(.read)").forEach((row) => {
    firstNotification.add(row);
    scrollReadObserver.observe(row);
  });
}

function getFilteredArticles() {
  let articles = [];

  if (selection.type === "all") {
    feeds.forEach((feed, idx) => {
      (feed.items || []).forEach((item) => {
        articles.push({ ...item, _feedIndex: idx, _feedTitle: feed.title });
      });
    });
  } else if (selection.type === "bookmark") {
    feeds.forEach((feed, idx) => {
      (feed.items || []).forEach((item) => {
        if (bookmarkedArticles.has(item.link)) {
          articles.push({ ...item, _feedIndex: idx, _feedTitle: feed.title });
        }
      });
    });
  } else if (selection.type === "folder") {
    feeds.forEach((feed, idx) => {
      if (feed.folderId === selection.folderId) {
        (feed.items || []).forEach((item) => {
          articles.push({ ...item, _feedIndex: idx, _feedTitle: feed.title });
        });
      }
    });
  } else {
    const feed = feeds[selection.feedIndex];
    if (feed) {
      (feed.items || []).forEach((item) => {
        articles.push({
          ...item,
          _feedIndex: selection.feedIndex,
          _feedTitle: feed.title,
        });
      });
    }
  }

  // Sort by date (newest first)
  articles.sort((a, b) => articleSortTime(b) - articleSortTime(a));

  // Hide read articles (not in the bookmark view: opening a bookmark marks it read, and
  // it must stay listed)
  if (hideReadArticles && !tempShowRead && selection.type !== "bookmark") {
    articles = articles.filter((a) => !readArticles.has(a.link));
  }

  // Search filter
  if (searchQuery) {
    articles = articles.filter(
      (a) =>
        a.title.toLowerCase().includes(searchQuery) ||
        a._feedTitle.toLowerCase().includes(searchQuery)
    );
  }

  return articles;
}

function getFilteredArticlesIgnoringRead() {
  const saved = tempShowRead;
  tempShowRead = true;
  const articles = getFilteredArticles();
  tempShowRead = saved;
  return articles;
}

// ===== Feed Operations =====
function openModal() {
  modalOverlay.classList.remove("hidden");
  feedUrlInput.value = "";
  feedNameInput.value = "";
  modalError.classList.add("hidden");

  // Populate folder select
  feedFolderSelect.innerHTML = `<option value="">${t("folderNone")}</option>`;
  folders.forEach((f) => {
    const opt = document.createElement("option");
    opt.value = f.id;
    opt.textContent = f.name;
    feedFolderSelect.appendChild(opt);
  });

  feedUrlInput.focus();
}

function closeModal() {
  modalOverlay.classList.add("hidden");
}

// ===== Folder Operations =====
function openFolderModal() {
  folderModalOverlay.classList.remove("hidden");
  folderNameInput.value = "";
  folderModalError.classList.add("hidden");
  folderNameInput.focus();
}

function closeFolderModal() {
  folderModalOverlay.classList.add("hidden");
}

async function addFolder() {
  const name = folderNameInput.value.trim();
  if (!name) {
    folderModalError.textContent = t("enterFolderName");
    folderModalError.classList.remove("hidden");
    return;
  }
  folders.push({
    id: "folder_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6),
    name,
    collapsed: false,
  });
  await saveFolders();
  closeFolderModal();
  renderFeedList();
}

let addingFeed = false;

async function addFeed() {
  // The Enter key calls this directly, so the disabled button alone doesn't stop repeats
  if (addingFeed) return;
  let url = feedUrlInput.value.trim();
  if (!url) {
    showModalError(t("enterUrl"));
    return;
  }
  // "example.com/feed" would otherwise be fetched relative to the extension's own URL
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(url)) url = "https://" + url;
  try {
    if (!/^https?:$/.test(new URL(url).protocol)) throw new Error("not http(s)");
  } catch {
    showModalError(t("invalidUrl"));
    return;
  }
  const isRegistered = (u) => feeds.some((f) => feedUrlKey(f.url) === feedUrlKey(u));
  if (isRegistered(url)) {
    showModalError(t("feedExists"));
    return;
  }

  addingFeed = true;
  const btn = document.getElementById("btn-modal-add");
  try {
    showModalError("");
    btn.textContent = t("loading");
    btn.disabled = true;

    // url may be a site's page rather than its feed; resolveFeed finds the feed it links to
    const resolved = await resolveFeed(url);
    const result = resolved.result;
    if (resolved.url !== url) {
      url = resolved.url;
      if (isRegistered(url)) {
        showModalError(t("feedExists"));
        return;
      }
    }
    const customName = feedNameInput.value.trim();

    feeds.push({
      url,
      title: customName || result.title || url,
      description: result.description || "",
      siteUrl: result.siteUrl || "",
      items: mergeItems([], result.items || []),
      itemCount: (result.items || []).length,
      folderId: feedFolderSelect.value || null,
      lastUpdated: Date.now(),
    });

    await saveFeeds();
    closeModal();
    renderFeedList();
    renderArticles();
  } catch (err) {
    showModalError(t("fetchError") + err.message);
  } finally {
    addingFeed = false;
    btn.textContent = t("add");
    btn.disabled = false;
  }
}

// ===== Feed statistics (update frequency) =====
// Estimated from the dates of the articles the feed currently contains: feed.items
// starts with them (mergeFeedItems puts them first) and feed.itemCount says how many.
// Feeds saved before itemCount existed fall back to all stored items until refreshed.
// Updates per week = n / (now - oldest of the n): counting up to now, not only up to the
// newest article, makes a feed that has gone quiet come out as infrequent.
let statsSort = { key: "rate", dir: -1 };
const DAY_MS = 86400000;

function feedStats(feed, now) {
  const items = feed.itemCount != null ? (feed.items || []).slice(0, feed.itemCount) : feed.items || [];
  const times = items
    .map((it) => (typeof it.timestamp === "number" ? it.timestamp : parseFeedDate(it.pubDate)))
    .filter((ts) => ts !== null && ts <= now + DAY_MS)
    .sort((a, b) => b - a);
  const s = { feed, items: items.length, dated: times.length, last: null, rate: null, interval: null, last30: 0, capped: false };
  if (!times.length) return s;
  s.last = times[0];
  // Some feeds keep a few old articles alongside the new ones (pinned or evergreen
  // posts); one of those would make a busy feed look rare. Leave out the oldest 20%.
  const used = times.slice(0, Math.ceil(times.length * 0.8));
  const oldest = used[used.length - 1];
  s.rate = used.length / (Math.max(now - oldest, DAY_MS) / (7 * DAY_MS));
  if (used.length > 1) s.interval = (used[0] - oldest) / (used.length - 1) / DAY_MS;
  s.last30 = times.filter((ts) => now - ts <= 30 * DAY_MS).length;
  s.capped = s.last30 === times.length && times.length === items.length && items.length > 1;
  return s;
}

function formatRate(perWeek) {
  if (perWeek == null) return "—";
  const n = (x) => (x >= 10 ? Math.round(x) : Math.round(x * 10) / 10);
  if (perWeek >= 1) return t("perWeek", { n: n(perWeek) });
  if ((perWeek * 30) / 7 >= 1) return t("perMonth", { n: n((perWeek * 30) / 7) });
  return t("perYear", { n: n((perWeek * 365) / 7) });
}

function formatInterval(days) {
  if (days == null) return "—";
  if (days < 1) return t("intervalHours", { n: Math.max(1, Math.round(days * 24)) });
  return t("intervalDays", { n: days >= 10 ? Math.round(days) : Math.round(days * 10) / 10 });
}

function renderFeedStats() {
  feedTitleEl.textContent = t("feedStats");
  articleListEl.className = "";
  if (scrollReadObserver) {
    scrollReadObserver.disconnect();
    scrollReadObserver = null;
  }
  if (feeds.length === 0) {
    articleListEl.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📡</div>
        <div>${t("noFeeds")}</div>
        <div>${t("noFeedsHint")}</div>
      </div>
    `;
    return;
  }

  const now = Date.now();
  const rows = feeds.map((feed, index) => ({ ...feedStats(feed, now), index, unread: getUnreadCount(feed) }));
  const inFolder = feeds.filter((f) => f.folderId).length;
  const active30 = rows.filter((r) => r.last && now - r.last <= 30 * DAY_MS).length;
  const dormant = rows.filter((r) => r.last && now - r.last > 180 * DAY_MS).length;
  const errors = feeds.filter((f) => f.error).length;
  const totalRate = rows.reduce((n, r) => n + (r.rate || 0), 0);

  const keyOf = {
    name: (r) => (r.feed.title || r.feed.url).toLowerCase(),
    last: (r) => r.last ?? -Infinity,
    rate: (r) => r.rate ?? -Infinity,
    interval: (r) => r.interval ?? Infinity,
    last30: (r) => (r.dated ? r.last30 : -1),
    unread: (r) => r.unread,
  };
  const key = keyOf[statsSort.key];
  rows.sort((a, b) => {
    const x = key(a);
    const y = key(b);
    return (x < y ? -1 : x > y ? 1 : 0) * statsSort.dir;
  });

  const card = (label, value, sub = "") =>
    `<div class="stat-card"><div class="stat-value">${escapeHtml(value)}</div><div class="stat-label">${escapeHtml(label)}</div>${
      sub ? `<div class="stat-sub">${escapeHtml(sub)}</div>` : ""
    }</div>`;
  const th = (k, label, cls = "") =>
    `<th class="${cls}${statsSort.key === k ? " sorted" : ""}" data-key="${k}">${escapeHtml(label)}${
      statsSort.key === k ? (statsSort.dir < 0 ? " ▼" : " ▲") : ""
    }</th>`;
  const ago = (ts) => relativeTime(new Date(ts).toISOString());

  articleListEl.innerHTML = `
    <div class="stats">
      <div class="stat-cards">
        ${card(t("statFeeds"), String(feeds.length), t("statFeedsSub", { inFolder, root: feeds.length - inFolder }))}
        ${card(t("statActive30"), String(active30))}
        ${card(t("statDormant"), String(dormant), errors ? t("statErrors", { n: errors }) : "")}
        ${card(t("statTotalRate"), formatRate(totalRate))}
      </div>
      <div class="stats-note">${escapeHtml(t("statsNote"))}</div>
      <table class="stats-table">
        <thead><tr>
          ${th("name", t("colFeed"))}
          ${th("last", t("colLast"), "num")}
          ${th("rate", t("colRate"), "num")}
          ${th("interval", t("colInterval"), "num")}
          ${th("last30", t("colLast30"), "num")}
          ${th("unread", t("colUnread"), "num")}
        </tr></thead>
        <tbody>
          ${rows
            .map((r) => {
              const f = r.feed;
              const dormantRow = r.last && now - r.last > 180 * DAY_MS;
              return `<tr data-index="${r.index}" class="${dormantRow ? "dormant" : ""}">
                <td><div class="stats-name"><img class="feed-icon" src="${escapeHtml(getFaviconUrl(f))}" width="16" height="16"><span>${escapeHtml(
                  f.title || f.url
                )}</span>${f.error ? `<span class="feed-error" title="${escapeHtml(describeFeedError(f.error))}">⚠</span>` : ""}</div></td>
                <td class="num">${r.last ? escapeHtml(ago(r.last)) : r.items ? escapeHtml(t("noDates")) : "—"}</td>
                <td class="num">${escapeHtml(formatRate(r.rate))}</td>
                <td class="num">${escapeHtml(formatInterval(r.interval))}</td>
                <td class="num">${r.dated ? r.last30 + (r.capped ? "+" : "") : "—"}</td>
                <td class="num">${r.unread || ""}</td>
              </tr>`;
            })
            .join("")}
        </tbody>
      </table>
    </div>`;
  bindFaviconErrors(articleListEl);

  articleListEl.querySelectorAll("th[data-key]").forEach((el) =>
    el.addEventListener("click", () => {
      const k = el.dataset.key;
      // Names sort A→Z first; numbers biggest first (interval: shortest first)
      if (statsSort.key === k) statsSort.dir *= -1;
      else statsSort = { key: k, dir: k === "name" || k === "interval" ? 1 : -1 };
      renderFeedStats();
    })
  );
  articleListEl.querySelectorAll("tbody tr").forEach((tr) => {
    const idx = Number(tr.dataset.index);
    tr.addEventListener("click", () => selectAndRender({ type: "feed", feedIndex: idx }));
    tr.addEventListener("contextmenu", (e) => {
      e.preventDefault(); // or the browser's own menu shows too (B7)
      showFeedContextMenu(e, idx);
    });
  });
}

// Merge new items with existing unread items not present in the new fetch
function mergeItems(existingItems, newItems) {
  return mergeFeedItems(
    existingItems,
    newItems,
    (link) => readArticles.has(link),
    (link) => bookmarkedArticles.has(link)
  );
}

const REFRESH_CONCURRENCY = 4;

// A refresh requested while one runs (e.g. an OPML import adding feeds) runs again right
// after it, so the new feeds are fetched (B4).
let refreshAgain = false;

async function refreshAll() {
  if (refreshing) {
    refreshAgain = true;
    return;
  }
  refreshing = true;
  const btn = document.getElementById("btn-refresh");
  btn.textContent = "⏳";
  btn.disabled = true;

  // Saves are coalesced and written at most every 2 seconds (each write sends the whole
  // feed list to every listener) (P2). A failed write (e.g. storage quota) is logged and
  // must not stop the refresh; the data is still in memory and the next save retries it.
  let saving = Promise.resolve();
  let saveTimer = null;
  const doSave = () => {
    saveTimer = null;
    saving = saving.then(() => saveFeeds()).catch((e) => console.warn("Failed to save feeds", e));
  };
  const saveSoon = () => {
    if (!saveTimer) saveTimer = setTimeout(doSave, 2000);
  };
  // Re-render at most every 500 ms instead of after every feed: with many feeds, a full
  // re-render per feed kept the page busy for the whole refresh (P1).
  let renderTimer = null;
  const renderSoon = () => {
    if (renderTimer) return;
    renderTimer = setTimeout(() => {
      renderTimer = null;
      renderFeedList();
      renderArticles();
    }, 500);
  };

  try {
    // Hold on to the feed objects, not their indexes: the user can delete or add feeds
    // while a fetch is in flight, which shifts every index after it.
    const queue = [...feeds];
    const worker = async () => {
      while (queue.length > 0) {
        const feed = queue.shift();
        if (!feeds.includes(feed)) continue; // deleted meanwhile
        try {
          const result = await fetchFeed(feed.url);
          if (!feeds.includes(feed)) continue; // deleted during the fetch
          feed.items = mergeItems(feed.items, result.items);
          feed.itemCount = result.items.length; // the current feed's items come first
          feed.lastUpdated = Date.now();
          feed.error = null;
          if (!feed.title || feed.title === feed.url) {
            feed.title = result.title || feed.url;
          }
          if (result.description) {
            feed.description = result.description;
          }
        } catch (e) {
          if (!feeds.includes(feed)) continue;
          feed.error = e.message || String(e);
          console.warn(`Failed to refresh: ${feed.url}`, e);
        }
        // Articles appear incrementally, a few times a second at most
        renderSoon();
        saveSoon();
      }
    };
    // Several feeds at a time, so one slow or dead server doesn't hold up the rest
    await Promise.all(Array.from({ length: REFRESH_CONCURRENCY }, worker));
    clearTimeout(saveTimer);
    doSave();
    await saving;
    clearTimeout(renderTimer);
    renderFeedList();
    renderArticles();
    try {
      await saveReadArticles(); // prunes stale read entries
    } catch (e) {
      console.warn("Failed to save read state", e);
    }
  } finally {
    btn.textContent = "⟳";
    btn.disabled = false;
    refreshing = false;
    if (refreshAgain) {
      refreshAgain = false;
      refreshAll();
    }
  }
}

// True when any feed hasn't been updated within the refresh interval, or when there is
// nothing unread to show (a refresh is the only way new articles can appear).
function isStale() {
  if (feeds.length === 0) return false;
  if (getTotalUnread() === 0) return true;
  const intervalMs = (autoRefreshMinutes > 0 ? autoRefreshMinutes : 5) * 60 * 1000;
  const oldest = Math.min(...feeds.map((f) => f.lastUpdated || 0));
  return Date.now() - oldest > intervalMs;
}

function startAutoRefresh() {
  if (autoRefreshTimer) clearInterval(autoRefreshTimer);
  autoRefreshTimer = null;
  if (autoRefreshMinutes > 0) {
    autoRefreshTimer = setInterval(() => {
      refreshAll();
    }, autoRefreshMinutes * 60 * 1000);
  }
}

async function fetchFeed(url) {
  // "no-cache" forces revalidation with the server; the default cache mode lets Chrome
  // serve a stale copy for feeds with long max-age or heuristic freshness, so new
  // articles could be missing for a long time. The timeout keeps a hung request from
  // leaving `refreshing` stuck and blocking every later refresh.
  const { text, baseUrl } = await fetchText(url);
  return parseFeed(text, baseUrl);
}

async function fetchText(url) {
  const resp = await fetch(url, { cache: "no-cache", signal: AbortSignal.timeout(20000) });
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  const text = decodeFeedBytes(await readBodyLimited(resp), resp.headers.get("content-type"));
  // resp.url is the final URL after redirects: the base for relative links
  return { text, baseUrl: resp.url || url };
}

function parseFeed(text, baseUrl) {
  try {
    return parseFeedXml(text, baseUrl);
  } catch (e) {
    if (e.code === "xml") throw new Error(t("xmlParseError"));
    if (e.code === "format") throw new Error(t("unsupportedFormat"));
    throw e;
  }
}

// For adding a feed: fetch url, and if it turns out to be a web page rather than a feed,
// follow the feed it advertises (<link rel="alternate" type="application/rss+xml" ...>).
// Returns { url, result } where url is the feed's actual URL.
async function resolveFeed(url) {
  const { text, baseUrl } = await fetchText(url);
  try {
    return { url, result: parseFeed(text, baseUrl) };
  } catch (e) {
    const found = discoverFeedUrl(text, baseUrl);
    if (!found || feedUrlKey(found) === feedUrlKey(url)) throw e;
    return { url: found, result: await fetchFeed(found) };
  }
}

function discoverFeedUrl(html, baseUrl) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  for (const link of doc.querySelectorAll("link[href]")) {
    const rel = (link.getAttribute("rel") || "").toLowerCase().split(/\s+/);
    const type = (link.getAttribute("type") || "").toLowerCase();
    if (!rel.includes("alternate") || !/(rss|atom)\+xml/.test(type)) continue;
    try {
      const abs = new URL(link.getAttribute("href").trim(), baseUrl).href;
      if (isHttpUrl(abs)) return abs;
    } catch {
      // malformed href: try the next one
    }
  }
  return "";
}

// Key for spotting the same feed written differently: ignores http/https, host case,
// trailing slashes and #fragment.
function feedUrlKey(url) {
  try {
    const u = new URL(url);
    return u.host + u.pathname.replace(/\/+$/, "") + u.search;
  } catch {
    return url;
  }
}

// ===== Article images =====
// Image for an article. Returns a URL, "" when known to have none, or null when
// not known yet (the article page must be fetched for og:image).
// Order: value stored at fetch time -> <img> in description -> page cache.
const derivedImageCache = new Map();
function getArticleImage(item) {
  if (item.image) return item.image;
  if (!item.link) return "";
  let derived = derivedImageCache.get(item.link);
  if (derived === undefined) {
    derived = "";
    const html = item.description || "";
    if (html.includes("<")) {
      const doc = new DOMParser().parseFromString(html, "text/html");
      for (const img of doc.querySelectorAll("img[src]")) {
        const candidate = img.getAttribute("src") || "";
        if (/^https?:\/\//i.test(candidate) && !isTinyImage(img, candidate)) {
          derived = candidate;
          break;
        }
      }
    }
    derivedImageCache.set(item.link, derived);
  }
  if (derived) return derived;
  if (Object.prototype.hasOwnProperty.call(imageCache, item.link)) return imageCache[item.link];
  return null;
}

// ===== og:image fetching for cards =====
function queueImageFetch(link) {
  if (!link || !/^https?:\/\//i.test(link)) return;
  if (imageFetchQueued.has(link)) return;
  imageFetchQueued.add(link);
  imageFetchQueue.push(link);
  pumpImageQueue();
}

function pumpImageQueue() {
  while (imageFetchActive < IMAGE_FETCH_CONCURRENCY && imageFetchQueue.length > 0) {
    const link = imageFetchQueue.shift();
    imageFetchActive++;
    fetchPageImage(link)
      .catch(() => "")
      .then((url) => {
        imageCache[link] = url;
        scheduleImageCacheSave();
        imageFetchQueued.delete(link);
        applyFetchedImage(link, url);
      })
      .finally(() => {
        imageFetchActive--;
        pumpImageQueue();
      });
  }
}

async function fetchPageImage(link) {
  const resp = await fetch(link, { signal: AbortSignal.timeout(10000), credentials: "omit" });
  if (!resp.ok) return "";
  const type = resp.headers.get("content-type") || "";
  if (type && !/html|xml/i.test(type)) return "";
  // Only read the head of the document; og tags live there
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
  const doc = new DOMParser().parseFromString(html, "text/html");
  const meta =
    doc.querySelector('meta[property="og:image"], meta[property="og:image:url"], meta[name="og:image"], meta[name="twitter:image"], meta[property="twitter:image"], meta[name="twitter:image:src"]');
  const content = meta?.getAttribute("content") || "";
  if (!content) return "";
  try {
    const abs = new URL(content.trim(), link).href;
    return /^https?:\/\//i.test(abs) ? abs : "";
  } catch {
    return "";
  }
}

function applyFetchedImage(link, url) {
  if (!isCardView) return;
  articleListEl.querySelectorAll(".article-row").forEach((row) => {
    if (row.dataset.link !== link) return;
    const slot = row.querySelector(".article-image.pending");
    if (!slot) return;
    slot.classList.remove("pending");
    if (!url) {
      slot.remove();
      return;
    }
    const img = document.createElement("img");
    img.alt = "";
    img.loading = "lazy";
    img.addEventListener("error", () => slot.remove());
    img.src = url;
    slot.appendChild(img);
  });
}

function scheduleImageCacheSave() {
  imageCacheDirty = true;
  if (imageCacheSaveTimer) return;
  imageCacheSaveTimer = setTimeout(saveImageCache, 1500);
}

async function saveImageCache() {
  imageCacheSaveTimer = null;
  if (!imageCacheDirty) return;
  imageCacheDirty = false;
  // Keep only links still present in feeds, capped at IMAGE_CACHE_MAX
  const present = new Set();
  feeds.forEach((f) => (f.items || []).forEach((it) => it.link && present.add(it.link)));
  const entries = Object.entries(imageCache).filter(([l]) => present.has(l));
  imageCache = Object.fromEntries(entries.slice(-IMAGE_CACHE_MAX));
  await chrome.storage.local.set({ imageCache });
}

// Drop read-marks for links no longer present in any feed, keeping the most recent
// MAX_STALE_READ of them so re-published old items don't come back as unread.
const MAX_STALE_READ = 2000;
function pruneReadArticles(readList, feedList) {
  const present = new Set();
  (feedList || []).forEach((f) => (f.items || []).forEach((it) => it.link && present.add(it.link)));
  const stale = readList.filter((l) => !present.has(l));
  const keepStale = new Set(stale.slice(-MAX_STALE_READ));
  return readList.filter((l) => present.has(l) || keepStale.has(l));
}

// ===== Open Original =====
// Mark as read and open the original article. active=true focuses the new tab.
function openOriginal(row, active) {
  const link = row.dataset.link;
  if (!link || !isHttpUrl(link)) return; // never open file:, chrome:, javascript: etc. from a feed
  readArticles.add(link);
  saveReadArticles();
  row.classList.add("read");
  renderFeedList(); // update unread counts
  if (typeof chrome !== "undefined" && chrome.tabs?.create) {
    chrome.tabs.create({ url: link.trim(), active });
  } else {
    window.open(link.trim(), "_blank");
  }
}

// ===== Bookmark =====
function toggleBookmark(link, btnEl) {
  if (!link) return;
  const wasBookmarked = bookmarkedArticles.has(link);
  if (wasBookmarked) {
    bookmarkedArticles.delete(link);
  } else {
    bookmarkedArticles.add(link);
  }
  saveBookmarks();

  // Update the clicked button
  if (btnEl) {
    const now = !wasBookmarked;
    btnEl.classList.toggle("bookmarked", now);
    btnEl.textContent = now ? "★" : "☆";
  }
  renderFeedList();
}

// ===== Keyboard shortcuts =====
// j / k select the next / previous article (outlined and kept in view); the other keys
// act on the selected article. Keys are ignored while typing in a field, while a dialog
// is open, and with Ctrl / Cmd / Alt (those belong to the browser).
let cursorLink = null;

function cursorElement() {
  if (!cursorLink) return null;
  return [...articleListEl.querySelectorAll(":scope > .article-row")].find((r) => r.dataset.link === cursorLink) || null;
}

function setCursor(row) {
  articleListEl.querySelector(".article-row.cursor")?.classList.remove("cursor");
  cursorLink = row ? row.dataset.link : null;
  if (!row) return;
  row.classList.add("cursor");
  lastProgrammaticScrollAt = performance.now(); // moving the selection is not reading by scrolling
  row.scrollIntoView({ block: "nearest" });
}

function moveCursor(delta) {
  const rows = [...articleListEl.querySelectorAll(":scope > .article-row")];
  if (!rows.length) return;
  const i = rows.indexOf(cursorElement());
  if (i < 0) {
    // Nothing selected yet: start from the first article in view
    const top = articleListEl.getBoundingClientRect().top;
    setCursor(rows.find((r) => r.getBoundingClientRect().bottom > top) || rows[0]);
    return;
  }
  setCursor(rows[Math.max(0, Math.min(rows.length - 1, i + delta))]);
}

// Toggle an article between read and unread. The row stays in place even when read
// articles are hidden, as when it is opened, so the selection doesn't jump.
function toggleRead(row) {
  const link = row.dataset.link;
  if (!link) return;
  if (readArticles.has(link)) readArticles.delete(link);
  else readArticles.add(link);
  row.classList.toggle("read", readArticles.has(link));
  saveReadArticles();
  renderFeedList();
  setupScrollReadObserver(); // an article made unread must be watched again
}

function openHelp() {
  const keys = [
    ["<kbd>j</kbd> / <kbd>k</kbd>", "keyNextPrev"],
    ["<kbd>o</kbd> / <kbd>Enter</kbd>", "keyOpen"],
    ["<kbd>Shift</kbd> + <kbd>o</kbd>", "keyOpenBackground"],
    ["<kbd>m</kbd>", "keyRead"],
    ["<kbd>s</kbd>", "keyBookmark"],
    ["<kbd>/</kbd>", "keySearch"],
    ["<kbd>r</kbd>", "keyRefresh"],
    ["<kbd>?</kbd>", "keyHelp"],
    ["<kbd>Esc</kbd>", "keyEscape"],
  ];
  document.getElementById("help-modal-title").textContent = t("shortcuts").replace(/^⌨\s*/, "");
  document.getElementById("help-table").innerHTML = keys
    .map(([k, label]) => `<tr><td>${k}</td><td>${escapeHtml(t(label))}</td></tr>`)
    .join("");
  document.getElementById("btn-help-close").textContent = t("close");
  helpModalOverlay.classList.remove("hidden");
}

function closeHelp() {
  helpModalOverlay.classList.add("hidden");
}

function handleShortcut(e) {
  if (e.key === "Escape") {
    if (!helpModalOverlay.classList.contains("hidden")) closeHelp();
    else if (!modalOverlay.classList.contains("hidden")) closeModal();
    else if (!folderModalOverlay.classList.contains("hidden")) closeFolderModal();
    else if (document.querySelector(".feed-context-menu")) document.querySelectorAll(".feed-context-menu").forEach((m) => m.remove());
    else if (document.activeElement === searchInput) searchInput.blur();
    return;
  }
  if (e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return;
  if (e.target.closest?.("input, select, textarea, [contenteditable]")) return;
  if ([modalOverlay, folderModalOverlay, helpModalOverlay].some((o) => !o.classList.contains("hidden"))) return;
  const run = (fn) => {
    e.preventDefault();
    fn();
  };
  const key = e.key;
  if (key === "j") return run(() => moveCursor(1));
  if (key === "k") return run(() => moveCursor(-1));
  if (key === "/") return run(() => searchInput.focus());
  if (key === "r") return run(() => refreshAll());
  if (key === "?") return run(openHelp);
  const row = cursorElement();
  if (!row) return;
  if (key === "o" || key === "O" || key === "Enter") return run(() => openOriginal(row, !e.shiftKey));
  if (key === "m") return run(() => toggleRead(row));
  if (key === "s") return run(() => toggleBookmark(row.dataset.link, row.querySelector(".bookmark-btn")));
}

// ===== View Toggle =====
function setView(card) {
  isCardView = card;
  applyViewButtons();
  chrome.storage.local.set({ isCardView });
  renderArticles();
}

function applyViewButtons() {
  document.getElementById("btn-view-list").classList.toggle("active", !isCardView);
  document.getElementById("btn-view-card").classList.toggle("active", isCardView);
}

// ===== Sharing =====
function handleShare(btn, link, title) {
  const type = btn.dataset.share;
  let shareUrl = "";
  if (type === "twitter") {
    shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}&text=${encodeURIComponent(title)}`;
  } else if (type === "facebook") {
    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`;
  }
  if (shareUrl) window.open(shareUrl, "_blank", "width=600,height=400");
}

// ===== Helpers =====
function relativeTime(dateStr) {
  const ts = parseFeedDate(dateStr);
  if (ts === null) return "";

  const now = Date.now();
  const diff = now - ts;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return t("justNow");
  if (minutes < 60) return t("minutesAgo", { n: minutes });
  if (hours < 24) return t("hoursAgo", { n: hours });
  if (days < 30) return t("daysAgo", { n: days });
  return formatDate(dateStr);
}

function formatDate(dateStr) {
  const ts = parseFeedDate(dateStr);
  if (ts === null) return dateStr || "";
  const d = new Date(ts);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}/${m}/${day}`;
}

function getUnreadCount(feed) {
  return unreadLinks([feed]).size;
}

// Unread article links in the given feeds; an article in several feeds counts once (B6)
function unreadLinks(list) {
  const links = new Set();
  for (const f of list) for (const it of f.items || []) if (it.link && !readArticles.has(it.link)) links.add(it.link);
  return links;
}

// Bookmarked articles that still exist in some feed (what the bookmark view can show)
function getBookmarkCount() {
  const links = new Set();
  feeds.forEach((f) =>
    (f.items || []).forEach((it) => {
      if (bookmarkedArticles.has(it.link)) links.add(it.link);
    })
  );
  return links.size;
}

// Mark every unread article in the current view (selection + search) as read
function markAllRead() {
  const links = [...new Set(getFilteredArticles().map((a) => a.link))].filter(
    (l) => l && !readArticles.has(l)
  );
  if (links.length === 0) return;
  if (!confirm(t("markAllReadConfirm", { n: links.length }))) return;
  links.forEach((l) => readArticles.add(l));
  saveReadArticles();
  setScrollTop(0);
  renderFeedList();
  renderArticles();
}

function getTotalUnread() {
  return unreadLinks(feeds).size;
}

// Favicons come from the browser's own favicon cache (the "favicon" permission's
// _favicon/ endpoint) instead of Google's favicon service, which would learn every site
// the user subscribes to (S1). Sites never visited in this browser show a generic icon.
function getFaviconUrl(feed) {
  if (!feed) return "";
  let pageUrl = feed.siteUrl || feed.url || "";
  try {
    pageUrl = new URL(pageUrl).origin + "/";
  } catch {
    return "";
  }
  return `${chrome.runtime.getURL("/_favicon/")}?pageUrl=${encodeURIComponent(pageUrl)}&size=32`;
}

// Feed errors are stored as written at the time: English internal messages from the
// background refresh, or text in whichever language the reader used then. Show them in
// the current language where we know them (B12).
function describeFeedError(msg) {
  const all = (key) => [translations.ja[key], translations.en[key]];
  if (msg === "XML parse error" || all("xmlParseError").includes(msg)) return t("xmlParseError");
  if (msg === "Unsupported feed format" || all("unsupportedFormat").includes(msg)) return t("unsupportedFormat");
  if (msg === "Feed too large") return t("feedTooLarge");
  return msg;
}

function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function showModalError(msg) {
  if (!msg) {
    modalError.classList.add("hidden");
    return;
  }
  modalError.textContent = msg;
  modalError.classList.remove("hidden");
}

// ===== Settings Menu (Import / Export) =====
function showSettingsMenu() {
  document.querySelectorAll(".feed-context-menu").forEach((m) => m.remove());
  const btn = document.getElementById("btn-settings");
  const rect = btn.getBoundingClientRect();
  const menu = document.createElement("div");
  menu.className = "feed-context-menu";
  menu.style.left = rect.left + "px";
  menu.style.top = rect.bottom + 4 + "px";

  const importBtn = document.createElement("div");
  importBtn.textContent = t("opmlImport");
  importBtn.addEventListener("click", (ev) => {
    ev.stopPropagation();
    menu.remove();
    document.getElementById("opml-file-input").click();
  });
  menu.appendChild(importBtn);

  const exportBtn = document.createElement("div");
  exportBtn.textContent = t("opmlExport");
  exportBtn.addEventListener("click", (ev) => {
    ev.stopPropagation();
    menu.remove();
    exportOpml();
  });
  menu.appendChild(exportBtn);

  const helpBtn = document.createElement("div");
  helpBtn.textContent = t("shortcuts");
  helpBtn.addEventListener("click", (ev) => {
    ev.stopPropagation();
    menu.remove();
    openHelp();
  });
  menu.appendChild(helpBtn);

  const sep = document.createElement("div");
  sep.className = "context-menu-sep";
  menu.appendChild(sep);

  const darkBtn = document.createElement("div");
  darkBtn.textContent = darkMode ? t("lightMode") : t("darkMode");
  darkBtn.addEventListener("click", (ev) => {
    ev.stopPropagation();
    menu.remove();
    toggleDarkMode();
  });
  menu.appendChild(darkBtn);

  const sep2 = document.createElement("div");
  sep2.className = "context-menu-sep";
  menu.appendChild(sep2);

  const scrollReadBtn = document.createElement("div");
  scrollReadBtn.textContent = (markReadOnScroll ? "✔ " : "　") + t("markReadOnScroll");
  scrollReadBtn.addEventListener("click", async (ev) => {
    ev.stopPropagation();
    menu.remove();
    markReadOnScroll = !markReadOnScroll;
    await chrome.storage.local.set({ markReadOnScroll });
    setupScrollReadObserver();
  });
  menu.appendChild(scrollReadBtn);

  const hideReadBtn = document.createElement("div");
  hideReadBtn.textContent = (hideReadArticles ? "✔ " : "　") + t("hideRead");
  hideReadBtn.addEventListener("click", async (ev) => {
    ev.stopPropagation();
    menu.remove();
    hideReadArticles = !hideReadArticles;
    await chrome.storage.local.set({ hideReadArticles });
    renderArticles();
  });
  menu.appendChild(hideReadBtn);

  const sep3 = document.createElement("div");
  sep3.className = "context-menu-sep";
  menu.appendChild(sep3);

  const fontHeader = document.createElement("div");
  fontHeader.className = "context-menu-header";
  fontHeader.textContent = t("font");
  menu.appendChild(fontHeader);

  const fontOptions = [
    { label: t("fontDefault"), value: "" },
    { label: "Meiryo", value: "'Meiryo', sans-serif" },
    { label: "游ゴシック", value: "'Yu Gothic', 'YuGothic', sans-serif" },
    { label: "游明朝", value: "'Yu Mincho', 'YuMincho', serif" },
    { label: "Noto Sans JP", value: "'Noto Sans JP', sans-serif" },
    { label: "BIZ UDゴシック", value: "'BIZ UDGothic', sans-serif" },
    { label: "BIZ UD明朝", value: "'BIZ UDMincho', serif" },
    { label: "monospace", value: "monospace" },
  ];

  fontOptions.forEach((opt) => {
    const item = document.createElement("div");
    item.className = "context-menu-sub";
    const isCurrent = fontFamily === opt.value;
    item.textContent = (isCurrent ? "✔ " : "　") + opt.label;
    item.style.fontFamily = opt.value || "inherit";
    item.addEventListener("click", async (ev) => {
      ev.stopPropagation();
      menu.remove();
      fontFamily = opt.value;
      applyFont();
      await chrome.storage.local.set({ fontFamily });
    });
    menu.appendChild(item);
  });

  const sep4 = document.createElement("div");
  sep4.className = "context-menu-sep";
  menu.appendChild(sep4);

  const bgRefreshBtn = document.createElement("div");
  bgRefreshBtn.className = "settings-menu-item";
  bgRefreshBtn.textContent = (backgroundRefresh ? "✔ " : "　") + t("backgroundRefresh");
  bgRefreshBtn.addEventListener("click", async (ev) => {
    ev.stopPropagation();
    menu.remove();
    backgroundRefresh = !backgroundRefresh;
    await chrome.storage.local.set({ backgroundRefresh });
  });
  menu.appendChild(bgRefreshBtn);

  const refreshHeader = document.createElement("div");
  refreshHeader.className = "context-menu-header";
  refreshHeader.textContent = t("autoRefresh");
  menu.appendChild(refreshHeader);

  const intervalOptions = [
    { label: t("off"), value: 0 },
    { label: t("minutes", { n: 1 }), value: 1 },
    { label: t("minutes", { n: 5 }), value: 5 },
    { label: t("minutes", { n: 10 }), value: 10 },
    { label: t("minutes", { n: 30 }), value: 30 },
    { label: t("minutes", { n: 60 }), value: 60 },
  ];

  intervalOptions.forEach((opt) => {
    const item = document.createElement("div");
    item.className = "context-menu-sub";
    const isCurrent = autoRefreshMinutes === opt.value;
    item.textContent = (isCurrent ? "✔ " : "　") + opt.label;
    item.addEventListener("click", async (ev) => {
      ev.stopPropagation();
      menu.remove();
      autoRefreshMinutes = opt.value;
      await chrome.storage.local.set({ autoRefreshMinutes });
      startAutoRefresh();
    });
    menu.appendChild(item);
  });

  // Language
  const langHeader = document.createElement("div");
  langHeader.className = "context-menu-header";
  langHeader.textContent = t("language");
  menu.appendChild(langHeader);
  const langOptions = [
    { label: "日本語", value: "ja" },
    { label: "English", value: "en" },
  ];
  langOptions.forEach(opt => {
    const item = document.createElement("div");
    item.className = "settings-menu-item";
    item.textContent = (language === opt.value ? "✔ " : "　") + opt.label;
    item.addEventListener("click", async (ev) => {
      ev.stopPropagation();
      menu.remove();
      language = opt.value;
      await chrome.storage.local.set({ language });
      applyLanguage();
      renderFeedList();
      renderArticles();
    });
    menu.appendChild(item);
  });

  showMenu(menu);
}

// ===== Dark Mode =====
async function toggleDarkMode() {
  darkMode = !darkMode;
  applyDarkMode();
  await chrome.storage.local.set({ darkMode });
}

function applyDarkMode() {
  document.documentElement.classList.toggle("dark", darkMode);
  const favicon = document.getElementById("favicon");
  if (favicon) {
    favicon.href = darkMode ? "icons/dark/icon48.png" : "icons/icon48.png";
  }
}

function updateActionIcon() {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  // Persist so background.js can restore icon after browser restart
  chrome.storage.local.set({ prefersDarkIcon: isDark });
  applyActionIcon(isDark);
}

function applyActionIcon(isDark) {
  const folder = isDark ? "icons/dark" : "icons";
  chrome.action.setIcon({
    path: {
      16: `${folder}/icon16.png`,
      48: `${folder}/icon48.png`,
      128: `${folder}/icon128.png`,
    },
  });
}

function applyFont() {
  document.body.style.fontFamily = fontFamily || "";
}

function applyLanguage() {
  document.documentElement.lang = language;
  document.getElementById("feed-name-input").placeholder = t("feedNamePlaceholder");
  document.getElementById("folder-name-input").placeholder = t("folderName");
  document.title = t("appTitle");
  document.querySelector("#sidebar-header h1").textContent = t("appTitle");
  document.getElementById("btn-add-folder").title = t("addFolder");
  document.getElementById("btn-refresh").title = t("refresh");
  document.getElementById("btn-settings").title = t("settings");
  document.getElementById("btn-add-feed").textContent = t("addFeed");
  document.getElementById("search-input").placeholder = t("search");
  document.getElementById("btn-mark-all-read").title = t("markAllRead");
  document.getElementById("btn-view-list").title = t("listView");
  document.getElementById("btn-view-card").title = t("cardView");
  // Feed modal
  document.querySelector('#modal-overlay h2').textContent = t("addFeed");
  document.querySelector('label[for="feed-url-input"]').textContent = t("feedUrl");
  document.querySelector('label[for="feed-name-input"]').textContent = t("feedName");
  document.querySelector('label[for="feed-folder-select"]').textContent = t("feedFolder");
  document.getElementById("btn-modal-cancel").textContent = t("cancel");
  document.getElementById("btn-modal-add").textContent = t("add");
  // Folder modal
  document.querySelector('#folder-modal-overlay h2').textContent = t("addFolder");
  document.querySelector('label[for="folder-name-input"]').textContent = t("folderName");
  document.getElementById("btn-folder-modal-cancel").textContent = t("cancel");
  document.getElementById("btn-folder-modal-add").textContent = t("add");
  // Content header placeholder
  if (selection.type === "all") {
    document.getElementById("feed-title").textContent = t("allFeeds");
  }
}

// ===== OPML Export =====
function exportOpml() {
  const lines = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<opml version="2.0">');
  lines.push("  <head>");
  lines.push(`    <title>${t("opmlExportTitle")}</title>`);
  lines.push("  </head>");
  lines.push("  <body>");

  // Feeds not in any folder
  feeds
    .filter((f) => !f.folderId)
    .forEach((f) => {
      lines.push(
        `    <outline text="${escapeXmlAttr(f.title)}" title="${escapeXmlAttr(f.title)}" type="rss" xmlUrl="${escapeXmlAttr(f.url)}" htmlUrl="${escapeXmlAttr(f.siteUrl || "")}" />`
      );
    });

  // Folders
  folders.forEach((folder) => {
    const folderFeeds = feeds.filter((f) => f.folderId === folder.id);
    lines.push(`    <outline text="${escapeXmlAttr(folder.name)}" title="${escapeXmlAttr(folder.name)}">`);
    folderFeeds.forEach((f) => {
      lines.push(
        `      <outline text="${escapeXmlAttr(f.title)}" title="${escapeXmlAttr(f.title)}" type="rss" xmlUrl="${escapeXmlAttr(f.url)}" htmlUrl="${escapeXmlAttr(f.siteUrl || "")}" />`
      );
    });
    lines.push("    </outline>");
  });

  lines.push("  </body>");
  lines.push("</opml>");

  const blob = new Blob([lines.join("\n")], { type: "text/xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "rss-feeds.opml";
  a.click();
  URL.revokeObjectURL(url);
}

// ===== OPML Import =====
async function handleOpmlImport(e) {
  const file = e.target.files[0];
  if (!file) return;
  e.target.value = "";

  try {
    const text = await file.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "text/xml");

    if (xml.querySelector("parsererror")) {
      alert(t("opmlParseError"));
      return;
    }

    const body = xml.querySelector("body");
    if (!body) {
      alert(t("opmlFormatError"));
      return;
    }

    let importedFeeds = 0;
    let importedFolders = 0;
    const existingUrls = new Set(feeds.map((f) => feedUrlKey(f.url)));

    const topOutlines = body.querySelectorAll(":scope > outline");
    for (const outline of topOutlines) {
      const xmlUrl = outline.getAttribute("xmlUrl");
      if (xmlUrl && !isHttpUrl(xmlUrl)) continue; // relative, data:, ... are never fetched (S5)
      if (xmlUrl) {
        // Top-level feed
        if (!existingUrls.has(feedUrlKey(xmlUrl))) {
          feeds.push(outlineToFeed(outline, null));
          existingUrls.add(feedUrlKey(xmlUrl));
          importedFeeds++;
        }
      } else {
        // Folder
        const folderName = outline.getAttribute("text") || outline.getAttribute("title") || t("defaultFolder");
        let folder = folders.find((f) => f.name === folderName);
        if (!folder) {
          folder = {
            id: "folder_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6),
            name: folderName,
            collapsed: false,
          };
          folders.push(folder);
          importedFolders++;
        }

        // Folders here are one level deep, so feeds in nested folders go into the
        // top-level one rather than being dropped.
        const children = outline.querySelectorAll("outline");
        for (const child of children) {
          const childUrl = child.getAttribute("xmlUrl");
          if (childUrl && isHttpUrl(childUrl) && !existingUrls.has(feedUrlKey(childUrl))) {
            feeds.push(outlineToFeed(child, folder.id));
            existingUrls.add(feedUrlKey(childUrl));
            importedFeeds++;
          }
        }
      }
    }

    await saveFeeds();
    await saveFolders();
    renderFeedList();
    renderArticles();

    alert(t("opmlImportDone", { feeds: importedFeeds, folders: importedFolders }));
    if (importedFeeds > 0) refreshAll(); // imported feeds have no articles yet
  } catch (err) {
    alert(t("opmlImportError") + err.message);
  }
}

function outlineToFeed(outline, folderId) {
  return {
    url: outline.getAttribute("xmlUrl") || "",
    title: outline.getAttribute("text") || outline.getAttribute("title") || "",
    description: outline.getAttribute("description") || "",
    siteUrl: outline.getAttribute("htmlUrl") || "",
    items: [],
    folderId: folderId,
    lastUpdated: 0,
  };
}

function escapeXmlAttr(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
