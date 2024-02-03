<template>
	<watchers-container />
</template>

<script setup>
import WatchersContainer from "@/modules/watchers/Components/WatchersContainer.vue";
import { onIonViewWillEnter } from "@ionic/vue";
import { getWatcherList } from "@/modules/watchers/WatcherService.js";

onIonViewWillEnter(async () => {
  await getWatcherList();
});
</script>

<style scoped lang="scss"></style>