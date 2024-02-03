<template>
	<ion-text class="text">
		<slot />
	</ion-text>
</template>

<script setup>
	import { IonText } from "@ionic/vue";
</script>

<style scoped lang="scss">
.text {
	color: var(--gray-400, #6F7682);
	font-family: SFProT, serif;
	font-size: map-get($callout, "font-size");
	font-weight: 400;
	line-height: map-get($callout, "line-height");
	letter-spacing: map-get($callout, "letter-spacing");
	&-sm {
		font-size: map-get($foot_note, "font-size");
		line-height: map-get($foot_note, "line-height");
		letter-spacing: map-get($foot_note, "letter-spacing");
	}
	&-bold {
		font-weight: 700;
	}
	&-danger {
		color: var(--secondary-red, #F1404A);
	}
	&-warn {
		color: var(--secondary-orange, #FFB319);
	}
}
</style>