<template>
  <workers-container />
</template>

<script setup>
import { onIonViewWillEnter } from "@ionic/vue";
import { getWorkerList } from "@/modules/workers/services/WorkerService.js";

import WorkersContainer from "@/modules/workers/component/WorkersContainer.vue";

onIonViewWillEnter(async ()=> {
  await getWorkerList()
})
</script>

<style scoped lang="scss"></style>