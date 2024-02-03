<template>
  <page-container>
    <lists-container>
      <main-list
        :items="subListCards"
        :icon="sub"
        @clicked="openSettings($event)"
      ></main-list>
      <main-list :items="subAddCard" @clicked="isOpenSubModal = true"></main-list>
    </lists-container>
  </page-container>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { ref, computed } from "vue";
import { subList } from "@/modules/common/store/SubStore.js";
import { SubaccountMessage } from "@/modules/sub_accounts/Lang/SubaccountMessage.js";
import { isOpenSubModal } from "@/modules/common/SubService.js"

import router from "@/router/index.js";
import ListsContainer from "@/modules/common/Components/ListsContainer.vue";
import PageContainer from "@/modules/common/Components/PageContainer.vue";
import MainList from "@/modules/common/Components/UI/MainList.vue";
import sub from "@icon/sub.svg";
import plus from "@icon/plus.svg";

const { t } = useI18n({
  useScope: "global",
  messages: SubaccountMessage,
});

const subListCards = computed(() =>
  subList.value.map((s) => {
    return {
      value: s.id,
      name: s.name,
      icon: sub,
      arrow_right: true,
    };
  })
);

const openSettings = async (id) => {
  await router.push({
    name: "settings_sub",
    query: {
      group_id: id,
    }
  });
};

const subAddCard = ref([
  {
    name: t("sub_button[0]"),
    icon: plus,
    arrow_right: false,
  },
]);
</script>

<style scoped lang="scss"></style>
