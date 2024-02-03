<template>
  <div class="alert alert-action">
    <div class="alert_content" :id="id" v-if="!button_text && !isOpen">
      <slot />
    </div>
    <main-link :id="id" class="alert_link" v-if="button_text && !isOpen">{{ button_text }}</main-link>
    <ion-alert
      :isOpen="isOpen"
      :class="cssClass"
      class="alert__content alert-action"
      :trigger="id"
      :header="header"
      :message="message"
      :buttons="buttons"
      @ionAlertWillPresent="$emit('present')"
      @ionAlertWillDismiss="$emit('dismiss')"
    />
  </div>
</template>

<script setup>
import MainLink from "@/modules/common/Components/UI/MainLink.vue";
import { IonAlert } from "@ionic/vue";

const props = defineProps({
  id: {
    type: String,
    default: "id",
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  header: {
    type: String,
    default: "Header",
  },
  message: {
    type: String,
    default: "message",
  },
  button_text: {
    type: String,
  },
  buttons: {
    type: Array,
    default: "message",
  },
  cssClass: {
    type: String,
  },
});
</script>

<style scoped lang="scss">
.alert {
  &__content {
    --background: var(--system-colors-alert-bg, rgba(30, 30, 30, 1));
	  &-no-theme {
		  --background: rgba(30, 30, 30, 1);
	  }
  }
}

</style>
