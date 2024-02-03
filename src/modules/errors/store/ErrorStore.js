import { computed, ref } from "vue";

export const errors = ref({});

export const errorsLength = computed(() => Object.entries(errors.value).length);