<template>
  <page-container>
    <main-list
      :label="$t('settings_list.label[2]')"
      :items="cardsEmail"
    ></main-list>
    <main-list
      :label="$t('settings_list.label[3]')"
      :items="cardsSecurity"
      @clicked="googleModalProcess"
    ></main-list>
    <action-alert
      id="logoutButton"
      :button_text="$t('logout.button')"
      :header="$t('logout.title')"
      :message="$t('logout.text', { email: user?.email })"
      :buttons="logoutButtons"
    />
    <main-modal
	    @ionModalWillPresent="isFacConnectOpen = true"
	    @ionModalWillDismiss="isFacConnectOpen = false"
	    :isOpen="isFacConnectOpen"
    >
      <google-auth-connect @closeModal="isFacConnectOpen = false" />
    </main-modal>
    <main-modal
	    @ionModalWillPresent="isFacDisconnectOpen = true"
	    @ionModalWillDismiss="isFacDisconnectOpen = false"
	    :isOpen="isFacDisconnectOpen"
    >
      <google-auth-disconnect @closeModal="isFacDisconnectOpen = false" />
    </main-modal>
    <main-modal
	    @ionModalWillPresent="isChangePasswordOpen = true"
	    @ionModalWillDismiss="isChangePasswordOpen = false"
	    :isOpen="isChangePasswordOpen"
    >
      <change-password @closeModal="isChangePasswordOpen = false" />
    </main-modal>
  </page-container>
</template>

<script setup>
import { ref, computed } from "vue";
import { SettingsMessage } from "@/modules/settings/lang/SettingsMessage.js";
import { useI18n } from "vue-i18n";
import PageContainer from "@/modules/common/Components/PageContainer.vue";
import MainModal from "@/modules/modal/Components/MainModal.vue";
import MainList from "@/modules/common/Components/UI/MainList.vue";
import { user, userLogout } from "@/modules/user/UserService.js";
import GoogleAuthDisconnect from "@/modules/settings/Components/GoogleAuthDisconnect.vue";
import GoogleAuthConnect from "@/modules/settings/Components/GoogleAuthConnect.vue";
import ChangePassword from "@/modules/settings/Components/ChangePassword.vue";
import ActionAlert from "@/modules/common/Components/UI/ActionAlert.vue";

const { t } = useI18n({
  useScope: "global",
  messages: SettingsMessage,
});

const cardsEmail = computed(() => [
  {
    name: t("settings_list.label[7]"),
    after: user.value?.email,
  },
]);

let isChangePasswordOpen = ref(false);
let isFacConnectOpen = ref(false);
let isFacDisconnectOpen = ref(false);

function googleModalProcess(dataValue) {
  if (dataValue === "password") {
    isChangePasswordOpen.value = true;

    return this;
  }
  dataValue ?
    isFacDisconnectOpen.value = true :
    isFacConnectOpen.value = true;
}

const cardsSecurity = computed(() => [
  {
    name: t("settings_list.li[5]"),
    value: "password",
    arrow_right: true,
  },
  {
    name: t("settings_list.li[8]"),
    value: user.value ? user.value["2fa"] : false,
    arrow_right: true,
    after: user.value ? t(`settings_list.fac.${user.value["2fa"] ? 'disconnect' : 'connect'}`) : '',
  },
]);

const logoutButtons = computed(() => [
  {
    text: t("logout.buttons.cancel"),
    role: "cancel",
  },
  {
    text: t("logout.buttons.leave"),
    role: "confirm",
    handler: userLogout,
    cssClass: "danger",
  },
]);
</script>

<style scoped lang="scss">
ion-list {
  margin-bottom: 24px;
}
</style>
