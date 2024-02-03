<template>
  <ion-title class="title">
    <slot />
  </ion-title>
</template>

<script setup>
import { IonTitle } from "@ionic/vue";

defineProps({
  tag: {},
});
</script>

<style scoped lang="scss">
.title {
  position: relative;
  padding: 0;
  font-family: SFProD, serif;
  color: var(--gray-800, #f1f1f2);
  font-size: map-get($headline, "font-size");
  font-weight: 600;
  line-height: map-get($headline, "line-height");
  letter-spacing: map-get($headline, "letter-spacing");

  &-sm {
    font-size: map-get($body, "font-size");
    line-height: map-get($body, "line-height");
    letter-spacing: map-get($body, "letter-spacing");
    text-align: left;
    font-weight: 700;
  }
}
</style>
