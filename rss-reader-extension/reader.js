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
    shareTwitter: "Twitterで共有",
    shareFacebook: "Facebookで共有",
    bookmark: "ブックマーク",
    bookmarked: "ブックマーク済み",
    openOriginal: "元の記事を開く ↗",
    noContent: "内容がありません",
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
    shareTwitter: "Share on Twitter",
    shareFacebook: "Share on Facebook",
    bookmark: "Bookmark",
    bookmarked: "Bookmarked",
    openOriginal: "Open original ↗",
    noContent: "No content available",
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
const detailOverlay = document.getElementById("detail-overlay");
const detailContent = document.getElementById("detail-content");
const folderModalOverlay = document.getElementById("folder-modal-overlay");
const folderNameInput = document.getElementById("folder-name-input");
const folderModalError = document.getElementById("folder-modal-error");

// ===== Init =====
document.addEventListener("DOMContentLoaded", async () => {
  await loadState();
  renderFeedList();
  renderArticles();
  bindEvents();
  // Set icon on load and watch for OS color scheme changes
  updateActionIcon();
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateActionIcon);
  // Refresh all feeds on open
  refreshAll();
  // When background service worker updates feeds in storage, reload and re-render
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes.feeds) {
      feeds = changes.feeds.newValue || [];
      renderFeedList();
      renderArticles();
    }
  });
});

// ===== Storage =====
async function loadState() {
  const data = await chrome.storage.local.get(["feeds", "folders", "readArticles", "bookmarkedArticles", "darkMode", "markReadOnScroll", "hideReadArticles", "fontFamily", "autoRefreshMinutes", "language", "backgroundRefresh"]);
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
  applyDarkMode();
  applyFont();
  applyLanguage();
  startAutoRefresh();
}

async function saveFeeds() {
  await chrome.storage.local.set({ feeds });
}

async function saveFolders() {
  await chrome.storage.local.set({ folders });
}

async function saveReadArticles() {
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
  document.getElementById("btn-close-detail").addEventListener("click", closeDetail);
  document.getElementById("btn-refresh").addEventListener("click", refreshAll);
  document.getElementById("btn-view-list").addEventListener("click", () => setView(false));
  document.getElementById("btn-view-card").addEventListener("click", () => setView(true));

  document.getElementById("btn-settings").addEventListener("click", showSettingsMenu);

  const opmlInput = document.getElementById("opml-file-input");
  opmlInput.addEventListener("change", handleOpmlImport);

  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase();
    renderArticles();
  });

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  folderModalOverlay.addEventListener("click", (e) => {
    if (e.target === folderModalOverlay) closeFolderModal();
  });

  detailOverlay.addEventListener("click", (e) => {
    if (e.target === detailOverlay) closeDetail();
  });

  feedUrlInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addFeed();
  });

  folderNameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addFolder();
  });

  // Close context menu on click elsewhere
  document.addEventListener("click", (e) => {
    if (e.target.closest(".feed-context-menu") || e.target.id === "btn-settings") return;
    document.querySelectorAll(".feed-context-menu").forEach((m) => m.remove());
  });
}

