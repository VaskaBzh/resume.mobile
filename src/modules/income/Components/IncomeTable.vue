<template>
	<div class="table">
		<div class="table__body">
			<div class="table_row table_row-title">
				<div
					class="table_elem"
					v-for="(title, i) in table.titles"
					:key="i"
				>
					{{ $t(`titles.${title}`) }}
					<main-alert
						class="table_icon"
						v-if="TitleInfoEnum[i]"
						:id="'income_' + title"
						:buttons="[$t(`alert.${TitleInfoEnum[i]}.button`)]"
						:message="$t(`alert.${TitleInfoEnum[i]}.message`)"
						:header="$t(`alert.${TitleInfoEnum[i]}.title`)"
					/>
				</div>
			</div>
			<div
				class="table_row"
				v-for="(row, i) in table.rows"
				:key="i"
			>
				<div
					class="table_elem"
					v-for="(value, key) in row"
					:key="key"
				>
					<income-column
						:rowValue="value"
						:rowKey="key"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { TitleInfoEnum } from "@/modules/income/enums/TitleInfoEnum.js";
import { Clipboard } from '@capacitor/clipboard';
import { useI18n } from "vue-i18n";
import { IncomeMessage } from "@/modules/income/Lang/IncomeMessage.js";
import MainAlert from "@/modules/common/Components/UI/MainAlert.vue";
import IncomeColumn from "@/modules/income/Components/UI/IncomeColumn.vue";
import {RowsCopyEnum} from "@/modules/income/enums/RowsCopyEnum.js";

useI18n({
	useScope: "global",
	messages: IncomeMessage,
})

defineProps({
	table: {
		type: Object,
		default: {
			titles: [],
			rows: []
		},
	},
});
</script>

<style scoped lang="scss">
.table {
	display: flex;
	flex-direction: column;
	gap: 4px;
	width: calc(100% + 16px + var(--ion-safe-area-left, 0) + 16px + var(--ion-safe-area-right, 0));
	overflow-x: scroll;
	margin: 0 calc(-16px - var(--ion-safe-area-right, 0)) 0 calc(-16px - var(--ion-safe-area-left, 0));
	padding: 0 calc(16px + var(--ion-safe-area-right, 0)) 0 calc(+16px + var(--ion-safe-area-left, 0));
	height: auto;
	color: var(--gray-80080, rgba(241, 241, 242, 0.8));
	font-family: SFProT, serif;
	font-size: map-get($foot_note, "font-size");
	line-height: map-get($foot_note, line-height);
	letter-spacing: map-get($foot_note, letter-spacing);
	font-style: normal;
	&::-webkit-scrollbar {
		display: none;
	}
	&__body {
		display: flex;
		flex-direction: column;
		gap: 4px;
		width: fit-content;
	}
	&_icon {
		fill: var(--gray-80080, rgba(241, 241, 242, 0.8));
		&:not(&-copy) {
			width: 12px;
			height: 12px;
      padding-bottom: 15px;
		}
	}
	&_row {
		display: flex;
		gap: 12px;
		align-items: center;
		justify-content: space-between;
		min-height: 32px;
		flex: 1 1 auto;
		width: 100%;
		padding: 0 12px;
		&-title {
			color: var(--gray-400, #6F7682);
		}
		&:not(&-title) {
			border-radius: 8px;
			min-height: 48px;
			background: var(--secondary-color-1, #212327);
			box-shadow: 1px 2px 4px -2px rgba(29, 29, 29, 0.10);
		}
	}
	&_elem {
		min-width: 120px;
		padding-right: 15px;
		white-space: nowrap;
		display: inline-flex;
		align-items: center;
		gap: 8px;
		&:last-child {
			padding: 0;
			min-width: 100px;
		}
	}
}
</style>