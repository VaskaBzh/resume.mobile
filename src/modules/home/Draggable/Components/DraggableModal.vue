<template>
	<ion-modal
		ref="modal"
		:trigger="props.triggerId"
		:initial-breakpoint="props.initialBreakpoint"
		:breakpoints="props.breakpoints"
		v-if="isBeenRender"
	>
		<div class="modal__content">
			<slot />
		</div>
	</ion-modal>
</template>
<script setup lang="ts">
	import { IonModal } from '@ionic/vue';
	import { onMounted, Ref, ref } from "vue";
	
	const isBeenRender: Ref<Boolean> = ref(false);
	
	const props = defineProps({
		"triggerId": String,
		initialBreakpoint: {
			type: Number,
			default: 1
		},
		breakpoints: {
			type: Array<Number>,
			default: [0, 1],
		},
	});
	
	onMounted(() => {
		isBeenRender.value = true;
	})
</script>
<style lang='scss' scoped>
.modal {
	&__content {
		padding: 30px 16px 20px;
		background: var(--background-bg);
	}
}

ion-modal {
	--background: var(--background-bg);
	--border-radius: 28px;
	--height: fit-content;
}
</style>