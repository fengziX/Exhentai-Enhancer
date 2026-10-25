<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { VueFinalModal } from 'vue-final-modal'
import { GM } from 'vite-plugin-monkey/dist/client'

import { getArchiveDownloadType } from '@/composables/useArchive'
import {
  MouseButton,
  ArchiveDownloadMethod,
  ArchiveSessionAction,

  archiveSessionAction,
  infiniteScrollSwitch,
  archiveButtonSwitch,
  scrollByRowSwitch,
  betterPopupSwitch,
  quickArchiveDownloadMethod,
  loadAllGalleryImagesSwitch,
  multipageViewerEnhancerSwitch,
  preventImageRemovalSwitch,
  autoRedirectSwitch,
  changePageByWheelAnyWhereSwitch,
  showJapaneseTitle,
  highlightSwitch,
  showHiddenGalleriesSwitch,
  magnifierSwitch,
  magnifierActivationButton,
  magnifierToggleMode,
  magnifierDefaultScale,
  magnifierScaleStep,
  magnifierLongPressThreshold,
  magnifierSensitivityX,
  magnifierSensitivityY,
  quickTorrentDownloadSwitch,
} from '@/utils/gm-variables'

import CrossButton from './CrossButton.vue'
import ToggleSwitch from './ToggleSwitch.vue'

const isShow = ref(false)
onMounted(() => {
  GM.registerMenuCommand('打开设置面板', () => isShow.value = !isShow.value)
})

const isDirectDownload = computed(() => !!getArchiveDownloadType(quickArchiveDownloadMethod.value))

function reload() {
  location.reload()
}

</script>

