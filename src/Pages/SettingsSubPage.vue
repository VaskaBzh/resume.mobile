<template>
  <page-container>
    <main-list :items="cardsSubAction" @clicked="redirectTo" />
  </page-container>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { SettingsMessage } from "@/modules/settings/lang/SettingsMessage.js";
import MainList from "@/modules/common/Components/UI/MainList.vue";
import connection from "@icon/connection.svg";
import wallet from "@icon/wallet.svg";
import watcher from "@icon/watcher.svg";
// import notification from "@icon/notification.svg";
import PageContainer from "@/modules/common/Components/PageContainer.vue";
import router from "@/router";

const { t } = useI18n({
  useScope: "global",
  messages: SettingsMessage,
});

const { locale } = useI18n({
  useScope: "global",
});

const cardsSubAction = ref([
  {
    name: t("sub_list[0]"),
    icon: connection,
    arrow_right: true,
    value: "connection_sub",
  },
  {
    name: t("sub_list[1]"),
    icon: wallet,
    icon_fill: true,
    arrow_right: true,
    value: "wallets_sub",
  },
  // {
  //   name: t("sub_list[2]"),
  //   icon: notification,
  //   arrow_right: true,
  // },
  {
    name: t("sub_list[3]"),
    icon: watcher,
    arrow_right: true,
    value: "watcher_sub",
  },
]);
const redirectTo = (routeName) => {
  router.push({
    name: routeName,
    query: {
      ...router.currentRoute.value.query,
    }
  });
};
</script>

<style scoped lang="scss"></style>
