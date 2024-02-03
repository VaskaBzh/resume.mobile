<script setup>

import MainIcon from "@/modules/common/Components/UI/MainIcon.vue";
import MainText from "@/modules/common/Components/UI/MainText.vue";



const props = defineProps([ 'text', 'color'])
</script>

<template>
<div class="warning" :style="{background: props.color}">
  <main-icon>
  </main-icon>
  <main-text>
</div>
</template>

<style scoped lang="scss">

</style>