<template>
  <VueFinalModal
    v-model="isShow"
    overlay-transition="vfm-fade"
    class="settings-panel-wrap"
    content-class="settings-panel"
  >
    <div class="settings-panel__inner">
      <section class="settings-panel__section">
        <h2 class="settings-panel__section-name">
          通用
        </h2>

        <hr class="settings-panel__separator">

        <div class="settings">
          <ToggleSwitch v-model="showJapaneseTitle.value" />
          <h3 class="settings__name">
            将浏览器标签页标题改为日文
          </h3>
        </div>
      </section>

      <section class="settings-panel__section">
        <h2 class="settings-panel__section-name">
          画廊页增强
        </h2>

        <hr class="settings-panel__separator">

        <div class="settings">
          <ToggleSwitch v-model="scrollByRowSwitch.value" />
          <h3 class="settings__name">
            按行滚动
          </h3>
          <span class="settings__notice">
            *与「列表页增强 - 按行滚动」联动
          </span>
        </div>

        <div class="settings">
          <ToggleSwitch v-model="betterPopupSwitch.value" />
          <h3 class="settings__name">
            内嵌弹窗
          </h3>

          <div class="settings__intro">
            <span>
              点击「归档下载」时的行为：
            </span>
            <select v-model="quickArchiveDownloadMethod.value" class="settings__select">
              <option class="settings__option" :value="ArchiveDownloadMethod.Manual">
                手动打开弹窗
              </option>
              <option class="settings__option" :value="ArchiveDownloadMethod.HaH_Original">
                通过 H@H 下载原始分辨率
              </option>
              <option class="settings__option" :value="ArchiveDownloadMethod.HaH_800">
                通过 H@H 下载 800x 分辨率
              </option>
              <option class="settings__option" :value="ArchiveDownloadMethod.HaH_1280">
                通过 H@H 下载 1280x 分辨率
              </option>
              <option class="settings__option" :value="ArchiveDownloadMethod.HaH_1920">
                通过 H@H 下载 1920x 分辨率
              </option>
              <option class="settings__option" :value="ArchiveDownloadMethod.HaH_2560">
                通过 H@H 下载 2560x 分辨率
              </option>
              <option class="settings__option" :value="ArchiveDownloadMethod.Direct_Origin">
                直接下载原始分辨率
              </option>
              <option class="settings__option" :value="ArchiveDownloadMethod.Direct_Resample">
                直接下载重采样分辨率
              </option>
            </select>
            <p>
              *注意：并非每个画廊都提供所有 H@H 分辨率。当所选分辨率不可用时，会改为打开弹窗。
            </p>
            <p>
              *注意：如果你改过 Archiver 设置，必须先到设置页面把它改回「Manual Select, Manual
              Start (Default)」（手动选择、手动开始）：
              <a
                class="settings__link"
                target="_blank"
                href="https://e-hentai.org/uconfig.php"
                rel="noreferrer noopener"
              >
                E-Hentai
              </a>
              、
              <a
                class="settings__link"
                target="_blank"
                href="https://exhentai.org/uconfig.php"
                rel="noreferrer noopener"
              >
                ExHentai
              </a>
            </p>

            <span>
              上次的归档会话仍然有效时的行为：
            </span>
            <select
              v-model="archiveSessionAction.value"
              class="settings__select"
              :disabled="!isDirectDownload"
            >
              <option class="settings__option" :value="ArchiveSessionAction.DownloadDirectly">
                直接下载
              </option>
              <option class="settings__option" :value="ArchiveSessionAction.OpenPopup">
                打开弹窗
              </option>
              <option class="settings__option" :value="ArchiveSessionAction.CancelThenDownload">
                先取消会话，再下载
              </option>
              <option class="settings__option" :value="ArchiveSessionAction.ShowCancelButton">
                在「归档下载」下方新增「使归档失效」按钮
              </option>
            </select>
            <p>
              *仅在上一项设置为「直接下载」类方式时生效。
            </p>
            <p>
              *「先取消会话，再下载」会让已经付费解锁的归档会话失效，因此每次下载都需要重新消耗 GP。
            </p>
          </div>
        </div>

        <div class="settings">
          <ToggleSwitch v-model="quickTorrentDownloadSwitch.value" />
          <h3 class="settings__name">
            仅有一个种子时直接下载
          </h3>
        </div>

        <div class="settings">
          <ToggleSwitch v-model="loadAllGalleryImagesSwitch.value" />
          <h3 class="settings__name">
            加载画廊内所有图片
          </h3>
        </div>
      </section>

      <section class="settings-panel__section">
        <h2 class="settings-panel__section-name">
          多页查看器增强
        </h2>

        <hr class="settings-panel__separator">

        <div class="settings">
          <ToggleSwitch v-model="multipageViewerEnhancerSwitch.value" />
          <h3 class="settings__name">
            多页查看器增强
          </h3>
        </div>

        <div class="settings">
          <ToggleSwitch v-model="preventImageRemovalSwitch.value" />
          <h3 class="settings__name">
            阻止图片被移除
          </h3>
          <div class="settings__intro">
            <p>
              ExHentai 内置脚本会移除距离当前滚动位置较远的图片。
              往回滚动到已被移除的图片时可能会闪烁，因为即使图片已经缓存，浏览器仍需重新渲染它。
            </p>
          </div>
        </div>

        <div class="settings">
          <ToggleSwitch v-model="changePageByWheelAnyWhereSwitch.value" />
          <h3 class="settings__name">
            在任意位置滚动滚轮即可翻页
          </h3>
        </div>

        <div class="settings">
          <ToggleSwitch v-model="autoRedirectSwitch.value" />
          <h3 class="settings__name">
            自动跳转到多页查看器
          </h3>
        </div>

        <div class="settings">
          <ToggleSwitch v-model="magnifierSwitch.value" />
          <h3 class="settings__name">
            图片放大镜
          </h3>
          <div class="settings__intro">
            <p>
              长按激活按键即可开启放大镜。
              同时按下鼠标左右键可以按原始比例查看图片。
            </p>

            <div class="settings__magnifier-config">
              <!-- 基础设置 -->
              <label class="settings__label">
                激活按键：
                <select
                  v-model="magnifierActivationButton.value"
                  class="settings__select"
                >
                  <option class="settings__option" :value="MouseButton.Left">鼠标左键</option>
                  <option class="settings__option" :value="MouseButton.Right">鼠标右键</option>
                </select>
              </label>

              <label class="settings__label ">
                <ToggleSwitch v-model="magnifierToggleMode.value" />
                {{ magnifierToggleMode.value ? '切换模式（点一次开启，再点一次关闭）' : '按住模式（按住不放才生效）' }}
              </label>

              <label class="settings__label">
                默认缩放倍数：
                <input
                  v-model.number="magnifierDefaultScale.value"
                  type="number"
                  min="1.1"
                  max="10"
                  step="0.1"
                  class="settings__input"
                >
              </label>

              <label class="settings__label">
                缩放步进（滚轮）：
                <input
                  v-model.number="magnifierScaleStep.value"
                  type="number"
                  min="0.05"
                  max="0.5"
                  step="0.05"
                  class="settings__input"
                >
              </label>

              <label class="settings__label">
                长按判定阈值（毫秒）：
                <input
                  v-model.number="magnifierLongPressThreshold.value"
                  type="number"
                  min="50"
                  max="1000"
                  step="50"
                  class="settings__input"
                >
              </label>

              <label class="settings__label">
                鼠标灵敏度 X：
                <input
                  v-model.number="magnifierSensitivityX.value"
                  type="number"
                  min="0.5"
                  max="5"
                  step="0.5"
                  class="settings__input"
                >
              </label>

              <label class="settings__label">
                鼠标灵敏度 Y：
                <input
                  v-model.number="magnifierSensitivityY.value"
                  type="number"
                  min="0.5"
                  max="5"
                  step="0.5"
                  class="settings__input"
                >
              </label>
            </div>
          </div>
        </div>
      </section>

      <section class="settings-panel__section">
        <h2 class="settings-panel__section-name">
          列表页增强
        </h2>

        <hr class="settings-panel__separator">

        <div class="settings">
          <ToggleSwitch v-model="infiniteScrollSwitch.value" />
          <h3 class="settings__name">
            无限滚动
          </h3>
        </div>

        <div class="settings">
          <ToggleSwitch v-model="scrollByRowSwitch.value" />
          <h3 class="settings__name">
            按行滚动
          </h3>
          <span class="settings__notice">
            *与「画廊页增强 - 按行滚动」联动
          </span>
        </div>

        <div class="settings">
          <ToggleSwitch v-model="highlightSwitch.value" />
          <h3 class="settings__name">
            高亮已下载的画廊
          </h3>
          <div class="settings__intro">
            将已下载画廊的背景设为黑色（ExHentai）或浅黄色（E-Hentai）。
          </div>
        </div>

        <div class="settings">
          <ToggleSwitch v-model="archiveButtonSwitch.value" />
          <h3 class="settings__name">
            插入归档按钮
          </h3>
        </div>

        <div class="settings">
          <ToggleSwitch v-model="showHiddenGalleriesSwitch.value" />
          <h3 class="settings__name">
            显示已隐藏的画廊
          </h3>
          <div class="settings__intro">
            开启后，通过 🚫 按钮隐藏的画廊仍会显示（图标为完全不透明），方便你取消隐藏。
          </div>
        </div>
      </section>
    </div>
    <span
      class="settings-panel__close-button"
      @click="isShow = false"
    >
      <CrossButton />
    </span>

    <div class="actions">
      <button
        class="actions__button"
        @click="reload"
      >
        应用并刷新
      </button>
    </div>
  </VueFinalModal>
