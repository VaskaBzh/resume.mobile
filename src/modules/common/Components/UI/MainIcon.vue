<template>
  <ion-icon class="icon" :icon="icon"></ion-icon>
</template>

<script setup>
import { IonIcon } from "@ionic/vue";
import arrow_right from "@icon/arrow_right.svg";

const props = defineProps({
  icon: {
    type: String,
    default: arrow_right,
  },
});
</script>

<style scoped lang="scss">
.icon {
  width: 16px;
  height: 16px;
  &-large {
    width: 24px;
    height: 24px;
  }
}
</style>
