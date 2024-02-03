<template>
	<swiper
		:slides-per-view="1"
		:space-between="15"
		class="faq__steps"
		:allowTouchMove="false"
		autoHeight
		id="fac_swiper"
		@swiper="setSwiper"
		v-if="user"
	>
		<swiper-slide class="fac__step">
			<div class="fac__block">
				<main-head
					:title="$t('connect.title')"
					:text="$t('connect.sub_title')"
				/>
				<span class="qr-code-img">
				  <svg v-html="googleAuthData.qrcode"></svg>
				</span>
				<main-copy
					:text="googleAuthData.code"
					:label="$t('connect.label')"
				/>
				<div class="warning">
				    <span class="warning-icon">
				      <main-icon class="icon-large" :icon="warning_mark" />
				    </span>
					<p>{{ $t("connect.warning") }}</p>
				</div>
				<main-button class="button--full fac_button" @click="nextStep(1)">
					<template #text>
						{{ $t("connect.button") }}
					</template>
				</main-button>
			</div>
		</swiper-slide>
		<swiper-slide class="fac__step">
			<div class="fac__block">
				<main-head
					:title="$t(`connect.title`)"
					:text="$t(`connect.sub_title`)"
				/>
				<main-form class="fac__form form-buttons-down" @submit.prevent="nextStep(2)">
					<template #list>
						<input-code name="code" :code_length="6" @changeValue="codeInput = $event" />
					</template>
					<template #buttons>
						<main-button class="button--full fac_button" type="submit">
							<template #text>
								{{ $t(`connect.button`) }}
							</template>
						</main-button>
					</template>
				</main-form>
			</div>
		</swiper-slide>
		<swiper-slide class="fac__step">
			<success-card
				:title="$t(`connect.successful.title`)"
				:text="$t(`connect.successful.text`)"
				:button_text="$t(`connect.successful.button`)"
				@confirm="$emit('closeModal')"
			/>
		</swiper-slide>
	</swiper>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { Swiper, SwiperSlide } from "swiper/vue";
import { api } from "@/api/api.js";
import { getUser, id, user } from "@/modules/user/UserService.js";
import { GoogleAuthMessages } from "@/modules/settings/lang/GoogleAuthMessages.js";
import { setErrors } from "@/modules/errors/controllers/ErrorController.js";

import warning_mark from "@icon/warning-mark.svg";
import MainButton from "@/modules/common/Components/UI/MainButton.vue";
import MainHead from "@/modules/common/Components/MainHead.vue";
import SuccessCard from "@/modules/common/Components/SuccessCard.vue";
import InputCode from "@/modules/common/Components/UI/InputCode.vue";
import MainCopy from "@/modules/common/Components/UI/MainCopy.vue";
import MainIcon from "@/modules/common/Components/UI/MainIcon.vue";
import MainForm from "@/modules/form/Components/MainForm.vue";

const { t } = useI18n({
	useScope: "global",
	messages: GoogleAuthMessages,
});

const codeInput = ref("");

const googleAuthData = ref({
	qrcode: "",
	code: "",
});

async function generateFac() {
	try {
		const response = await api.get(`/2fac/qrcode/${id.value}`);
		
		googleAuthData.value.qrcode = response.data.qrCode;
		googleAuthData.value.code = response.data.secret;
	} catch (err) {
		console.error(err);
	}
}

async function connectFac() {
	try {
		const response = await api.put(`/2fac/enable/${id.value}`, {
			code: codeInput.value,
			secret: googleAuthData.value.code
		});
		
		swiperElem.value.slideNext();
		await getUser();
	} catch (err) {
		console.error(err);
		
		if (err.response.data.errors.code) {
			setErrors(err.response.data.errors);
			
			return this;
		}
		
		setErrors({ code: err.response.data.errors.messages })
	}
}

onMounted(async () => {
	await generateFac();
});

const swiperElem = ref(null);

function setSwiper(swiperData) {
	swiperElem.value = swiperData;
}
async function nextStep(step) {
	if (step === 1) {
		swiperElem.value.slideNext();
	}
	if (step === 2) {
		await connectFac();
	}
}
</script>
<style scoped lang="scss">
.fac {
	&__form {
		flex: 1 1 auto;
	}
	&_button {
		margin-top: auto;
	}
	&__block {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		min-height: 600px;
	}
}
.swiper {
	--swiper-theme-color: #2e90fa;
	--swiper-pagination-bullet-size: 8px;
}
.repeat-code {
	color: var(--primary-400, #53b1fd);
	font-weight: 600;
	letter-spacing: -0.5px;
	margin-left: 16px;
	margin-top: 32px;
	font-size: map-get($sub_headline, "font-size");
	line-height: map-get($sub_headline, "line-height");
}
.error-text {
	color: var(--secondary-red, #f04438);
	font-size: map-get($foot_note, "font-size");
	line-height: map-get($foot_note, "line-height");
	letter-spacing: map-get($foot_note, "letter-spacing");
	margin-top: 4px;
	margin-left: 16px;
	font-weight: 400;
	animation: animateTextError 0.3s ease-out forwards;
}
@keyframes animateTextError {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
.qr-code-img {
	width: auto;
	display: flex;
	justify-content: center;
	
	svg {
		width: 200px;
		height: 200px;
		margin: 48px 0;
	}
}

.warning {
	font-family: SFProT, serif;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16px;
	font-size: map-get($foot_note, "font-size");
	line-height: map-get($foot_note, "line-height");
	letter-spacing: map-get($foot_note, "letter-spacing");
	background: var(--background-orange, #fff3d9);
	margin: 12px 0px 40px 0px;
	border-radius: 20px;
	color: var(--secondary-orange, #ffb319);
	&__block {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}
	&_link {
		color: inherit;
	}
	&-icon {
		margin-right: 10px;
	}
}
</style>