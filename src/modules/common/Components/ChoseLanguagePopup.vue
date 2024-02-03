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
      :items="LanguageConfig"
      @clicked="choseLanguage($event)"
      @close="closeModal($event)"
    />
  </main-modal>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { LanguageConfig } from "@/configs/LanguageConfig";
import { ref } from "vue";
import MainModal from "@/modules/modal/Components/MainModal.vue";
import PopupList from "@/modules/common/Components/UI/PopupList.vue";
import { clearErrors } from "@/modules/errors/controllers/ErrorController.js";

const { locale } = useI18n({
  useScope: "global",
});

const isOpen = ref(false);

const closeModal = () => (isOpen.value = false);

function choseLanguage(language) {
  locale.value = language;
  localStorage.setItem("locale", locale.value);
  clearErrors();
}

defineProps({
  listClass: {
    type: String,
    default: "",
  },
});
</script>

<style scoped lang="scss"></style>
