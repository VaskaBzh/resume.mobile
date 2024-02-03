<template>
	<ion-header class="header" collapse="fade">
		<ion-toolbar mode="ios" class="header__toolbar">
			<ion-img slot="start" :src="logo_mini" alt="logo" />
      <main-icon @click="router.push({ name: 'settings_sub' })" slot="end" :icon="sub_settings" class="header_icon header_icon-sub icon-large" />
		</ion-toolbar>
	</ion-header>
</template>

<script setup>
import { IonHeader, IonToolbar, IonImg } from '@ionic/vue';
import logo_mini from "@img/logo-mini.svg";
import router from "@/router/index.js";
import sub_settings from "@icon/sub_settings.svg";
import MainIcon from "@/modules/common/Components/UI/MainIcon.vue";
</script>

<style scoped lang="scss">
.header {
	&__toolbar {
		--background: transparent;
		--border-color: transparent;
		--min-height: 74px;
		--padding-start: 16px;
		--padding-end: 16px;
		--color: var(--primary-25, #F5FAFF);
	}
  &_icon {
    --color: var(--primary-100, #D1E9FF);
    stroke: var(--primary-100, #D1E9FF);
  }
}
</style>