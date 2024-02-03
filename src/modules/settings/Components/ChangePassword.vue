<template>
	<div class="password">
		<swiper
			:slides-per-view="1"
			:space-between="15"
			class="password__steps"
			:allowTouchMove="false"
			@swiper="setSwiper"
			autoHeight
			id="password_swiper"
		>
			<swiper-slide>
				<div class="password__step">
					<main-head
						:title="$t('change_password.title')"
						:text="$t('change_password.text')"
					/>
					<main-form class="password__form" @submit.prevent="changePasswordService.nextStep(1, swiperElem)">
						<template #list>
							<main-input
								:placeholder="$t('change_password.inputs.placeholder[0]')"
								:label="$t('change_password.inputs.label[0]')"
								:value="changePasswordService.form.value.form.old_password"
								:icon="eye"
								type="password"
								name="old_password"
								@changeValue="changePasswordService.form.value.form.old_password = $event"
								:has-errors="false"
							/>
							<main-input
								:placeholder="
				          $t('change_password.inputs.placeholder[1]')
				        "
								:label="$t('change_password.inputs.label[1]')"
								:value="changePasswordService.form.value.form.password"
								:icon="key"
								type="password"
								name="password"
								@changeValue="
				          changePasswordService.form.value.form.password = $event
				          changePasswordService.isPasswordItemValid();
				        "
								:has-errors="false"
							/>
							<transition name="list">
								<div
									v-if="!changePasswordService.isPasswordValid.value"
									class="validate-password-container"
								>
									<div
										class="input-validate item-row"
										v-for="item in changePasswordService.passwordValidateItems.value"
										:class="{ 'green-validate': item.isValid }"
									>
										<div class="validate-svg">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												viewBox="0 0 16 16"
												fill="none"
												v-if="item.isValid"
											>
												<path
													d="M6.76497 10.7791C6.90367 10.9187 7.12935 10.919 7.26848 10.7799L11.3497 6.69872C11.5607 6.48768 11.5588 6.14495 11.3455 5.93624C11.1354 5.73076 10.7991 5.7326 10.5913 5.94039L7.19816 9.33355C7.09774 9.43396 6.93494 9.43396 6.83452 9.33355L5.39191 7.89093C5.18449 7.68351 4.84819 7.68351 4.64077 7.89093C4.4338 8.09791 4.43329 8.43333 4.63964 8.64093L6.76497 10.7791ZM7.99967 14.6654C7.08856 14.6654 6.22745 14.4904 5.41634 14.1404C4.60523 13.7904 3.8969 13.3126 3.29134 12.707C2.68579 12.1015 2.20801 11.3931 1.85801 10.582C1.50801 9.77092 1.33301 8.90981 1.33301 7.9987C1.33301 7.07648 1.50801 6.20981 1.85801 5.3987C2.20801 4.58759 2.68579 3.88203 3.29134 3.28203C3.8969 2.68203 4.60523 2.20703 5.41634 1.85703C6.22745 1.50703 7.08856 1.33203 7.99967 1.33203C8.9219 1.33203 9.78856 1.50703 10.5997 1.85703C11.4108 2.20703 12.1163 2.68203 12.7163 3.28203C13.3163 3.88203 13.7913 4.58759 14.1413 5.3987C14.4913 6.20981 14.6663 7.07648 14.6663 7.9987C14.6663 8.90981 14.4913 9.77092 14.1413 10.582C13.7913 11.3931 13.3163 12.1015 12.7163 12.707C12.1163 13.3126 11.4108 13.7904 10.5997 14.1404C9.78856 14.4904 8.9219 14.6654 7.99967 14.6654ZM7.99967 13.6654C9.57745 13.6654 10.9163 13.1126 12.0163 12.007C13.1163 10.9015 13.6663 9.56536 13.6663 7.9987C13.6663 6.42092 13.1163 5.08203 12.0163 3.98203C10.9163 2.88203 9.57745 2.33203 7.99967 2.33203C6.43301 2.33203 5.0969 2.88203 3.99134 3.98203C2.88579 5.08203 2.33301 6.42092 2.33301 7.9987C2.33301 9.56536 2.88579 10.9015 3.99134 12.007C5.0969 13.1126 6.43301 13.6654 7.99967 13.6654Z"
													fill="#1FB96C"
												/>
											</svg>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												viewBox="0 0 16 16"
												fill="none"
												v-else
											>
												<path
													d="M5.14967 10.8487C5.34297 11.042 5.65637 11.042 5.84967 10.8487L7.99967 8.6987L10.1497 10.8487C10.343 11.042 10.6564 11.042 10.8497 10.8487C11.043 10.6554 11.043 10.342 10.8497 10.1487L8.69967 7.9987L10.8497 5.8487C11.043 5.6554 11.043 5.342 10.8497 5.1487C10.6564 4.9554 10.343 4.9554 10.1497 5.1487L7.99967 7.2987L5.84967 5.1487C5.65637 4.9554 5.34297 4.9554 5.14967 5.1487C4.95637 5.342 4.95637 5.6554 5.14967 5.8487L7.29967 7.9987L5.14967 10.1487C4.95638 10.342 4.95637 10.6554 5.14967 10.8487ZM7.99967 14.6654C7.08856 14.6654 6.22745 14.4904 5.41634 14.1404C4.60523 13.7904 3.8969 13.3126 3.29134 12.707C2.68579 12.1015 2.20801 11.3931 1.85801 10.582C1.50801 9.77092 1.33301 8.90981 1.33301 7.9987C1.33301 7.07648 1.50801 6.20981 1.85801 5.3987C2.20801 4.58759 2.68579 3.88203 3.29134 3.28203C3.8969 2.68203 4.60523 2.20703 5.41634 1.85703C6.22745 1.50703 7.08856 1.33203 7.99967 1.33203C8.9219 1.33203 9.78856 1.50703 10.5997 1.85703C11.4108 2.20703 12.1163 2.68203 12.7163 3.28203C13.3163 3.88203 13.7913 4.58759 14.1413 5.3987C14.4913 6.20981 14.6663 7.07648 14.6663 7.9987C14.6663 8.90981 14.4913 9.77092 14.1413 10.582C13.7913 11.3931 13.3163 12.1015 12.7163 12.707C12.1163 13.3126 11.4108 13.7904 10.5997 14.1404C9.78856 14.4904 8.9219 14.6654 7.99967 14.6654ZM7.99967 13.6654C9.57745 13.6654 10.9163 13.1126 12.0163 12.007C13.1163 10.9015 13.6663 9.56536 13.6663 7.9987C13.6663 6.42092 13.1163 5.08203 12.0163 3.98203C10.9163 2.88203 9.57745 2.33203 7.99967 2.33203C6.43301 2.33203 5.0969 2.88203 3.99134 3.98203C2.88579 5.08203 2.33301 6.42092 2.33301 7.9987C2.33301 9.56536 2.88579 10.9015 3.99134 12.007C5.0969 13.1126 6.43301 13.6654 7.99967 13.6654Z"
													fill="#F1404A"
												/>
											</svg>
										</div>
										{{ $t(item.text) }}
									</div>
								</div>
							</transition>
							<main-input
								:placeholder="
				          $t('change_password.inputs.placeholder[2]')
				        "
								:label="
				          $t('change_password.inputs.label[2]')
				        "
								:value="changePasswordService.form.value.form.password_confirmation"
								:icon="key"
								type="password"
								name="password_confirmation"
								:has-errors="false"
								@changeValue="
				          changePasswordService.form.value.form.password_confirmation = $event
				        "
							/>
							<validation-errors-out
                class="password__errors"
								:list_name="['password', 'old_password']"
							/>
						</template>
						<template #buttons>
							<main-button type="submit" class="button--full password_button">
								<template #text>
									{{ $t("change_password.buttons.change") }}
								</template>
							</main-button>
						</template>
					</main-form>
				</div>
			</swiper-slide>
			<swiper-slide>
				<success-card
					class="password__success"
					:title="$t('change_password.success.title')"
					:text="$t('change_password.success.text')"
					:button_text="$t('change_password.buttons.close')"
					@confirm="$emit('closeModal')"
				/>
			</swiper-slide>
		</swiper>
	</div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import MainForm from "@/modules/form/Components/MainForm.vue";
