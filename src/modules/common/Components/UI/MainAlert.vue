<template>
  <div :id="id" class="alert">
    <main-icon class="alert_icon" :icon="info_icon"></main-icon>
    <ion-alert
      class="alert__content alert__content-main"
      :trigger="id"
      :header="header"
      :message="new IonicSafeString(message)"
      :buttons="buttons"
    ></ion-alert>
  </div>
</template>

<script setup>
import { IonAlert } from "@ionic/vue";
import MainIcon from "@/modules/common/Components/UI/MainIcon.vue";
import info_icon from "@icon/info_icon.svg";
import { IonicSafeString } from "@ionic/vue";

const props = defineProps({
  id: {
    type: String,
    default: "id",
  },
  header: {
    type: String,
    default: "Header",
  },
  message: {
    type: String,
    default: "message",
  },
  buttons: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped lang="scss">
.alert {
	&__content {
		--background: var(--secondary-color-1, #212327);
	}
}

.alert {
  width: 16px;
  height: 16px;
  &_icon {
    width: inherit;
    height: inherit;
    fill: var(--gray-400, #6F7682);
  }
}

.alert__content .alert-button-group {
  padding: 20px;
}

button.alert-button.alert-btn {
  background-color: var(--primary-500);
  color: var(--primary-25);
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.ios button.alert-button.alert-btn {
  border-radius: 12px;
}
</style>
