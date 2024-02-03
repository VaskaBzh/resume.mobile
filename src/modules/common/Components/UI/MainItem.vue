<template>
  <ion-item class="item">
    <slot />
  </ion-item>
</template>

<script setup>
import { IonItem } from "@ionic/vue";
</script>

<style scoped lang="scss">
.item {
  --background: var(--secondary-color-1, #212327);
  --color: var(--gray-700, #e2e4e6);
  --min-height: 48px;
  --max-height: 48px;
  --border-color: var(--gray-200, #43474e);
  --inner-border-width: 0px 0px 0px 0px;
  --padding-start: calc(16px - var(--ion-safe-area-left, 0));
  --inner-padding-end: calc(16px - var(--ion-safe-area-right, 0));

  font-feature-settings: "case" on;
  font-family: SFProT, serif;
  font-size: map-get($sub_headline, "font-size");
  font-weight: 400;
  line-height: map-get($sub_headline, "line-height");
  letter-spacing: map-get($sub_headline, "letter-spacing");
  border-radius: 16px;
}
</style>
