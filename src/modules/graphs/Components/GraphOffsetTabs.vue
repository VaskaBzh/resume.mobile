<template>
  <ion-segment
    @ionChange="$emit('changeOffset', $event.detail.value)"
    class="tabs"
    :value="offset"
  >
    <ion-segment-button
      class="tabs_elem"
      v-for="(tab, index) in offsetTabs"
      :key="index"
      :swipe-gesture="false"
      :value="tab.value"
      ref="buttonList"
    >
      <ion-label class="tabs_text">{{ $t(tab.text) }}</ion-label>
    </ion-segment-button>
  </ion-segment>
</template>

<script setup>
import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/vue";
import { useI18n } from "vue-i18n";
import { GraphMessages } from "@/modules/graphs/Lang/GraphMessages.js";

const { t } = useI18n({
  useScope: "global",
  messages: GraphMessages,
});

const { locale } = useI18n({
  useScope: "global",
});

const offsetTabs = [
  { value: 96, text: t("day") },
  { value: 692, text: t("week") },
];

defineProps({
  offset: {
    type: Number,
    default: 96,
  },
});
</script>

<style scoped lang="scss">
.tabs {
  --background: var(--background-tabs, #2a2c31);

  border-radius: 12px;
  height: 34px;
  overflow: visible;
  &_elem {
    --border-radius: 10px;
    --border-width: 0;
    --border-color: transparent;
    --background: transparent;
    --color: var(--gray-400, #6f7682);
    --color-checked: var(--primary-500, #2e90fa);
    --indicator-color: var(--secondary-color-1, #212327);
    --indicator-color-checked: var(--secondary-color-1, #212327);
    --indicator-box-shadow: 1px 2px 4px -2px rgba(29, 29, 29, 0.1);

    overflow: visible;
  }
  &_text {
    font-family: SFProT, serif;
    font-style: normal;
    font-weight: 400;
    font-size: map-get($foot_note, "font-size");
    line-height: map-get($foot_note, "line-height");
    letter-spacing: map-get($foot_note, "letter-spacing");
  }
}
</style>
