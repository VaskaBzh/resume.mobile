<template>
	<ion-button fill="clear" class="link">
		<slot />
	</ion-button>
</template>

<script setup>
	import { IonButton } from "@ionic/vue";
</script>

<style scoped lang="scss">
.link {
	--background-activated: transparent;
	--background-focused: transparent;
	--background-hover: transparent;
	--padding-top: 0;
	--padding-bottom: 0;
	--padding-start: 0;
	--padding-end: 0;
	--background: transparent;
	--color: var(--primary-400, #53B1FD);
	--overflow: visible;
	
	width: fit-content;
	white-space: normal;
	word-break: break-word;
	margin-inline: 0;
	min-height: 0;
	font-feature-settings: 'case' on;
	font-family: SFProT, serif;
	font-size: map-get($sub_headline, "font-size");
	font-weight: 400;
	line-height: map-get($sub_headline, "line-height");
	letter-spacing: map-get($sub_headline, "letter-spacing");
	text-align: left;
	margin: 0;
}
</style>