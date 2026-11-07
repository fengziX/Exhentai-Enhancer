<script setup lang="ts">
import { onMounted } from 'vue'

import { getElement, isExHentai } from '@/utils/commons'
import GalleriesEnhancer from '@/components/Galleries/GalleriesEnhancer.vue'
import GalleryEnhancer from '@/components/Gallery/GalleryEnhancer.vue'
import MultipageViewerEnhancer from '@/components/MultiPageViewer/MultiPageViewerEnhancer.vue'
import SettingsPanel from '@/components/SettingsPanel/SettingsPanel.vue'
import { autoRedirectSwitch, multipageViewerEnhancerSwitch, showJapaneseTitle, showPageCountSwitch } from '@/utils/gm-variables'

import { changeTitleToJapanese } from './utils/e-hentai-api'
import { appendPageCounts } from './utils/gallery-page-count'

const { href } = window.location

const enhancer = getEnhancer()

if (autoRedirectSwitch.value) {
  redirectIfSinglePageViewer()
}

if (showJapaneseTitle.value) {
  changeTitleToJapanese()
}

setCSS()

// 「最小化 + 关注标签」是 table 佈局，不會命中 getEnhancer() 裡的 .itg.gld，
// 所以這裡獨立處理；函數內部自己判斷頁面類型，其他頁面直接 return。
if (showPageCountSwitch.value) {
  appendPageCounts()
}

function getEnhancer() {
  const galleriesContainer = getElement('.itg.gld')
  // 只有 Front Page, Watch, Popular 等頁面會出現這個 element
  if (galleriesContainer) {
    return GalleriesEnhancer
  }

  if (/https:\/\/e[-x]hentai\.org\/g\/\w+\/\w+/.test(href)) {
    return GalleryEnhancer
  }

  if (multipageViewerEnhancerSwitch.value && /https:\/\/e[-x]hentai\.org\/mpv\/\w+\/\w+/.test(href)) {
    return MultipageViewerEnhancer
  }

  return null
}

function redirectIfSinglePageViewer() {
  const isSinglePageViewer = /https:\/\/e[-x]hentai\.org\/s\/\w+\/\w+/.test(href)
  if (isSinglePageViewer) {
    onMounted(() => {
      const page = location.pathname.split('-')[1]
      const url = (getElement('.sb > a') as HTMLAnchorElement).href.replace('/g/', '/mpv/')
      location.href = `${url}#page${page}`
    })
  }
}

function setCSS() {
  document.documentElement.style.setProperty(
    '--bg-color',
    isExHentai() ? '#34353b' : '#E3E0D1',
  )
}
</script>

<template>
  <Suspense>
    <component :is="enhancer" />
  </Suspense>
  <SettingsPanel />
</template>
