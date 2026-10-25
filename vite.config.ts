import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import monkey, { cdn } from 'vite-plugin-monkey'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'https://github.com/sk2589822/Exhentai-Enhancer',
        match: [
          'https://exhentai.org/*',
          'https://e-hentai.org/*',
        ],
        name: {
          '': 'Exhentai Enhancer 汉化版',
          'en': 'Exhentai Enhancer (Chinese)',
          'zh-TW': 'Exhentai Enhancer 漢化版',
          'zh-CN': 'Exhentai Enhancer 汉化版',
        },
        description: {
          '': '改善画廊页、多页查看器和列表页的使用体验（简体中文汉化版）',
          'en': 'improve UX of Gallery Page, Multi-Page Viewer and Front Page (Simplified Chinese)',
          'zh-TW': '改善畫廊頁、多頁檢視器和列表頁的使用者體驗（漢化版）',
          'zh-CN': '改善画廊页、多页查看器和列表页的使用体验（简体中文汉化版）',
        },
        supportURL: 'https://github.com/sk2589822/Exhentai-Enhancer/issues',
        author: 'sk2589822',
        license: 'MIT',
      },
      build: {
        metaFileName: true,
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
