<template>
	<ion-modal
		ref="modal"
		:trigger="triggerId"
		:initial-breakpoint="initialBreakpoint"
		:breakpoints="breakpoints"
		v-if="isBeenRender"
		class="modal"
	>
		<div class="modal__content">
			<slot />
		</div>
	</ion-modal>
</template>
<script setup>
	import { IonModal } from '@ionic/vue';
	import { onMounted, ref, defineProps } from "vue";
	
	const isBeenRender = ref(false);
	
	const props = defineProps({
		triggerId: String,
		initialBreakpoint: {
			type: Number,
			default: 1
		},
		breakpoints: {
			type: Array,
			default: [0, 1],
		},
	});
	
	onMounted(() => {
		isBeenRender.value = true;
	})
</script>
<style lang='scss' scoped>
.modal {
	--background: var(--background-bg, #16181A);
	--border-radius: 28px;
	--height: auto;
	--border-color: transparent;
	&-no-theme {
		--background: #16181A;
		.modal {
			&__content {
				background: #16181A;
			}
		}
	}
	&__content {
		padding: 30px calc(16px + var(--ion-safe-area-right, 0)) calc(20px + var(--ion-safe-area-bottom, 0)) calc(16px + var(--ion-safe-area-left, 0));
		background: var(--background-bg, #16181A);
		max-height: calc(97vh - var(--ion-safe-area-bottom, 0) - var(--ion-safe-area-top, 0));
		overflow-y: scroll;
	}
}
</style>