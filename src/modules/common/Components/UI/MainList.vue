<template>
	<ion-list class="list">
		<ion-list-header class="list_label" v-if="label">
			<main-label>{{ label }}</main-label>
		</ion-list-header>
		<main-item
			class="list_item"
			v-for="(item, i) in items"
			:key="i"
			@click="$emit('clicked', item.value)"
			:id="item.id"
			:class="{
				'list_item-first': i === 0,
				'list_item-only': items.length == 1,
				'list_item-last': items.length - 1 == i,
			}"
		>
			<main-icon class="list_icon icon-large list_icon-blue" :class="{ 'list_icon-blue-fill': item.icon_fill }" v-if="item.icon" :icon="item.icon" slot="start"></main-icon>
			<ion-label class="list_name">{{ item.name }}</ion-label>
			<ion-text class="list_value" v-if="item.after">{{ item.after }}</ion-text>
			<main-icon class="list_icon list_icon-end" slot="end" v-if="item.arrow_right" :icon="arrow_right"></main-icon>
		</main-item>
	</ion-list>
</template>

<script setup>
	import { IonList, IonListHeader, IonText, IonLabel } from "@ionic/vue";
	import arrow_right from "@icon/arrow_right.svg";
	import MainItem from "@/modules/common/Components/UI/MainItem.vue";
	import MainIcon from "@/modules/common/Components/UI/MainIcon.vue";
	import MainLabel from "@/modules/common/Components/UI/MainLabel.vue";
	
	const props = defineProps({
		items: {
			type: Array,
		},
		lines: {
			type: String,
			default: "inset",
		},
		label: {
			type: String,
			default: "",
		},
	})
</script>

<style scoped lang="scss">
.list {
	background: transparent;
	&-popup {
		display: flex;
		flex-direction: column;
		gap: 8px;
		.list {
			&_item {
				border-radius: 16px;
				--inner-border-width: 0px 0px 0px 0px;
			}
			&_icon {
				margin-right: 8px;
			}
			&_name {
				display: inline-flex;
				width: fit-content;
			}
		}
	}
	&_label {
		margin-bottom: 8px;
		min-height: fit-content;
		padding-left: 16px;
	}
	&_name {
		font-feature-settings: inherit;
		font-family: inherit;
	}
	&_item {
		--inner-border-width: 0px 0px 0.5px 0px;
		border-radius: 0;
		&-last {
			--inner-border-width: 0px 0px 0px 0px;
			border-radius: 0 0 16px 16px;
		}
		&-first {
			border-radius: 16px 16px 0 0;
		}
		&-only{
			border-radius: 16px;
		}
	}
	&_value {
		margin-left: auto;
		color: var(--gray-400, #98A2B3);
	}
	&_icon {
		margin-right: 16px;
		&-blue {
	      &:not(&-fill) {
	        stroke: var(--primary-400, #53B1FD);
	      }
	      &-fill {
	        fill: var(--primary-400, #53B1FD);
	      }
		}
		&-end {
			margin-left: 4px;
			margin-right: 0;
            stroke: var(--gray-300, #595E68);
		}
	}
}
</style>