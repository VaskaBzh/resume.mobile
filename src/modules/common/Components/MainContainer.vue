<template>
	<ion-content class="container">
		<slot name="header" />
		<ion-content class="container__content">
			<slot />
		</ion-content>
	</ion-content>
</template>

<script setup>
import { IonContent } from '@ionic/vue';
</script>

<style scoped lang="scss">
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
		--background: var(--background-bg, #16181A);
		--padding-top: 24px;
		--padding-bottom: 24px;
		--padding-start: 16px;
		--padding-end: 16px;
		
		&::part(scroll) {
			display: flex;
			flex-direction: column;
		}
	}
}
</style>