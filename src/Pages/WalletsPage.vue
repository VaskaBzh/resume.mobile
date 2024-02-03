<template>
  <wallets-container />
</template>

<script setup>
import { onIonViewWillEnter } from "@ionic/vue";
import { getSubWallet } from "@/modules/Wallet/walletService.js";

import WalletsContainer from "@/modules/wallets/Components/WalletsContainer.vue";

onIonViewWillEnter(async () => {
  await getSubWallet()
});
</script>

<style lang="scss" scoped></style>