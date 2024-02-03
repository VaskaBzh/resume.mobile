<template>
  <div class="code__block">
	  <div class="code__content">
		  <input
			  type="text"
			  class="code_input"
			  :name="name"
			  v-model="ownValue"
			  @focusin="isInputInFocus = true"
			  @focusout="isInputInFocus = false; clearErrors()"
		  />
		  <div
			  :class="{
		        'code_elem-target': ownValue?.length === i && isInputInFocus,
		        'code_elem-error': errors[name]?.length > 0,
		      }"
			  class="code_elem"
			  v-for="(_, i) in props.code_length"
			  :key="i"
		  >
			  {{ ownValue?.split("")[i] ?? "" }}
		  </div>
	  </div>
	  <validation-errors :list_name="name" />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { errors } from "@/modules/errors/store/ErrorStore.js";
import { clearErrors } from "@/modules/errors/controllers/ErrorController.js";
import ValidationErrors from "@/modules/validate/Components/ValidationErrors.vue";

const props = defineProps({
	value: {
		type: String,
		default: "",
	},
	code_length: {
		type: Number,
		default: 6,
	},
	name: {
		type: String,
	}
});

const emits = defineEmits({
	changeValue: String
});

const ownValue = ref(props.value);
const isInputInFocus = ref(false);

const NUMBER_REGEXP = /^\d+\.?\d*$/;

watch(
  () => props.value,
  (newVal) => {
    ownValue.value = newVal;
  }
);

watch(
  () => ownValue.value,
  (newVal, oldVal) => {
    if (
      newVal.length > props.code_length ||
      (!NUMBER_REGEXP.test(newVal) && newVal.length !== 0)
    ) {
      ownValue.value = oldVal;

      return;
    }
    emits("changeValue", newVal);
  }
);
</script>

<style scoped lang="scss">
.code {
  &-no-theme {
    .code {
      &_elem {
        background: #212327;
        color: #F1F1F2CC;

        &-target {
          border-color: #53B1FD;
        }

        &-error {
          border-color: #F1404A;
        }
      }
    }
  }

  &__block {
	  width: 100%;
	  display: flex;
	  flex-direction: column;
	  gap: 4px;
	  
  }
	&__content {
		display: flex;
		width: 100%;
		align-items: center;
		gap: 8px;
		height: 50px;
		justify-content: space-between;
		position: relative;
	}
  &_input {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    outline: none;
    background: transparent;
    border: none;
    color: transparent;
  }
  &_elem {
    font-family: SFProD, serif;
    border-radius: 12px;
    background: var(--secondary-color-1, #fff);
    color: var(--gray-80080, rgba(29, 41, 57, 0.8));
    font-size: map-get($title_1, "font-size");
    font-weight: map-get($title_1, "font-weight");
    line-height: map-get($title_1, "line-height");
    width: 50px;
    height: 50px;
    box-shadow: 1px 2px 4px -2px rgba(184, 194, 208, 0.1);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid transparent;
    transition: all 0.5s ease 0s;
    &-target {
      border-color: var(--primary-400, #53b1fd);
    }
	&-error {
	  border-color: var(--highlight-color-invalid, #f1404a);
	}
  }
}
</style>