</template>

<style lang="scss">
.settings-panel-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}

.settings-panel {
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  margin: 32px;
  padding: 32px;
  max-width: 1000px;
  max-height: calc(100vh - 64px);
  background-color: #34353b;
  border-radius: 4px;
  color: #f1f1f1;

  &__inner {
    overflow-y: auto;
    padding-right: 16px;
    height: 100%;
  }

  &__section {
    background-color: #4f535b;
    border-radius: 4px;
  }

  &__section-name {
    margin: 16px 32px;
    padding-top: 16px;
    font-size: 20px;
    text-align: left;
    line-height: 100%;
  }

  &__close-button {
    position: absolute;
    top: 4px;
    right: 4px;
    padding: 8px;
    cursor: pointer;

    svg {
      width: 16px;
      height: 16px;
    }
  }

  &__separator {
    background: #f1f1f1;
  }
}

.settings {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: start;
  padding: 8px 16px;
  column-gap: 8px;

  &__name {
    font-size: 16px;
  }

  &__notice {
    font-size: 12px;
  }

  &__intro {
    margin-left: 60px;
    width: 100%;
    font-size: 14px;
    text-align: left;
  }

  &__magnifier-config {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }

  &__label {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.9rem;
  }

  &__input {
    width: 120px;
    padding: 0.25rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: #f1f1f1;
    background-color: #34353b;
    outline: none;
  }

  &__link {
    color: #DDDDDD;
  }

  &__select {
    background-color: #34353b;
    border: rgb(141, 141, 141);
    color: #f1f1f1;
    outline: none;

    &:enabled:hover,
    &:enabled:focus {
      background-color: rgb(67, 70, 78) !important;
      border-color: rgb(174, 174, 174) !important;
    }
  }

  &__option {
    color: rgb(241, 241, 241);
    background-color: rgb(52, 53, 59);
    outline: none;
  }
}

.actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  &__button {
    padding: 8px 16px;
    color: #fff;
    background-color: #4f535b;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
