<script setup lang="ts">
const props = defineProps(['placeholder', 'isIcon', 'disabled', 'value'])
</script>

<template>
<div class="search_input">
  <div class="search_icon" v-if="props.isIcon">
    <slot/>
  </div>
  <input type="text" :placeholder="props.placeholder" :disabled="props.disabled" :value="value">
</div>
</template>

<style scoped lang="scss">
.search_input {
  display: flex;
  flex-flow: row nowrap;
  border-radius: 12px;
  align-items: center;
  background: var(--background-tooltip, #FFF);
  gap: 8px;
  max-width: 100%;
  padding: 8px;
  height: 40px;
}

input {
  background: transparent;
  height: 20px;
  width: 100%;
  border: none;
  outline: none;
  font-family: SFProT, serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 133.333% */
  letter-spacing: -0.24px;
}
</style>