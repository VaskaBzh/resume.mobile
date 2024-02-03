<template>
	<ion-page class="layout">
		<main-container :fullscreen="fullscreen" class="container-smooth">
			<slot/>
		</main-container>
	</ion-page>
</template>

<script setup>
import {IonPage} from '@ionic/vue';
import MainContainer from "@/modules/common/Components/MainContainer.vue";

const props = defineProps({
	fullscreen: {
		type: Boolean,
		default: false,
	},
	page: {
		type: String,
	}
})
</script>

<style scoped lang="scss">
.layout {
	height: 100%;
}
</style>