<template>
  <div class="input-block">
    <label>
      <slot name="label"></slot>
    </label>
    <div class="input-container">
      <ion-input
          class="input-calc"
          :value="props.value"
          :placeholder="props.placeholder"
          @ion-change="emitInputValue($event)"/>
      <span class="unit">
        <slot name="units"></slot>
      </span>
    </div>
  </div>
</template>
<script setup>
import {defineProps, watch} from 'vue';


const props = defineProps(['placeholder', 'value'])
const emit = defineEmits(["changeValue"]);

const emitInputValue = (inputEvent) => {
  const inputValue = inputEvent.target.value;

  emit("changeValue", inputValue);
}
</script>
<style scoped lang="scss">
.input-block {
  width: 48%;
}

.input-container {
  position: relative;
}

.unit {
  position: absolute;
  right: 12px;
  top: 16px;
  color: var(--gray-400);
  font-size: map-get($foot_note, "font-size");
  line-height: map-get($foot_note, "line-height");
  letter-spacing: map-get($foot_note, "letter-spacing");
}

ion-input {
  --background: var(--secondary-color-1);
  --border-color: none;
  --border-radius: none;
  --border-style: none;
  --border-width: none;
  --color: black;
  --padding-start: 12px;

  border: none;
  width: 100%;
  border-radius: 12px;
  outline: none;
  margin-top: 4px;
  background: var(--secondary-color-1);
  height: 48px;
  box-shadow: 1px 1px 6px -2px rgba(29, 41, 57, 0.05);
}

input::placeholder {
  color: var(--gray-300);
  font-weight: 400;
  font-size: map-get($callout, "font-size");
  line-height: map-get($callout, "line-height");
  letter-spacing: map-get($callout, "letter-spacing");
}

label {
  color: var(--gray-400);
  font-size: map-get($caption_1, "font-size");
  line-height: map-get($caption_1, "line-height");
  padding: 0 0 4px 12px;
}
</style>