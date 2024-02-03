<template>
	<ion-button :size="size" class="button">
		<ion-icon
			class="button_icon"
			v-if="icon && (!isLoadingPost || no_preloader)"
			:icon="icon"
			aria-hidden="true"
		/>
		<span class="button_text" v-show="!isLoadingPost || no_preloader">
			<slot name="text" />
		</span>
		<ion-spinner
			class="button_spinner"
			name="crescent"
			v-show="isLoadingPost && !no_preloader"
		/>
	</ion-button>
</template>

<script setup>
	import { IonButton, IonSpinner, IonIcon } from "@ionic/vue";
	import { isLoadingPost } from "@/modules/common/commonService.js";

	const props = defineProps({
		size: {
			type: String,
			default: "default",
		},
		icon: {
			default: null,
		},
		no_preloader: {
			type: Boolean,
			default: false,
		},
	});
</script>

<style scoped lang="scss">
.button {
	--color: var(--primary-25, #F5FAFF);
	--background: var(--primary-600, #1570EF);
	--border-radius: 16px;
	
	transition: all 0.3s ease 0s;
	min-height: 56px;
	margin: 0;
	//font-family: SFPro , serif;
	font-size: map-get($callout, "font-size");
	font-weight: 600;
	line-height: map-get($callout, "line-height");
	letter-spacing: map-get($callout, "letter-spacing");
	box-shadow: 2px 3px 6px -2px rgba(9, 10, 11, 0.10);
	text-transform: none;
	&[fill="clear"] {
		--color: var(--gray-800, #F5FAFF);
		box-shadow: none;
	}
	&-remove {
	  --background: var(--secondary-red, #F1404A);
	  --background-hover: var(--secondary-red, #F1404A);
	  --background-focused: var(--secondary-red, #F1404A);
	  --background-activated: var(--secondary-red, #F1404A);
	}
	&-clear {
		--background: rgba(var(--primary-600, #1570EF), 0);
	}
	&--full {
		width: 100%;
	}
	&_icon {
		margin-right: 8px;
	}
	&_icon,
	&_spinner {
		width: 24px;
		height: 24px;
	}
	&::part(native) {
		transition: all 0.3s ease 0s;
	}
}
</style>