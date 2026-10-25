# ExHentai Enhancer（简体中文汉化版）

一个提升 E-Hentai / ExHentai 浏览与下载体验的用户脚本（Userscript）。

> **关于汉化版**
> 本项目基于 [sk2589822/Exhentai-Enhancer](https://github.com/sk2589822/Exhentai-Enhancer) v1.21.0 汉化，
> 界面文案、提示信息与文档均已翻译为简体中文。功能逻辑未做改动；
> 只有必须与站方交互的英文字符串（表单值、站方返回文案的匹配关键字）保留原文，改掉会导致下载/收藏失效。

## 安装方法

1. 在浏览器中安装 [Tampermonkey](https://www.tampermonkey.net/)（油猴）。
2. 点击安装本汉化版脚本 [exhentai-enhancer.user.js](https://github.com/fengziX/Exhentai-Enhancer/raw/master/dist/exhentai-enhancer.user.js)。
3. 打开 E-Hentai / ExHentai 任意画廊页，脚本会自动生效。

## 画廊页增强（Gallery Enhancer）

**适用页面：**
1. 匹配 `https://e(x)hentai.org/g/*/*` 的页面

### 功能

1. 当画廊有多个分页时，依次加载所有图片。
2. 点击「Archive Download（归档下载）」或「Torrent Download（种子下载）」时，在页面内弹窗显示，而不是打开新窗口。
3. 只有一个种子时，直接开始下载。
4. 鼠标位于图片容器上时，滚轮可以按行上下滚动。
5. 当画廊的归档会话（archive session）仍然有效时，可自定义点击「归档下载」的行为 *（默认为直接下载）*。
   > 归档会话就是你已付费解锁的那次下载授权。会话有效期间可以免费重复下载同一份归档，
   > 但站方会拒绝已被过多不同位置使用过的会话 —— 例如你切换 VPN 节点后出口 IP 变了，就会遇到这种情况。
   >
   > 可选行为：直接下载、打开弹窗、先取消会话再下载，或在「归档下载」下方额外显示一个「使归档失效」按钮。
   > 取消会让已付费的会话失效，因此下次下载需要重新消耗 GP。
   >
   > 仅在「归档下载」被设置为「直接下载」类方式时生效。

## 多页查看器增强（Multi-Page Viewer Enhancer）

**适用页面：**
1. 匹配 `https://e(x)hentai.org/mpv/*/*` 的页面
2. **前提条件：** 设置 > Multi-Page Viewer > Always use the Multi-Page Viewer? > 选择 **Yup**

### 功能

1. 在图片信息栏追加「当前页码 ／ 总页数」。
2. 鼠标靠近缩略图条时显示缩略图（需在站点设置里开启缩略图）。
3. 页码跳转（快速导航）。
4. 图片缩放（浏览器高度的 100%、125%、150%、175% 或 200%）。
5. 旋转图片。
6. 阻止图片被移除 *（默认关闭）*。
   > ExHentai 内置脚本会移除距离当前滚动位置较远的图片。
   > 往回滚动到已被移除的图片时可能会闪烁，因为即使图片已经缓存，浏览器仍需重新渲染它。
7. 在单页查看器（匹配 `https://exhentai.org/s/*/*` 的页面）中自动跳转到多页查看器。
8. 放大镜（默认长按鼠标左键触发）。

## 列表页增强（Galleries Enhancer）

**适用页面：**
1. 首页、关注（Watched）、热门（Popular）等列表页面。
2. **前提条件：** 设置 > Front Page Settings > 勾选 `Thumbnail`

### 功能

1. 无限滚动。
2. 鼠标位于图片容器上时，滚轮可以按行上下滚动。
3. 高亮已下载的画廊（ExHentai 为黑色，E-Hentai 为浅黄色）。
4. 在每个画廊条目上插入归档按钮，快速进入归档页。
5. 隐藏画廊（点击 🚫 按钮隐藏，再次点击取消隐藏）。

## 其他功能

1. 将浏览器标签页标题改为作品的日文标题。

## 设置面板

点击 Tampermonkey 图标，选择「打开设置面板」即可打开。  
![打开设置面板](https://github.com/user-attachments/assets/03437e4e-9530-4021-b369-8c8b22fe1b4d)

在面板里可以关闭任意不需要的功能、修改点击「归档下载」时的默认动作，以及设置归档会话仍有效时的处理方式。  
![设置面板](https://github.com/user-attachments/assets/7248275f-58ed-4e34-9eee-003f3b18d47e)

## 快捷键

| 按键 / 鼠标 | 功能 |
| --- | --- |
| `左键单击` | 下一页 |
| `小键盘 3` | 下一页 |
| `小键盘 6` | 下一页 |
| `空格` | 下一页 |
| `滚轮向上`（鼠标位于增强控件上） | 下一页 |
| `右键单击` | 上一页 |
| `小键盘 1` | 上一页 |
| `小键盘 4` | 上一页 |
| `退格键` | 上一页 |
| `滚轮向下`（鼠标位于增强控件上） | 上一页 |
| `Ctrl` + `→` | 前进 10 页 |
| `Ctrl` + `←` | 后退 10 页 |
| `Ctrl` + `1`~`5` | 图片缩放到 100% / 125% / 150% / 175% / 200% |
| `小键盘 +` | 放大图片（未设置时默认按 100% 起算） |
| `小键盘 -` | 缩小图片（未设置时默认按 200% 起算） |
| `小键盘 0` | 设为最小尺寸（目前为 100%） |
| `小键盘 .` | 设为中间尺寸（目前为 150%） |
| `小键盘 Enter` | 恢复图片原始尺寸 |
| `小键盘 8` | 滚动到当前图片顶部 |
| `小键盘 5` | 滚动到当前图片中部 |
| `小键盘 2` | 滚动到当前图片底部 |
| `小键盘 7` | 图片逆时针旋转 90° |
| `小键盘 9` | 图片顺时针旋转 90° |
| `F` | 切换全屏 |
| `R` | 重新加载当前图片 |

## 效果演示

### 画廊页增强

归档下载成功  
![下载成功](https://github.com/user-attachments/assets/d99066ca-b659-45b9-85b9-034653ccc473)

归档下载失败  
![下载失败](https://github.com/user-attachments/assets/7ca83749-74c1-43d6-8ce0-f984c0019cec)

只有一个种子时直接下载  
![单个种子](https://github.com/user-attachments/assets/a55e96bc-0978-4bc3-b6b4-02d36278c489)

有多个种子时弹出选择窗口  
![多个种子](https://github.com/user-attachments/assets/367a9b28-789c-4e8e-9eca-c97ea85f3f02)

磁力链接复制按钮  
![磁力链接复制按钮](https://github.com/user-attachments/assets/b450d686-0b83-4d64-ab09-e6b351e0769a)

在图片容器上按行滚动  
![按行滚动](https://github.com/user-attachments/assets/3beef0f2-5c5d-4cac-afad-4bfbe3ee9b1c)

### 多页查看器增强

页码跳转  
![页码跳转](https://github.com/user-attachments/assets/017d1434-de50-411e-9af9-0b995a594d56)

图片缩放  
![图片缩放](https://github.com/user-attachments/assets/30681d5c-1ac9-4586-8bcd-a8a45680c6e3)

图片缩放的键盘快捷键  
![键盘快捷键 - 缩放](https://github.com/user-attachments/assets/68264d53-3845-45c7-a6b5-a07426407066)

滚动到当前图片顶部 / 中部 / 底部的键盘快捷键  
![键盘快捷键 - 位置](https://github.com/user-attachments/assets/65426b45-cbdf-49e6-a8f2-fc3bc754bd21)

鼠标靠近时显示缩略图  
![悬停显示缩略图](https://github.com/user-attachments/assets/1141773f-8945-4da9-bab2-a904fdf0dd27)

旋转图片  
![键盘快捷键 - 旋转](https://github.com/user-attachments/assets/08f0032d-cc14-40a4-b3bd-4acbae49d64f)

用 `Ctrl + →` / `Ctrl + ←` 前后跳 10 页  
![键盘快捷键 - 前后跳 10 页](https://github.com/user-attachments/assets/359ab1e2-d3e5-4c22-9db0-9406bf49ecd1)

## 开发

### 调试

1. 运行 `pnpm dev`。
2. 按浏览器提示安装脚本。

### 构建并安装自己编译的版本

1. 运行 `pnpm build`。
2. 把 `dist/exhentai-enhancer.user.js` 拖进浏览器窗口即可安装。

## 许可

基于上游项目 [sk2589822/Exhentai-Enhancer](https://github.com/sk2589822/Exhentai-Enhancer)，遵循 MIT 许可证。
