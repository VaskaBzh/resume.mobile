<template>
	<ion-page class="layout">
		<ion-content class="container">
			<header-home v-if="route.name === 'home'" />
			<main-header v-else />
			<ion-content class="container__content">
				<slot />
			</ion-content>
		</ion-content>
	</ion-page>
</template>

<script setup>
import { IonContent, IonPage } from '@ionic/vue';
import { useRoute } from "vue-router";

import MainHeader from "@/modules/common/Components/MainHeader.vue";
import HeaderHome from "@/modules/home/Components/HeaderHome.vue";

const route = useRoute();

const props = defineProps({
	containerClass: {
		type: String,
		default: "",
	},
	fullscreen: {
		type: Boolean,
		default: false,
	},
})
</script>

<style scoped lang="scss">
.layout {
	height: 100%;
	&-no-scroll {
		.container,
		.container__content {
			--overflow: hidden;
		}
	}
	&-no-theme {
		.container {
			--background: linear-gradient(117deg, #024BC0 16.84%, #3597F9 103.73%);
		}
	}
}
.container {
	--background: var(--gradient-main, linear-gradient(117deg, #024BC0 16.84%, #3597F9 103.73%));
	--overflow: hidden;

	&:not(.container-smooth) {
		.container {
			&__content {
				&::part(background) {
					border-radius: 28px 28px 0px 0px;
				}
			}
		}
	}

	&::part(scroll) {
		display: flex;
		flex-direction: column;
	}
	&__content {
		--background: transparent;
		--padding-top: 0;
		--padding-bottom: 0;
		--padding-start: 0;
		--padding-end: 0;

		&::part(scroll) {
			display: flex;
			flex-direction: column;
		}
	}
}
</style>