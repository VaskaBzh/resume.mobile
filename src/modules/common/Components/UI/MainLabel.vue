<template>
	<ion-label class="label">
		<slot />
	</ion-label>
</template>

<script setup>
	import { IonLabel } from "@ionic/vue";
</script>

<style scoped lang="scss">
.label {
	--padding-top: 0;
	
	color: var(--gray-400, #6F7682);
	font-feature-settings: 'case' on;
	font-family: SFProT, serif;
	font-size: map-get($sub_headline, "font-size");
	font-weight: 400;
	line-height: map-get($sub_headline, "line-height");
	letter-spacing: map-get($sub_headline, "letter-spacing");
	min-height: 20px;
}
</style>