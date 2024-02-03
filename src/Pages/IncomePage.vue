<template>
  <income-container />
</template>

<script setup>
import { getIncomeList } from "@/modules/income/incomeService.js";
import { onIonViewWillEnter } from "@ionic/vue";

import IncomeContainer from "@/modules/income/Components/IncomeContainer.vue";

onIonViewWillEnter(async ()=> {
  await getIncomeList();
})
</script>

<style scoped lang="scss"></style>