<template>
  <main-modal
    class="language"
    @ionModalWillPresent="isOpen = true"
    @ionModalWillDismiss="isOpen = false"
    :isOpen="isOpen"
  >
    <popup-list
      class="list-popup"
      :class="listClass"
      :items="ThemeConfig"
      @clicked="choseTheme($event)"
      @close="closeModal($event)"
    />
  </main-modal>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { ThemeConfig } from "@/configs/ThemeConfig";

import MainModal from "@/modules/modal/Components/MainModal.vue";
import PopupList from "@/modules/common/Components/UI/PopupList.vue";
import { clearErrors } from "@/modules/errors/controllers/ErrorController.js";
import { ref, onUpdated } from "vue";

const { locale } = useI18n({
  useScope: "global",
});

const isOpen = ref(false);

const closeModal = () => (isOpen.value = false);

function choseTheme(selectedTheme) {
  localStorage.setItem("theme", selectedTheme);
  switch (selectedTheme) {
    case "dark":
      document.body.setAttribute("data-theme", "dark");
      break;

    case "light":
      document.body.setAttribute("data-theme", "light");
      break;

    default:
      document.body.removeAttribute("data-theme");
  }
}

const props = defineProps({
  listClass: {
    type: String,
    default: "",
  },
});
</script>

<style scoped lang="scss"></style>
