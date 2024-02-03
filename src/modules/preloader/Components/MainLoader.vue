<template>
	<div class="preloader">
		<transition name="fade-out">
			<div class="preloader__wrapper" v-if="isLoadingGet">
				<transition name="fade">
					<div class="preloader__block preloader__block-spinner">
						<ion-spinner name="crescent" class="preloader_spinner" />
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
import { useI18n } from "vue-i18n";
import { PreloaderMessages } from "@/modules/preloader/lang/PreloaderMessages.js";
import { isLoadingGet }  from "@/modules/preloader/store/PreloaderStore.js";
import { IonSpinner } from "@ionic/vue";

useI18n({
	useScope: "global",
	messages: PreloaderMessages,
})

defineProps({
	emptyText: {
		type: String,
		default: "empty_text",
	},
})
</script>

<style scoped lang="scss">
.preloader {
	width: 100%;
	height: fit-content;
	//min-height: 100%;
	position: relative;
	&-flex {
		flex: 1 1 auto;
		height: auto;
		display: flex;
		flex-direction: column;
		.preloader {
			&__content {
				flex: 1 1 auto;
				height: auto;
			}
		}
	}
	&__content {
		height: fit-content;
		width: 100%;
		flex: 1 1 auto;
		display: flex;
	}
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