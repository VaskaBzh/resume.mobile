import { ref, watch } from "vue";

export let codeInput = ref("")

export let isInputInFocus = ref(false);

export const NUMBER_REGEXP = /^\d+\.?\d*$/;

watch(() => codeInput.value, (newCodeValue, oldCodeValue) => {
    if (
        newCodeValue.length > 6 ||
        (!NUMBER_REGEXP.test(newCodeValue) && newCodeValue.length !== 0)
    ) {
        codeInput.value = oldCodeValue;
    }
})

export function clearCodeInput() {
    codeInput.value = "";
}