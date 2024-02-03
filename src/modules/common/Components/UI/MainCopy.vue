<template>
	<div
		class="copy"
		:class="{
			'copy-low': lowBlock
		}"
		@click.stop="writeToClipboard"
	>
	    <main-label class="copy_label" v-if="label">
	        {{ label }}
	    </main-label>
	    <main-item class="copy_item">
	        <ion-text class="copy_text">
		        {{ text }}
	        </ion-text>
			<transition name="copy">
				<main-icon
				    :class="{
						'icon-large': !lowBlock
				    }"
				    slot="end"
				    v-if="!isCopy"
				    class="copy_icon"
				    :icon="copy_icon"
				/>
				<main-icon
					:class="{
						'icon-large': !lowBlock
				    }"
				    slot="end"
				    v-else
				    class="copy_icon copy_icon-tick"
				    :icon="tick"
				/>
			</transition>
	    </main-item>
	</div>
</template>

<script setup>
import { IonText } from "@ionic/vue";
import { Clipboard } from "@capacitor/clipboard";
import MainItem from "@/modules/common/Components/UI/MainItem.vue";
import copy_icon from "@icon/copy_icon.svg";
import tick from "@icon/tick.svg";
import MainIcon from "@/modules/common/Components/UI/MainIcon.vue";
import MainLabel from "@/modules/common/Components/UI/MainLabel.vue";
import {ref} from "vue";

const props = defineProps({
	text: {
		type: String,
		default: "",
	},
	label: {
		type: String,
		default: "",
	},
	lowBlock: {
		type: Boolean,
		default: false,
	},
});

const isCopy = ref(false);

const writeToClipboard = async () => {
	if (isCopy.value) {
		return this;
	}
	await Clipboard.write({
		string: props.text,
	});
	
	isCopy.value = true;
	
	setTimeout(() => isCopy.value = false, 1500);
};
</script>

<style scoped lang="scss">
.copy {
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-top: 16px;
	gap: 4px;
	color: var(--gray-80080, rgba(241, 241, 242, 0.8));
	font-feature-settings: "case" on;
	font-family: SFProT, serif;
	font-size: 15px;
	font-weight: 400;
	line-height: 20px;
	letter-spacing: -0.24px;
	border-radius: 16px;
	
	--background: var(--secondary-color-1, #212327);
	--color: var(--gray-700, #e2e4e6);
	--min-height: 48px;
	--max-height: 48px;
	--border-color: var(--gray-200, #43474e);
	&-low {
		.copy {
			&_icon {
				right: 8px;
				top: 8px;
			}
			&_label {
				margin-left: 8px;
			}
			&_item {
				font-size: 13px;
				font-weight: 400;
				line-height: 18px;
				letter-spacing: -0.078px;
			}
		}
	}
	&_icon {
		position: absolute;
		top: 12px;
		right: 16px;
		stroke: var(--gray-300, #595E68);
		//&-tick {
		//	stroke: var(--secondary-green, #1FB96C);
		//}
	}
	&_label {
		margin-left: 16px;
		font-size: map-get($foot_note, "font-size");
		line-height: map-get($foot_note, "line-height");
		letter-spacing: map-get($foot_note, "letter-spacing");
	}
	&_item {
		--background: inherit;
		--color: inherit;
		--min-height: inherit;
		--max-height: inherit;
		--border-color: inherit;

		border-radius: inherit;
		position: relative;
		overflow: hidden;
	}
	&_text {
		width: calc(100% - 32px);
		font-size: inherit;
		font-weight: inherit;
		line-height: inherit;
		letter-spacing: inherit;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
}
</style>
