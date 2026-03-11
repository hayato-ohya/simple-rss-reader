# RSS Reader - Chrome Extension / RSSリーダー Chrome拡張機能

[English](#english) | [日本語](#日本語)

---

## 日本語

シンプルで多機能なRSSリーダーのChromium系ブラウザ拡張機能です。

### 導入方法

1. このリポジトリをクローンまたはダウンロードします
2. Chrome（または Edge 等の Chromium 系ブラウザ）で `chrome://extensions` を開きます
3. 右上の「**デベロッパーモード**」を有効にします
4. 「**パッケージ化されていない拡張機能を読み込む**」をクリックします
5. `rss-reader-extension` フォルダを選択します
6. ツールバーに表示されるRSSアイコンをクリックすると、新しいタブでリーダーが開きます

### 機能一覧

#### フィード管理
- RSS / Atom フィードの追加・削除
- フォルダによるフィードの整理（ドラッグ＆ドロップ対応）
- フォルダの作成・名前変更・削除
- OPML ファイルのインポート・エクスポート
- 読み込みエラー時の⚠アイコン表示

#### 記事閲覧
- 3ペインレイアウト（サイドバー / 記事一覧 / 記事詳細）
- リスト表示・カード表示の切り替え
- 記事の検索
- 中央クリックで元の記事をバックグラウンドで開く
- SNS共有（X / Facebook）

#### 既読管理
- スクロールで自動的に既読にする（画面上部から消えた記事が対象）
- 既読記事の非表示（一時的に表示するボタン付き）
- 上記2つの設定はデフォルトで有効

#### ブックマーク
- 記事のブックマーク（☆/★トグル）
- サイドバーのブックマーク一覧から一括閲覧

#### 自動更新
- 設定可能な自動更新間隔（オフ / 1分 / 5分 / 10分 / 30分 / 60分）
- デフォルトは5分間隔
- ページを閉じていても Service Worker によりバックグラウンドで更新

#### カスタマイズ
- ダークモード / ライトモード切り替え
- フォント選択（デフォルト / メイリオ / 游ゴシック / 游明朝 / Noto Sans JP / BIZ UDゴシック / BIZ UD明朝 / 等幅フォント）
- 日本語・英語の切り替え

### 必要な環境

- Chrome 110 以降、または Manifest V3 をサポートする Chromium 系ブラウザ（Edge、Brave、Vivaldi 等）

---

## English

A simple yet feature-rich RSS reader extension for Chromium-based browsers.

### Installation

1. Clone or download this repository
2. Open `chrome://extensions` in Chrome (or any Chromium-based browser such as Edge)
3. Enable **Developer mode** in the top-right corner
4. Click **Load unpacked**
5. Select the `rss-reader-extension` folder
6. Click the RSS icon in the toolbar to open the reader in a new tab

### Features

#### Feed Management
- Add and remove RSS / Atom feeds
- Organize feeds into folders (with drag-and-drop support)
- Create, rename, and delete folders
- Import and export OPML files
- ⚠ error indicator for feeds that fail to load

#### Article Reading
- 3-pane layout (sidebar / article list / article detail)
- Toggle between list view and card view
- Article search
- Middle-click to open the original article in a background tab
- Social sharing (X / Facebook)

#### Read Status
- Automatically mark articles as read on scroll (triggered when articles scroll out of the top of the viewport)
- Hide read articles (with a button to temporarily show them)
- Both options are enabled by default

#### Bookmarks
- Bookmark articles (☆/★ toggle)
- View all bookmarked articles from the sidebar

#### Auto-refresh
- Configurable auto-refresh interval (Off / 1 min / 5 min / 10 min / 30 min / 60 min)
- Default interval is 5 minutes
- Background updates via Service Worker even when the reader page is closed

#### Customization
- Dark mode / Light mode toggle
- Font selection (Default / Meiryo / Yu Gothic / Yu Mincho / Noto Sans JP / BIZ UDGothic / BIZ UDMincho / Monospace)
- Language switching between Japanese and English

### Requirements

- Chrome 110 or later, or any Chromium-based browser supporting Manifest V3 (Edge, Brave, Vivaldi, etc.)
