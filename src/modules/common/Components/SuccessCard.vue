<template>
	<div class="success">
		<ion-img class="success_img" alt="success" :src="success" />
		<main-head class="success__head head-center" :title="title" :text="text" />
		<main-button class="success_button button--full" @click="$emit('confirm')">
			<template #text>
				{{ button_text }}
			</template>
		</main-button>
	</div>
</template>

<script setup>
import { IonImg } from '@ionic/vue';
import MainHead from "@/modules/common/Components/MainHead.vue";
import MainButton from "@/modules/common/Components/UI/MainButton.vue";
import success from "@img/success.svg";

defineProps({
	title: {
		type: String,
	},
	text: {
		type: String,
	},
	button_text: {
		type: String,
	},
})
</script>

<style scoped lang="scss">
.success {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 11px;
	&_img {
		width: 80px;
		height: 80px;
		margin-bottom: 24px;
	}
	&__head {
		gap: 8px;
		margin-bottom: 52px;
	}
}
</style>