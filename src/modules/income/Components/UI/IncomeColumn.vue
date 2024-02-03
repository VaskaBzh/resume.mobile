<template>
	<div
		class="table_elem"
		@click="!!RowsCopyEnum[rowKey] && rowValue !== '-' ? copyData(rowValue) : null"
	>
		<span
			class="table_text"
			:class="[
				RowsCopyEnum[rowKey] && rowValue !== '-' ?
					'table_text-copy' :
					rowKey === 'status' ?
						`table_text-status table_text-${rowValue}` :
						''
			]"
			>
			{{
					FormatFunctionEnum[rowKey] ?
						FormatFunctionEnum[rowKey](rowValue) :
						rowKey === 'status' ?
							$t(`rows.${rowValue}`) :
							rowValue
				}}
		</span>
		<div
			class="table_elem_icon"
			v-if="RowsCopyEnum[rowKey] && rowValue !== '-'"
		>
			<transition name="copy">
				<main-icon
					class="table_icon table_icon-copy"
					:icon="copy_icon"
					v-if="!isCopy"
				/>
				<main-icon
					class="table_icon table_icon-copy"
					:icon="tick"
					v-else
				/>
			</transition>
		</div>
	</div>
</template>

<script setup>
import { RowsCopyEnum } from "@/modules/income/enums/RowsCopyEnum.js";
import { FormatFunctionEnum } from "@/modules/income/enums/FormatFunctionEnum.js";
import { Clipboard } from "@capacitor/clipboard";
import { useI18n } from "vue-i18n";
import { IncomeMessage } from "@/modules/income/Lang/IncomeMessage.js";
import { ref } from "vue";
import copy_icon from "@icon/copy_icon.svg";
import tick from "@icon/tick.svg";
import MainIcon from "@/modules/common/Components/UI/MainIcon.vue";

defineProps({
	rowValue: String,
	rowKey: String,
});

useI18n({
	useScope: "global",
	messages: IncomeMessage,
})

const isCopy = ref(false);

async function copyData(copyValue) {
	await Clipboard.write({
		string: copyValue
	});
	
	isCopy.value = true;
	
	setTimeout(() => isCopy.value = false, 1500);
}
</script>

<style scoped lang="scss">
.table {
	&_text {
		&-copy {
			color: var(--primary-400, #53B1FD);
		}
		&-status {
			width: 100%;
			min-width: 100px;
			text-align: center;
			height: 24px;
			white-space: nowrap;
			padding: 4px 8px;
			border-radius: 8px;
			box-shadow: 1px 2px 4px -2px rgba(184, 194, 208, 0.1);
			font-weight: 500;
			font-size: map-get($caption_1, "font-size");
			line-height: map-get($caption_1, line-height);
		}
		&-complete {
			background: var(--background-green, #E9F8F1);
			color: var(--secondary-green, #1FB96C);
		}
		&-pending {
			background: var(--background-orange, #FFF3D9);
			color: var(--secondary-orange, #FFB319);
		}
		&-reject {
			background: var(--background-red, #FEECED);
			color: var(--secondary-red, #F1404A);
		}
		&-checking {
			background: var(--blue-40015, rgba(83, 177, 253, 0.15));
			color: var(--primary-400, #53B1FD);
		}
		&-no_wallet {
			background: var(--gray-100, #F2F4F7);
			color: var(--gray-500, #667085);
		}
	}
	&_icon {
		fill: var(--gray-80080, rgba(241, 241, 242, 0.8));
		position: absolute;
		left: 0;
		top: 0;
		&-copy {
			stroke: var(--primary-400, #53B1FD);
		}
	}
	&_elem {
		//min-width: 120px;
		//padding-right: 15px;
		white-space: nowrap;
		display: inline-flex;
		align-items: center;
		gap: 8px;
		&_icon {
			width: 16px;
			height: 16px;
			position: relative;
		}
	}
}
</style>