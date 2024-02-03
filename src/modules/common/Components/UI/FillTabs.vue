<template>
  <ion-segment
    v-if="tabs"
    @ionChange="$router.push({ name: $event.detail.value })"
    :value="$route.name"
  >
    <ion-segment-button
      class="btn-segment"
      v-for="(btn, index) in tabs"
      :key="index"
      :swipe-gesture="false"
      :value="btn.path"
      ref="buttonList"
    >
      <ion-label class="label-title">{{ $t(`tabs.${btn.name}`) }}</ion-label>
    </ion-segment-button>
  </ion-segment>
</template>

<script setup>
import {
  IonHeader,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { defineProps, defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { HeaderMessage } from "@/modules/common/Lang/HeaderMessage";

defineComponent({
  IonHeader,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
});

useI18n({
	useScope: 'global',
	messages: HeaderMessage
})

defineProps({
	tabs: {
		type: Object,
	}
})
</script>

<style scoped lang="scss">
ion-segment {
  --background: inherit;
  padding: 0 16px;
}

.segment-button-checked.ios::part(native) {
  color: var(--primary-100);
}
ion-segment-button.ios::part(native) {
  color: var(--primary-200);
}
.btn-segment {
  --indicator-box-shadow: 0 0 0 transparent;
  --indicator-color: transparent;
  --border-radius: 2px 2px 0px 0px;
}
ion-segment-button::part(indicator-background) {
  border-bottom: 3px solid var(--primary-25);
  box-shadow: 0;
}
.label-title {
  color: var(--primary-25);
}
</style>