// ===== Feed List Rendering =====
function renderFeedList() {
  tempShowRead = false;
  feedListEl.innerHTML = "";

  // "All Feeds" item
  const allLi = document.createElement("li");
  allLi.className = selection.type === "all" ? "active" : "";
  allLi.innerHTML = `
    <span class="feed-icon" style="font-size:14px;">📰</span>
    <span class="feed-name">${t("allFeeds")}</span>
    <span class="feed-count">${getTotalUnread()}</span>
  `;
  allLi.addEventListener("click", () => {
    selection = { type: "all" };
    renderFeedList();
    renderArticles();
  });
  feedListEl.appendChild(allLi);

  // "Bookmarks" item
  const bookmarkLi = document.createElement("li");
  bookmarkLi.className = selection.type === "bookmark" ? "active" : "";
  bookmarkLi.innerHTML = `
    <span class="feed-icon" style="font-size:14px;">🔖</span>
    <span class="feed-name">${t("bookmarks")}</span>
    <span class="feed-count">${bookmarkedArticles.size}</span>
  `;
  bookmarkLi.addEventListener("click", () => {
    selection = { type: "bookmark" };
    renderFeedList();
    renderArticles();
  });
  feedListEl.appendChild(bookmarkLi);

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
    const folderUnread = folderFeeds.reduce((s, f) => s + getUnreadCount(f), 0);

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

    folderLi.addEventListener("click", () => {
      selection = { type: "folder", folderId: folder.id };
      renderFeedList();
      renderArticles();
    });

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
      const feedIdx = parseInt(e.dataTransfer.getData("text/plain"), 10);
      if (!isNaN(feedIdx) && feeds[feedIdx]) {
        feeds[feedIdx].folderId = folder.id;
        await saveFeeds();
        renderFeedList();
      }
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

  // Drop target: remove from folder (sidebar itself)
  feedListEl.addEventListener("dragover", (e) => e.preventDefault());
  feedListEl.addEventListener("drop", async (e) => {
    if (e.target === feedListEl) {
      e.preventDefault();
      const feedIdx = parseInt(e.dataTransfer.getData("text/plain"), 10);
      if (!isNaN(feedIdx) && feeds[feedIdx]) {
        feeds[feedIdx].folderId = null;
        await saveFeeds();
        renderFeedList();
      }
    }
  });
}

function createFeedLi(feed, idx) {
  const li = document.createElement("li");
  const isActive = selection.type === "feed" && selection.feedIndex === idx;
  li.className = isActive ? "active" : "";
  li.setAttribute("draggable", "true");
  li.setAttribute("data-feed-index", idx);

  const faviconUrl = getFaviconUrl(feed);
  const errorIcon = feed.error
    ? `<span class="feed-error" title="${escapeHtml(feed.error)}">⚠</span>`
    : "";
  li.innerHTML = `
    <img class="feed-icon" src="${faviconUrl}" onerror="this.style.display='none'">
    <span class="feed-name" title="${escapeHtml(feed.title)}">${escapeHtml(feed.title)}</span>
    ${errorIcon}
    <span class="feed-count">${getUnreadCount(feed)}</span>
  `;

  li.addEventListener("click", () => {
    selection = { type: "feed", feedIndex: idx };
    renderFeedList();
    renderArticles();
  });

  li.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    showFeedContextMenu(e, idx);
  });

  li.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", String(idx));
    e.dataTransfer.effectAllowed = "move";
    li.classList.add("dragging");
  });
  li.addEventListener("dragend", () => li.classList.remove("dragging"));

  return li;
}

function showFeedContextMenu(e, feedIndex) {
  document.querySelectorAll(".feed-context-menu").forEach((m) => m.remove());
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
        feeds[feedIndex].folderId = folder.id;
        await saveFeeds();
        renderFeedList();
        menu.remove();
      });
      menu.appendChild(moveBtn);
    });

    if (feeds[feedIndex].folderId) {
      const removeFromFolder = document.createElement("div");
      removeFromFolder.className = "context-menu-sub";
      removeFromFolder.textContent = t("removeFromFolder");
      removeFromFolder.addEventListener("click", async (ev) => {
        ev.stopPropagation();
        feeds[feedIndex].folderId = null;
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
    feeds.splice(feedIndex, 1);
    if (selection.type === "feed") {
      if (selection.feedIndex === feedIndex) selection = { type: "all" };
      else if (selection.feedIndex > feedIndex) selection.feedIndex--;
    }
    await saveFeeds();
    renderFeedList();
    renderArticles();
    menu.remove();
  });

  menu.appendChild(deleteBtn);
  document.body.appendChild(menu);
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
    // Remove folder, move feeds to root
    feeds.forEach((f) => {
      if (f.folderId === folder.id) f.folderId = null;
    });
    folders = folders.filter((f) => f.id !== folder.id);
    if (selection.type === "folder" && selection.folderId === folder.id) {
      selection = { type: "all" };
    }
    await saveFeeds();
    await saveFolders();
    renderFeedList();
    renderArticles();
    menu.remove();
  });
  menu.appendChild(deleteBtn);
  document.body.appendChild(menu);
}

