<template>
	<div
		class="block"
	>
		<main-label
			class="block_label"
			:for="name"
			v-if="label"
		>
			{{ label }}
		</main-label>
		<ion-item
	        class="block__item"
	        :class="
	          {
	            'block-error': errors[name]?.length > 0,
	            'block-focus': isInFocus,
	          }
	        "
        >
			<ion-icon
				class="block_input_icon block_input_icon-start"
				slot="start"
				v-if="icon"
				:icon="icon"
				aria-hidden="true"
			/>
			<ion-input
				class="block_input"
				shape="round"
				fill="outline"
				label-placement="stacked"
				:type="dynamicallyType"
				:name="name"
				:id="name"
				:aria-label="name"
				:placeholder="placeholder"
				:disabled="disable"
				:readonly="readonly"
		        :value="value"
		        errorText=""
				autofocus
				@ionInput="emitInputValue($event); inputMethod ? inputMethod($event) : null;"
				@ionBlur="clearErrors(); isInFocus = false"
                @ionFocus="isInFocus = true"
        >
		<ion-label class="fl-g" v-if="props.endText.length > 0" slot="end">{{props.endText}}</ion-label>
        </ion-input>
			<ion-button
				v-if="type === 'password'"
				class="block_button"
				fill="clear"
				slot="end"
                type="button"
				aria-label="Show/hide"
				@click="passwordTypeChange"
			>
				<ion-icon
					class="block_input_icon"
					slot="icon-only"
					:icon="eye"
					aria-hidden="true"
				/>
			</ion-button>
			<validation-errors
				v-if="hasErrors"
				slot="error"
				class="bloc_list-errors"
				:list_name="name"
			/>
		</ion-item>
	</div>
</template>

<script setup>
	import { IonInput, IonItem, IonIcon, IonButton, IonLabel } from "@ionic/vue";
  import { ref } from "vue";
	import { PasswordTypeEnum } from "@/modules/common/enums/PasswordTypeEnum";
  import { errors } from "@/modules/errors/store/ErrorStore.js";
  import { clearErrors } from "@/modules/errors/controllers/ErrorController.js";

	import eye from "@icon/eye.svg";
	import ValidationErrors from "@/modules/validate/Components/ValidationErrors.vue";
	import MainLabel from "@/modules/common/Components/UI/MainLabel.vue";
	
	const props = defineProps({
		type: {
			type: String,
			default: "text",
		},
    endText: {
      type: String,
      default: ''
    },
		name: {
			type: String,
			default: "",
		},
		placeholder: {
			type: String,
			default: "",
		},
		value: {
			type: String,
			default: "",
		},
		label: {
			type: String,
			default: "",
		},
		disable: {
			type: Boolean,
			default: false,
		},
		hasErrors: {
			type: Boolean,
			default: true,
		},
		readonly: {
			type: Boolean,
			default: false,
		},
		inputMethod: {
			type: Function,
			default: null,
		},
		icon: {
			type: String,
			default: null,
		},
	});
	const emit = defineEmits(["changeValue"]);

  const isInFocus = ref(false);
	
	const dynamicallyType = ref(props.type);

	const emitInputValue = (inputEvent) => {
		const inputValue = inputEvent.target.value;
		
		emit("changeValue", inputValue);
	}

	const passwordTypeChange = () => {
		dynamicallyType.value = PasswordTypeEnum[dynamicallyType.value];
	}
</script>

<style scoped lang="scss">
.block {
	display: flex;
	flex-direction: column;
	gap: 4px;
	&-no-theme {
		.block {
			&_label {
				color: #6F7682;
			}
			&__item {
				--background: #212327;
				--color: rgba(241, 241, 242, 0.80);
			}
			&-focus {
				&::part(native) {
					border-color: #53B1FD;
				}
			}
			&-error {
				&::part(native) {
                    border-color: var(--secondary-red, #f1404a);
				}
			}
			&_input {
				--highlight-color-focused: #53B1FD;
				--highlight-color-invalid: #F1404A;
				--highlight-color: #F1F1F2;
				--placeholder-color: #595E68;
				&[aria-disabled] {
					--color: #595E68;
				}
			}
		}
	}
	&_label {
		padding-left: 12px;
		font-size: map-get($foot_note, "font-size");
		line-height: map-get($foot_note, "line-height");
		letter-spacing: map-get($foot_note, "letter-spacing");
	}
	&__item {
		--min-height: 48px;
		--max-height: 48px;
		--color: var(--gray-80080, rgba(241, 241, 242, 0.80));
		--inner-border-width: 0px 0px 0px 0px;
		--border-radius: 12px;
		--background: var(--secondary-color-1, #212327);
		--border-color: transparent;
		--padding-start: calc(12px - var(--ion-safe-area-left, 0));
		--inner-padding-end: calc(12px - var(--ion-safe-area-right, 0));
		
		font-size: map-get($callout, "font-size");
		font-weight: 400;
		line-height: map-get($callout, "line-height");
		letter-spacing: map-get($callout, "letter-spacing");
		box-shadow: 1px 2px 4px -2px rgba(29, 29, 29, 0.10);
		&::part(native) {
			border-color: transparent;
			border-width: 1px;
			transition: all 0.3s ease 0s;
		}
	}
	&-focus {
		&::part(native) {
			border-color: var(--primary-400, #53B1FD);
		}
	}
	&-error {
		&::part(native) {
		    border-color: var(--highlight-color-invalid, #f1404a);
		}
	}
	&_input {
		--highlight-color-focused: var(--primary-400, #53B1FD);
		--highlight-color-invalid: var(--secondary-red, #F1404A);
		--highlight-color: var(--gray-800, #F1F1F2);
		--border-width: 0px;
		--placeholder-color: var(--gray-300, #595E68);
		--placeholder-opacity: 1;
		--placeholder-font-weight: 400;

		font-weight: 400;
		font-family: SFProT, serif;
		font-size: map-get($callout, "font-size");
		line-height: map-get($callout, "line-height");
		letter-spacing: map-get($callout, "letter-spacing");
	    &[aria-disabled] {
	        --color: var(--gray-300, #595E68);
	    }
		
		margin-top: 0;
		min-height: 46px;
		max-height: 46px;
		&_icon {
			width: 24px;
			height: 24px;
			&-start {
				margin-right: 8px;
			}
		}
	}
	&_button {
		width: 24px;
		height: 24px;
		margin: 0 0 0 8px;
		--padding-top: 0;
		--padding-start: 0;
		--padding-end: 0;
		--padding-bottom: 0;
	}
}

.fl-g {
	text-align: right;
	max-width: fit-content;
	color: var(--gray-400, #6F7682);
}
</style>