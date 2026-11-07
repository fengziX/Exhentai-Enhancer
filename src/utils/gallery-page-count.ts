import { GM_addStyle as gmAddStyle } from 'vite-plugin-monkey/dist/client'

import { getElement, getElements } from '@/utils/commons'

/**
 * 「最小化」(dm_m) 與「最小化 + 关注标签」(dm_p) 模式下，站方把頁數寫在
 * `.glthumb` 的 hover 浮層裡：HTML 由伺服器直接輸出，只是被 CSS 隱藏。
 *
 * 這裡純讀 DOM，不發出任何請求，因此不會增加站方負載、也不會觸發限流。
 * 其他模式（縮略圖 `.itg.gld` 等）不在範圍內。
 */
const LIST_SELECTOR = 'table.itg.gltm'

/** 站方文案：中文「195 页」、英文「195 pages」，兩種都要能吃 */
const PAGE_COUNT_RE = /^\s*(\d+)\s*(?:pages?|页|頁)\s*$/i

const BADGE_CLASS = 'enhancer-page-count'

let isStyleInjected = false

function injectStyle() {
  if (isStyleInjected) {
    return
  }
  isStyleInjected = true

  // 半透明底色 + inherit 文字色，讓 ExHentai 深色與 E-Hentai 淺色背景都能讀
  gmAddStyle(`
.${BADGE_CLASS} {
  display: inline-block;
  margin-right: 6px;
  padding: 0 6px;
  border-radius: 3px;
  background-color: rgba(95, 169, 207, 0.28);
  color: inherit;
  font-size: 11px;
  line-height: 18px;
  vertical-align: middle;
  white-space: nowrap;
  user-select: none;
}
  `)
}

function getPageCount(row: HTMLElement): number | null {
  // 精確位置：hover 浮層內評分星星的下一個兄弟
  const primary = getElement<HTMLElement>('.glthumb .ir + div', row)
  const primaryMatch = primary?.textContent?.trim().match(PAGE_COUNT_RE)
  if (primaryMatch) {
    return Number(primaryMatch[1])
  }

  // 兜底：站方改版時，在浮層／隱藏列裡找唯一的「N 页 / N pages」
  const candidates = getElements<HTMLElement>('.glthumb div, .glhide div', row)
  for (const node of candidates ?? []) {
    const text = node.textContent?.trim() ?? ''
    if (text.length > 24) {
      continue
    }

    const match = text.match(PAGE_COUNT_RE)
    if (match) {
      return Number(match[1])
    }
  }

  return null
}

export function appendPageCounts() {
  const table = getElement<HTMLTableElement>(LIST_SELECTOR)
  if (!table) {
    return
  }

  injectStyle()

  const rows = getElements<HTMLTableRowElement>('tr', table)
  for (const row of rows ?? []) {
    // 冪等：重複執行（例如其他腳手重新render列）不重複插入
    if (getElement(`.${BADGE_CLASS}`, row)) {
      continue
    }

    // 插在標題儲存格的第一個子元素之前，不動表格欄位數量與 hover 事件
    const titleCell = getElement<HTMLElement>('td.gl3m.glname', row)
    if (!titleCell) {
      continue
    }

    const count = getPageCount(row)
    if (count === null) {
      continue
    }

    const badge = document.createElement('span')
    badge.className = BADGE_CLASS
    badge.textContent = `${count} 页`
    badge.title = `共 ${count} 张图片`
    titleCell.insertBefore(badge, titleCell.firstChild)
  }
}
