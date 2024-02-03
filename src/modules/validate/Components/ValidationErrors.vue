<template>
  <transition name="list">
    <div
      v-show="
        error_list[list_name]?.length > 0 || errors[list_name]?.length > 0
      "
      class="errors"
    >
      <div
        v-for="(error, i) in error_list[list_name] ?? errors[list_name]"
        :key="i"
        v-t="error"
        class="errors_elem"
      ></div>
    </div>
  </transition>
</template>

<script setup>
import { ValidationErrorMessages } from "@/modules/validate/lang/ValidationErrorMessages";
import { useI18n } from "vue-i18n";
import { errors } from "@/modules/errors/store/ErrorStore.js";

defineProps({
  error_list: {
    type: Object,
    default: {},
  },
  list_name: {
    type: String,
    default: "",
  },
});
useI18n({
  useScope: "global",
  messages: ValidationErrorMessages,
});
</script>

<style scoped lang="scss">
.errors {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px 0 0;
  &_elem {
    font-family: SFProT, serif;
    color: var(--secondary-red, #f1404a);
    font-size: map-get($foot_note, "font-size");
    font-weight: 400;
    line-height: map-get($foot_note, "line-height");
    letter-spacing: map-get($foot_note, "letter-spacing");
  }
}
.list-enter-active,
.list-leave-active {
  transition: all 0.35s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
  max-height: 0;
  padding: 0;
}
</style>
