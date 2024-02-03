<template>
  <swiper
      :slides-per-view="1"
      :space-between="15"
      class="watcher"
      :allowTouchMove="false"
      autoHeight
      @swiper="swiperInit"
  >
    <swiper-slide>
      <div class="watcher__step">
        <main-head :title="$t('info_watcher.title[1]')"/>
        <main-form class="watcher__form form-up">
          <template #list>
            <main-input
              :value="watcherForm.form.name"
              name="name"
              :disable="!isEditable"
              :label="$t('info_watcher.label[0]')"
              :placeholder="$t('info_watcher.placeholder')"
              @change-value="watcherForm.form.name = $event"
            />
          </template>
          <template #content>
            <div class="watcher__block">
              <ion-list :inset="true" class="watcher__list watcher__list-toggle">
                <ion-item class="watcher__list_item" v-for="(tab, i) in allowedRoutes" :key="i">
                  <ion-toggle
                      class="watcher_toggle"
                      :checked="tab.checked"
                      :disabled="isEditable ? tab.disabled : true"
                      @ionChange="changeAllowedRoutesTab(tab.routes, $event)"
                  >
                    {{ $t(tab.name) }}
                  </ion-toggle>
                </ion-item>
              </ion-list>
              <main-copy
                :text="url"
                label="URL"
              />
            </div>
          </template>
          <template #buttons>
            <action-alert
              v-if="!isEditable"
              class="watcher__alert"
              :header="$t('info_watcher.delete.title')"
              :message="$t('info_watcher.delete.text', { watcher: watcherForm.form.name })"
              :buttons="alertButtons"
            >
              <main-button
                class="button--full watcher_button button-remove"
              >
                <template #text>
                  {{ $t("info_watcher.button.delete") }}
                </template>
              </main-button>
            </action-alert>
            <main-button
              v-if="!isEditable"
              @click="isEditable = true"
              class="button--full watcher_button"
            >
              <template #text>
                {{ $t("info_watcher.button.change") }}
              </template>
            </main-button>
            <main-button
              v-if="isEditable"
              @click="changeWatcher(() => isEditable = false, swiperData)"
              class="button--full watcher_button"
            >
              <template #text>
                {{ $t("info_watcher.button.save") }}
              </template>
            </main-button>
          </template>
        </main-form>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="watcher__step watcher__step-last">
        <success-card
            :button_text="$t('info_watcher.successful.button')"
            :text="$t('info_watcher.successful.text', { watcher: watcherForm.form.name })"
            :title="$t('info_watcher.successful.title')"
            @confirm="$emit('close')"
        />
      </div>
    </swiper-slide>
  </swiper>
</template>

<script setup>
import {
  allowedRoutes,
  changeAllowedRoutesTab,
  changeWatcher,
  deleteWatcher,
  watcherForm
} from "@/modules/watchers/WatcherService.js";
import { IonItem, IonList, IonToggle } from "@ionic/vue";
import { WatcherMessage } from "@/modules/watchers/Lang/WatcherMessage.js";
import { Swiper, SwiperSlide } from "swiper/vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import MainHead from "@/modules/common/Components/MainHead.vue";
import MainInput from "@/modules/common/Components/UI/MainInput.vue";
import MainForm from "@/modules/form/Components/MainForm.vue";
import MainCopy from "@/modules/common/Components/UI/MainCopy.vue";
import MainButton from "@/modules/common/Components/UI/MainButton.vue";
import ActionAlert from "@/modules/common/Components/UI/ActionAlert.vue";
import SuccessCard from "@/modules/common/Components/SuccessCard.vue";

const { t } = useI18n({
	useScope: "global",
	messages: WatcherMessage,
});

const url = `https://all-btc.com/watcher${new URL(watcherForm.value.form.url).search}`

const alertButtons = [
	{
		text: t("info_watcher.delete.button[0]"),
		role: "cancel",
	},
	{
		text: t("info_watcher.delete.button[1]"),
		role: "confirm",
		cssClass: "danger",
		handler: () => {
			deleteWatcher(watcherForm.value.form.id);
		},
	},
];

const swiperData = ref(null);
const isEditable = ref(false);

function swiperInit(swiper) {
  swiperData.value = swiper;
}
</script>

<style scoped lang="scss">
.watcher {
  &__alert {
    width: 100%;
  }
  &__step {
    &:not(&-last) {
      display: flex;
      flex-direction: column;
      width: 100%;
      min-height: 625px;
    }
  }
  &__form {
    flex: 1 1 auto;
  }
  &__list {
    margin: 0;
    border-radius: 16px;
    border-color: transparent;
    background: transparent;
    &_item {
      --background: var(--secondary-color-1, #212327);
      --color: var(--gray-700, #E2E4E6);
      --border-color: var(--gray-200, #43474E);
      --inner-border-width: 0px 0px 0.5px 0px;
	  --padding-start: calc(16px - var(--ion-safe-area-left, 0));
	  --inner-padding-end: calc(16px - var(--ion-safe-area-right, 0));

      font-feature-settings: "case" on;
      font-family: SFProT, serif;
      font-size: map-get($sub_headline, "font-size");
      font-weight: 400;
      line-height: map-get($sub_headline, "line-height");
      letter-spacing: map-get($sub_headline, "letter-spacing");
    }
  }
  &_toggle {
    --track-background-checked: var(--primary-500, #2E90FA);
    --track-background: var(--gray-100, #2C2F34);
    --border-color: transparent;
    &::part(label) {
      font-family: SFProT, serif;
    }
  }
}
</style>