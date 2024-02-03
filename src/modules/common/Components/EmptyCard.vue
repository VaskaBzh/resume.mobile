<template>
  <div class="empty">
    <div class="empty__container">
      <div class="empty__content">
        <ion-img class="empty_image" :src="image" />
        <main-text class="empty_text">{{ text }}</main-text>
      </div>
      <main-button class="empty_button button--full" @click="$emit('clicked')">
        <template #text>
          {{ button_text }}
        </template>
      </main-button>
    </div>
  </div>
</template>
<script setup>
  import { defineProps } from "vue";
  import { IonImg } from "@ionic/vue";
  import MainText from "@/modules/common/Components/UI/MainText.vue";
  import MainButton from "@/modules/common/Components/UI/MainButton.vue";

  const props = defineProps(['text', 'image', 'button_text'])
</script>

<style scoped lang="scss">
.empty {
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  &_text {
    text-align: center;
  }
  &__container {
    padding: 16px;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    gap: 52px;
    border-radius: 24px;
    background: var(--secondary-color-1, #212327);
    box-shadow: 2px 3px 6px -2px rgba(9, 10, 11, 0.10);
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  &_image {
    width: 140px;
    height: 140px;
  }
  &_button {
    min-height: 56px;
  }
}
</style>