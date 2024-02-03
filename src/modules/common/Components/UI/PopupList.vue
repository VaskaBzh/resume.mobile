<template>
  <ion-buttons class="list">
    <main-button
      class="list_button"
      v-for="(item, i) in items"
      :key="i"
      @click="$emit('clicked', item.value), $emit('close')"
      :id="item.id"
      :icon="item.icon"
    >
      <template #text>
        <ion-label class="list_name">{{ $t(item.name) }}</ion-label>
      </template>
    </main-button>
  </ion-buttons>
</template>

<script setup>
import { IonLabel, IonButtons } from "@ionic/vue";
import { SettingsMessage } from "@/modules/settings/lang/SettingsMessage.js";
import { useI18n } from "vue-i18n";

import MainButton from "@/modules/common/Components/UI/MainButton.vue";

defineProps({
  items: {
    type: Array,
  },
});

const { t } = useI18n({
  useScope: "global",
  messages: SettingsMessage,
});
</script>

<style scoped lang="scss">
.list {
  background: transparent;
  display: flex;
  flex-direction: column;
  gap: 8px;
  &-no-theme {
    .list {
      &_button {
        --background: #212327;
	    --color: #ffffff;
      }
    }
  }
  &_button {
    --border-radius: 16px !important;
    --background: var(--secondary-color-1, #212327);
    --color: var(--secondary-color-2, #ffffff);
    box-shadow: none;
    width: 100%;
    font-family: SFProT, serif;
  }
  &_icon {
    margin-right: 8px;
  }
  &_name {
    display: inline-flex;
    width: fit-content;
	font-feature-settings: inherit;
	font-family: inherit;
	margin-left: auto;
  }
}
</style>
