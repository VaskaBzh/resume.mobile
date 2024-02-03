<template>
	<swiper
		:slides-per-view="1"
		:space-between="15"
		class="password__steps"
		:allowTouchMove="false"
		autoHeight
		id="fac_swiper"
		@swiper="setSwiper"
		v-if="user"
	>
		<swiper-slide class="fac__step">
			<div class="fac__block">
				<main-head
					:title="$t(`disconnect.title`)"
					:text="$t(`disconnect.sub_title`)"
				/>
				<main-form class="fac__form form-content-down" @submit.prevent="disconnectFac">
					<template #list>
						<input-code name="code" :code_length="6" @changeValue="codeInput = $event" />
					</template>
					<template #content>
						<div class="warning">
						    <span class="warning-icon">
						        <main-icon class="icon-large" :icon="warning_mark" />
						    </span>
							<div class="warning__block">
								<p class="disconnect_text">{{ $t("disconnect.warning.text") }}</p>
								<main-link class="warning_link" @click="telegramRedirect">{{ $t("disconnect.warning.link") }}</main-link>
							</div>
						</div>
					</template>
					<template #buttons>
						<main-button class="button--full fac_button" type="submit">
							<template #text>
								{{ $t(`disconnect.button`) }}
							</template>
						</main-button>
					</template>
				</main-form>
			</div>
		</swiper-slide>
		<swiper-slide class="fac__step">
			<success-card
				:title="$t(`disconnect.successful.title`)"
				:text="$t(`disconnect.successful.text`)"
				:button_text="$t(`disconnect.successful.button`)"
				@confirm="$emit('closeModal')"
			/>
		</swiper-slide>
	</swiper>
</template>
<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { Swiper, SwiperSlide } from "swiper/vue";
import { api } from "@/api/api.js";
import { getUser, id, user } from "@/modules/user/UserService.js";
import { GoogleAuthMessages } from "@/modules/settings/lang/GoogleAuthMessages.js";
import { setErrors } from "@/modules/errors/controllers/ErrorController.js";

import MainIcon from "@/modules/common/Components/UI/MainIcon.vue";
import MainButton from "@/modules/common/Components/UI/MainButton.vue";
import MainHead from "@/modules/common/Components/MainHead.vue";
import SuccessCard from "@/modules/common/Components/SuccessCard.vue";
import InputCode from "@/modules/common/Components/UI/InputCode.vue";
import warning_mark from "@icon/warning-mark.svg";
import MainLink from "@/modules/common/Components/UI/MainLink.vue";
import MainForm from "@/modules/form/Components/MainForm.vue";

useI18n({
	useScope: "global",
	messages: GoogleAuthMessages,
});

const codeInput = ref("");

async function disconnectFac() {
	try {
		const response = await api.put(`/2fac/disable/${id.value}`, { code: codeInput.value });
		
		swiperElem.value.slideNext();
		await getUser();
	} catch (err) {
		console.error(err);
		
		if (err.response.data.errors.messages) {
			setErrors({
				code: err.response.data.errors.messages,
			});
			
			return this;
		}
		setErrors(err.response.data.errors);
	}
}

const swiperElem = ref(null);

function setSwiper(swiperData) {
	swiperElem.value = swiperData;
}

function telegramRedirect() {
  window.location.href = 'https://t.me/allbtc_support'
}
</script>
<style scoped lang="scss">
.fac__form {
	height: 100%;
	flex: 1 1 auto;
}
.password-steps {
	height: calc(100vh - 56px);
}

.disconnect_text {
  font-family: SFProT, serif;
  font-size: map-get($foot_note, "font-size");
  line-height: map-get($foot_note, "line-height");
  letter-spacing: map-get($foot_note, "letter-spacing");
}

.warning_link {
  font-family: SFProT, serif;
  font-size: map-get($foot_note, "font-size");
  line-height: map-get($foot_note, "line-height");
  letter-spacing: map-get($foot_note, "letter-spacing");
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
	background: var(--background-orange, #fff3d9);
	border-radius: 20px;
	color: var(--secondary-orange, #ffb319);
	&__block {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}
	&_link {
		color: inherit;
    text-decoration: underline;
	}
	
	&-icon {
		margin-right: 10px;
	}
}
.fac {
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
</style>