// ===== Article List Rendering =====
function renderArticles() {
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
      ? `${feed.title}${feed.description ? " / " + feed.description : ""}`
      : "";
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

  if (articles.length === 0) {
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

  articleListEl.className = isCardView ? "card-view" : "";
  articleListEl.innerHTML = articles
    .map((a) => {
      const isRead = readArticles.has(a.link);
      const isBookmarked = bookmarkedArticles.has(a.link);
      const timeStr = relativeTime(a.pubDate);
      return `
      <div class="article-row ${isRead ? "read" : ""}" data-link="${escapeHtml(a.link)}" data-feed-index="${a._feedIndex}">
        <div class="article-source">
          <img src="${getFaviconUrl(feeds[a._feedIndex])}" onerror="this.style.display='none'" width="16" height="16">
          <span class="article-source-name">${escapeHtml(a._feedTitle)}</span>
        </div>
        <span class="article-title" title="${escapeHtml(a.title)}">${escapeHtml(a.title)}</span>
        <div class="article-meta">
          <div class="article-share">
            <button class="bookmark-btn ${isBookmarked ? "bookmarked" : ""}" title="${t("bookmark")}">${isBookmarked ? "★" : "☆"}</button>
            <button class="share-btn" data-share="twitter" title="${t("shareTwitter")}">𝕏</button>
            <button class="share-btn" data-share="facebook" title="${t("shareFacebook")}">f</button>
          </div>
          <span class="article-time">${timeStr}</span>
        </div>
      </div>
    `;
    })
    .join("");

  // Bind article events
  articleListEl.querySelectorAll(".article-row").forEach((row) => {
    row.addEventListener("click", (e) => {
      if (e.target.classList.contains("share-btn")) {
        handleShare(e.target, row.dataset.link, row.querySelector(".article-title").textContent);
        return;
      }
      if (e.target.classList.contains("bookmark-btn")) {
        toggleBookmark(row.dataset.link, e.target);
        return;
      }
      openArticle(row);
    });
    row.addEventListener("auxclick", (e) => {
      if (e.button === 1) {
        e.preventDefault();
        const link = row.dataset.link;
        if (link) {
          readArticles.add(link);
          saveReadArticles();
          row.classList.add("read");
          renderFeedList();
          window.open(link, "_blank");
        }
      }
    });
  });

  // Mark as read on scroll (IntersectionObserver)
  setupScrollReadObserver();
}

let scrollReadObserver = null;

function setupScrollReadObserver() {
  if (scrollReadObserver) {
    scrollReadObserver.disconnect();
    scrollReadObserver = null;
  }
  if (!markReadOnScroll) return;

  scrollReadObserver = new IntersectionObserver(
    (entries) => {
      let changed = false;
      entries.forEach((entry) => {
        // Mark as read when the row scrolls out above the viewport
        if (entry.isIntersecting) return;
        if (!entry.rootBounds) return;
        if (entry.boundingClientRect.bottom >= entry.rootBounds.top) return;
        const row = entry.target;
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
  articles.sort((a, b) => {
    const da = a.pubDate ? new Date(a.pubDate).getTime() : 0;
    const db = b.pubDate ? new Date(b.pubDate).getTime() : 0;
    return db - da;
  });

  // Hide read articles
  if (hideReadArticles && !tempShowRead) {
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

async function addFeed() {
  const url = feedUrlInput.value.trim();
  if (!url) {
    showModalError(t("enterUrl"));
    return;
  }

  try {
    showModalError("");
    modalError.classList.add("hidden");

    const btn = document.getElementById("btn-modal-add");
    btn.textContent = t("loading");
    btn.disabled = true;

    const result = await fetchFeed(url);
    const customName = feedNameInput.value.trim();

    feeds.push({
      url,
      title: customName || result.title || url,
      description: result.description || "",
      siteUrl: result.siteUrl || "",
      items: result.items || [],
      folderId: feedFolderSelect.value || null,
      lastUpdated: Date.now(),
    });

    await saveFeeds();
    closeModal();
    renderFeedList();
    renderArticles();

    btn.textContent = t("add");
    btn.disabled = false;
  } catch (err) {
    showModalError(t("fetchError") + err.message);
    const btn = document.getElementById("btn-modal-add");
    btn.textContent = t("add");
    btn.disabled = false;
  }
}

async function refreshAll() {
  const btn = document.getElementById("btn-refresh");
  btn.textContent = "⏳";
  btn.disabled = true;

  for (let i = 0; i < feeds.length; i++) {
    try {
      const result = await fetchFeed(feeds[i].url);
      feeds[i].items = result.items;
      feeds[i].lastUpdated = Date.now();
      feeds[i].error = null;
      if (!feeds[i].title || feeds[i].title === feeds[i].url) {
        feeds[i].title = result.title || feeds[i].url;
      }
      if (result.description) {
        feeds[i].description = result.description;
      }
    } catch (e) {
      feeds[i].error = e.message || String(e);
      console.warn(`Failed to refresh: ${feeds[i].url}`, e);
    }
    // Update UI and save after each feed so articles appear incrementally
    await saveFeeds();
    renderFeedList();
    renderArticles();
  }

  btn.textContent = "⟳";
  btn.disabled = false;
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
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  const text = await resp.text();

  const parser = new DOMParser();
  const xml = parser.parseFromString(text, "text/xml");

  const parseError = xml.querySelector("parsererror");
  if (parseError) throw new Error(t("xmlParseError"));

  const result = { title: "", description: "", siteUrl: "", items: [] };

  // RSS 2.0
  const channel = xml.querySelector("channel");
  if (channel) {
    result.title = channel.querySelector(":scope > title")?.textContent || "";
    result.description = channel.querySelector(":scope > description")?.textContent || "";
    result.siteUrl = channel.querySelector(":scope > link")?.textContent || "";

    xml.querySelectorAll("item").forEach((item) => {
      result.items.push({
        title: item.querySelector("title")?.textContent || "",
        link: item.querySelector("link")?.textContent || "",
        description: item.querySelector("description")?.textContent || "",
        pubDate: item.querySelector("pubDate")?.textContent || "",
      });
    });
    return result;
  }

  // Atom
  const atomFeed = xml.querySelector("feed");
  if (atomFeed) {
    result.title = atomFeed.querySelector(":scope > title")?.textContent || "";
    result.description = atomFeed.querySelector(":scope > subtitle")?.textContent || "";
    const siteLink = atomFeed.querySelector(':scope > link[rel="alternate"]');
    result.siteUrl = siteLink?.getAttribute("href") || "";

    xml.querySelectorAll("entry").forEach((entry) => {
      const link =
        entry.querySelector('link[rel="alternate"]')?.getAttribute("href") ||
        entry.querySelector("link")?.getAttribute("href") ||
        "";
      result.items.push({
        title: entry.querySelector("title")?.textContent || "",
        link,
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
    return result;
  }

  throw new Error(t("unsupportedFormat"));
}

// ===== Article Detail =====
function openArticle(row) {
  const link = row.dataset.link;
  const feedIndex = parseInt(row.dataset.feedIndex, 10);
  const feed = feeds[feedIndex];
  const article = feed?.items?.find((it) => it.link === link);
  if (!article) return;

  // Mark as read
  readArticles.add(link);
  saveReadArticles();
  row.classList.add("read");
  renderFeedList(); // update unread counts

  // Show detail
  const isBookmarked = bookmarkedArticles.has(article.link);
  detailContent.innerHTML = `
    <h2>${escapeHtml(article.title)}</h2>
    <div class="detail-meta">
      <span>${escapeHtml(feed.title)}</span>
      <span>${article.pubDate ? formatDate(article.pubDate) : ""}</span>
      <button class="detail-bookmark-btn ${isBookmarked ? "bookmarked" : ""}" data-link="${escapeHtml(article.link)}">${isBookmarked ? "★ " + t("bookmarked") : "☆ " + t("bookmark")}</button>
    </div>
    <div class="detail-body">${sanitizeHtml(article.description)}</div>
    <a class="detail-link" href="${escapeHtml(article.link)}" target="_blank" rel="noopener">
      ${t("openOriginal")}
    </a>
  `;
  detailContent.querySelector(".detail-bookmark-btn").addEventListener("click", (e) => {
    toggleBookmark(e.target.dataset.link, e.target);
  });
  detailOverlay.classList.remove("hidden");
}

function closeDetail() {
  detailOverlay.classList.add("hidden");
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
    if (btnEl.classList.contains("detail-bookmark-btn")) {
      btnEl.textContent = now ? "★ " + t("bookmarked") : "☆ " + t("bookmark");
    } else {
      btnEl.textContent = now ? "★" : "☆";
    }
  }
  renderFeedList();
}

// ===== View Toggle =====
function setView(card) {
  isCardView = card;
  document.getElementById("btn-view-list").classList.toggle("active", !card);
  document.getElementById("btn-view-card").classList.toggle("active", card);
  renderArticles();
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
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";

  const now = Date.now();
  const diff = now - date.getTime();
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
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}/${m}/${day}`;
}

function getUnreadCount(feed) {
  return (feed.items || []).filter((it) => !readArticles.has(it.link)).length;
}

function getTotalUnread() {
  return feeds.reduce((sum, f) => sum + getUnreadCount(f), 0);
}

function getFaviconUrl(feed) {
  if (!feed || !feed.siteUrl) {
    if (feed && feed.url) {
      try {
        const u = new URL(feed.url);
        return `https://www.google.com/s2/favicons?domain=${u.hostname}&sz=32`;
      } catch {
        return "";
      }
    }
    return "";
  }
  try {
    const u = new URL(feed.siteUrl);
    return `https://www.google.com/s2/favicons?domain=${u.hostname}&sz=32`;
  } catch {
    return "";
  }
}

function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sanitizeHtml(html) {
  if (!html) return `<p>${t("noContent")}</p>`;
  // Basic sanitization: allow only safe tags
  const div = document.createElement("div");
  div.innerHTML = html;
  // Remove script tags
  div.querySelectorAll("script, style, iframe, object, embed").forEach((el) => el.remove());
  return div.innerHTML;
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
  langHeader.className = "settings-menu-header";
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

  document.body.appendChild(menu);
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
  document.title = t("appTitle");
  document.querySelector("#sidebar-header h1").textContent = t("appTitle");
  document.getElementById("btn-add-folder").title = t("addFolder");
  document.getElementById("btn-refresh").title = t("refresh");
  document.getElementById("btn-settings").title = t("settings");
  document.getElementById("btn-add-feed").textContent = t("addFeed");
  document.getElementById("search-input").placeholder = t("search");
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
    const existingUrls = new Set(feeds.map((f) => f.url));

    const topOutlines = body.querySelectorAll(":scope > outline");
    for (const outline of topOutlines) {
      const xmlUrl = outline.getAttribute("xmlUrl");
      if (xmlUrl) {
        // Top-level feed
        if (!existingUrls.has(xmlUrl)) {
          feeds.push(outlineToFeed(outline, null));
          existingUrls.add(xmlUrl);
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

        const children = outline.querySelectorAll(":scope > outline");
        for (const child of children) {
          const childUrl = child.getAttribute("xmlUrl");
          if (childUrl && !existingUrls.has(childUrl)) {
            feeds.push(outlineToFeed(child, folder.id));
            existingUrls.add(childUrl);
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
