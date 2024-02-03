<template>
	<div class="preloader">
		<transition name="fade-out">
			<div class="preloader__wrapper" v-if="isLoadingGet || isEmpty || isGetEmpty">
				<transition name="fade">
					<div class="preloader__block preloader__block-spinner" v-if="isLoadingGet">
						<ion-spinner name="crescent" class="preloader_spinner" />
					</div>
					<div class="preloader__block" v-else>
						<ion-img class="preloader_image" :src="preloader_close" />
						<main-text class="preloader_text text-sm">
							{{ $t(emptyText) }}
						</main-text>
					</div>
				</transition>
			</div>
			<div class="preloader__content" v-else>
				<slot />
			</div>
		</transition>
	</div>
</template>

<script setup>
import { IonImg, IonSpinner } from '@ionic/vue';
import { useI18n } from "vue-i18n";
import { PreloaderMessages } from "@/modules/preloader/lang/PreloaderMessages.js";
import { isGetEmpty, isLoadingGet } from "@/modules/preloader/store/PreloaderStore.js";

import preloader_close from "@img/preloader_close.svg";
import MainText from "@/modules/common/Components/UI/MainText.vue";

useI18n({
	useScope: "global",
	messages: PreloaderMessages,
})

defineProps({
	emptyText: {
		type: String,
		default: "empty_text",
	},
	isEmpty: {
		type: Boolean,
		default: false,
	},
})
</script>

<style scoped lang="scss">
.preloader {
	width: 100%;
	height: 100%;
	min-height: 180px;
	position: relative;
	flex: 1 1 auto;
	&__block {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
	&_text {
		text-align: center;
		width: 100%;
		color: var(--primary-500, #2E90FA);
	}
	&__block {
		display: flex;
		flex-direction: column;
		gap: 16px;
		align-items: center;
		max-width: 290px;
		width: 100%;
		&:not(&-spinner) {
			display: flex;
			flex-direction: column;
			gap: 16px;
			align-items: center;
			max-width: 290px;
			width: 100%;
		}
	}
	&_image {
		width: 122px;
		height: 122px;
	}
	&_spinner {
		color: var(--primary-500, #2E90FA);
	}
}
</style>