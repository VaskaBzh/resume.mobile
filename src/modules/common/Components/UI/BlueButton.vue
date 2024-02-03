<template>
  <button class="blue-button" :class="{'disable-button' : isDisable}">
    <ion-spinner name="crescent" v-if="isLoading" color="light"></ion-spinner>
    <div v-else>
      <slot></slot>
    </div>
  </button>
</template>
<script setup>
  import { IonSpinner } from '@ionic/vue';
  import { isDisable } from "@/modules/common/commonService.js";
</script>
<style scoped lang="scss">
.blue-button{
  width: 100%;
  height: 56px;
  padding: 16px;
  align-self: stretch;
  border-radius: 16px;
  background: #1570EF;
  box-shadow: 2px 2px 4px -2px rgba(29, 41, 57, 0.05), 0px 4px 12px -4px rgba(29, 41, 57, 0.05);
  color:var( --primary-100);
  font-style: normal;
  font-weight: 600;
  font-size: map-get($callout, "font-size");
  line-height:  map-get($callout, "line-height");
  letter-spacing: map-get($callout, "letter-spacing");
}
.disable-button{
  opacity: 0.5;
}
</style>