import MainInput from "@/modules/common/Components/UI/MainInput.vue";
import MainButton from "@/modules/common/Components/UI/MainButton.vue";
import SuccessCard from "@/modules/common/Components/SuccessCard.vue";
import MainHead from "@/modules/common/Components/MainHead.vue";
import eye from "@icon/eye.svg";
import { Swiper, SwiperSlide } from "swiper/vue";
import { ref } from "vue";
import key from "@icon/key.svg";
import ValidationErrorsOut from "@/modules/validate/Components/ValidationErrorsOut.vue";
import { ChangePasswordService } from "@/modules/settings/services/ChangePasswordService.js";
import {AuthMessage} from "@/modules/auth/lang/AuthMessage.js";

const { locale } = useI18n({
  useScope: "global",
  messages: AuthMessage,
});

const swiperElem = ref(null);

function setSwiper(swiperData) {
	swiperElem.value = swiperData;
}

const changePasswordService = new ChangePasswordService();
</script>

<style lang="scss" scoped>
.password {
	//--keyboard-offset: 0;
	&__success {
		width: 100%;
	}
	&__form {
		flex: 1 1 auto;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	&__step {
		display: flex;
		flex-direction: column;
		min-height: 637px;
	}
	&__errors {
	  margin-top: -12px;
	  padding-left: 12px;
	}
}

.validate-password-container {
	display: flex;
	flex-direction: column;
	gap: 8px;
	padding-top: 8px;
	overflow: hidden;
	max-height: 130px;
	font-family: SFProT, serif;
}
.list-enter-active,
.list-leave-active {
	transition: all 0.35s ease-in-out;
}
.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(-30px);
	max-height: 0;
	padding-top: 0;
}
.input-validate {
	color: #f1404a;
	font-style: normal;
	font-weight: 400;
	margin-left: 12px;
	transition: all 0.3s linear;
	max-height: 18px;
	padding-top: 4px;
	font-size: map-get($foot_note, "font-size");
	line-height: map-get($foot_note, "line-height");
	letter-spacing: map-get($foot_note, "letter-spacing");
}
.validate-svg {
	display: flex;
	align-items: center;
}
.item-row {
	display: flex;
	gap: 4px;
	align-items: center;
}
.green-validate {
	color: #1fb96c;
	transition: all 0.2s linear;
}
</style>
