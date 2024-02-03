<template>
  <ion-page class="page">
    <ion-content class="page__container">
      <ion-content class="page__content">
        <empty-card
            :image="disconnect_img"
            :text="$t('text')"
            :button_text="$t('button_text')"
            @clicked="router.push('home')"
        />
      </ion-content>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonContent, IonPage } from "@ionic/vue";
import { useI18n } from "vue-i18n";
import { DisconnectMessages } from "@/modules/disconnect/lang/DisconnectMessages.js";
import EmptyCard from "@/modules/common/Components/EmptyCard.vue";
import disconnect_img from "@img/disconnect_img.png";
import router from "@/router/index.js";

useI18n({
  useScope: "global",
  messages: DisconnectMessages,
});
</script>

<style scoped lang="scss">
.page {
  background: inherit;
  overflow: hidden;
  border-radius: 0 0 0 0;
  &__content {
    --padding-top: 24px;
    --padding-bottom: 24px;
    --padding-start: 16px;
    --padding-end: 16px;
    --background: transparent;

    &::part(scroll) {
      display: flex;
      flex-direction: column;
    }
  }
  &__container {
    --background: var(--background-bg, #16181A);
    --padding-top: 0;
    --padding-bottom: 0;
    --padding-start: 0;
    --padding-end: 0;

    position: relative;

    &::part(background) {
      border-radius: 0 0 0 0;
    }
  }
}
</style>