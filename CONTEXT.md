# Exhentai Enhancer

一个改善 E-Hentai / ExHentai 阅读与下载体验的用户脚本。本文档定义代码库使用的
统一术语，是一份术语表，而不是功能规格。

## 术语

### 画廊

**Gallery（画廊）**：
E-Hentai / ExHentai 上的一部作品，由 gallery id 与 token 定位。
_避免使用_：相册、本子、书籍

**Downloaded Gallery（已下载画廊）**：
被用户本地记录为「已下载」的画廊，用于在列表中高亮显示。这是一条永久的本地记录，
与站方是否仍持有该画廊的下载授权无关。
_避免使用_：已读画廊、看过的画廊

### 下载

**Archive（归档）**：
画廊的可下载 zip 包，由站方的 archiver 提供。
_避免使用_：压缩包、文件、下载

**Direct Download（直接下载）**：
直接从 archiver 取回归档，站方会返回一个需要跳转的文件地址。
_避免使用_：普通下载、即时下载

**H@H Download（H@H 下载）**：
把归档加入 Hentai@Home 客户端的队列来取回，而不是在浏览器里直接下载。
_避免使用_：Hath 下载、客户端下载

**H@H Resolution（H@H 分辨率）**：
H@H 下载所采用的图片尺寸档位。站方决定存在哪些档位、以及某部画廊提供其中的哪些，
因此用户选择的档位在当前这部画廊上可能是不可用的。
_避免使用_：画质、尺寸、xres

**Archive Session（归档会话）**：
用户付费解锁归档时，archiver 创建的下载授权。会话有效期间可以免费重复下载同一份归档；
取消会话意味着下次下载要重新付费。站方会拒绝已被过多不同位置使用过的会话。
_避免使用_：解锁、购买、下载会话

**Archive Session Action（归档会话处理方式）**：
当归档会话仍然有效时，用户选择点击「归档下载」应当发生什么。

### 增强模块

**Enhancer（增强模块）**：
负责某一类页面的组件 —— 画廊页（Gallery）、列表页（Galleries）、多页查看器（Multi-Page Viewer）。
每个页面有且只有一个增强模块生效。
_避免使用_：处理器、模块、功能

**Better Popup（内嵌弹窗）**：
把站方原本用 `window.open()` 打开的归档、种子、收藏窗口，改为预加载后在当前页面内渲染的弹窗。
_避免使用_：模态框、行内弹窗

**Quick Download（快速下载）**：
完全跳过归档弹窗，按照预设方式在点击「归档下载」后立即开始下载。
_避免使用_：自动下载、一键下载

## 汉化约定

- 用户可见的文案（设置面板、按钮、提示、`title` 提示）一律使用简体中文。
- 与站方交互的字符串必须保持英文，改掉会直接导致功能失效，修改前请确认用途：
  - 表单项取值，例如 `dlcheck`（`Download Original Archive`）、`apply`（`Add to Favorites`）
  - 站方响应内容的匹配关键字，例如 `Locating archive server and preparing file for download...`、
    `download has been queued`、链接文字 `Delete`
  - DOM 选择器与 class/id 名称
- 站方响应正文（如排队位置说明）属于站方文案，原样显示，只在其前追加中文说明。
