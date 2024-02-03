<template>
	  <page-container class="page-no-theme page-smooth">
		  <div class="login">
			  <ion-img class="login_logo" :src="logoLarge" alt="Logo"/>
			  <main-form class="login__form form-no-labels" @submit.prevent="loginService.login()">
				  <template #list>
					  <main-input
						  class="block-no-theme"
						  placeholder="Email"
						  :value="loginService.form.value.form.email"
						  :icon="email"
						  type="email"
						  name="email"
						  :hasErrors="false"
						  @changeValue="loginService.form.value.form.email = $event"
					  />
					  <main-input
						  class="block-no-theme"
						  :placeholder="$t('login.placeholder')"
						  :value="loginService.form.value.form.password"
						  :icon="key"
						  type="password"
						  name="password"
						  :hasErrors="false"
						  @changeValue="loginService.form.value.form.password = $event"
					  />
					  <validation-errors-out
						  class="errors-no-theme login__errors"
						  :list_name="['email']"
					  />
				  </template>
				  <template #buttons>
					  <main-button type="submit" class="button--full">
						  <template #text>
							  {{ $t("login.button[0]") }}
						  </template>
					  </main-button>
				  </template>
			  </main-form>
			  <action-alert
				@present="loginService.isOpenVerify.value = true"
				@dismiss="loginService.isOpenVerify.value = false"
			    :isOpen="loginService.isOpenVerify.value"
				:header="$t('login.verify.title')"
				:message="$t('login.verify.text', { email: loginService.form.value.form.email })"
				:buttons="verifyButtons"
				css-class="alert__content-no-theme"
			  />
			  <ion-toast
				  class="login_toast"
				  :is-open="isToastOpen"
				  :message="toastMessage"
				  :duration="5000"
				  @ionToastWillPresent="isToastOpen = true"
				  @ionToastWillDismiss="isToastOpen = false"
			  />
			  <div class="login__block">
				  <main-link class="login_link login_link-white" @click="loginService.isForgotPopupOpen.value = true">
					  {{ $t("login.forgot_password") }}
				  </main-link>
				  <div class="login__interface">
					  <main-label class="login_text">
						  {{ $t("login.text") }}
						  <main-link router-link="/registration" class="login_link">
							  {{
								  $t("login.link")
							  }}
						  </main-link>
					  </main-label>
					  <div class="login__locale" id="choseLanguage">
						  <main-icon class="icon-large" :src="activeLanguageIcon"/>
						  <main-icon class="login_icon login_icon-arrow" :src="arrow_down"/>
					  </div>
				  </div>
			  </div>
		  </div>
		  <chose-language-popup
			  class="modal-no-theme"
			  :triggerId="'choseLanguage'"
			  listClass="list-no-theme"
		  />
		  <main-modal
			  :isOpen="loginService.isFacPopupOpen.value"
			  @ionModalWillPresent="loginService.isFacPopupOpen.value = true;"
			  @ionModalWillDismiss="loginService.isFacPopupOpen.value = false;"
			  class="modal-no-theme"
		  >
			 <google-login-form @getCode="loginService.form.value.form.google2fa_code = $event; loginService.login()" />
		  </main-modal>
		  <main-modal
			  :isOpen="loginService.isForgotPopupOpen.value"
			  @ionModalWillPresent="loginService.isForgotPopupOpen.value = true;"
			  @ionModalWillDismiss="loginService.isForgotPopupOpen.value = false;"
			  class="modal-no-theme"
		  >
			  <swiper
				  :slides-per-view="1"
				  :space-between="15"
				  class="login__steps"
				  :allowTouchMove="false"
				  autoHeight
				  @swiper="swiperInit"
			  >
				  <swiper-slide>
					  <div class="login__step">
						  <main-head
							  class="head-no-theme"
							  :title="$t('reset_password.title')"
							  :text="$t('reset_password.text')"
						  />
						  <main-form
							  class="login__form form-buttons-down"
							  @submit.prevent="loginService.sendForgotPassword(emailForgotPassword, swiperData)"
						  >
							  <template #list>
								  <main-input
									  class="block-no-theme"
									  :placeholder="$t('reset_password.placeholder')"
									  :value="loginService.formForgot.value.form.forgot_email"
									  name="forgot_email"
									  @change-value="loginService.formForgot.value.form.forgot_email = $event"
								  />
							  </template>
							  <template #buttons>
								  <main-button
									  class="button--full"
									  type="submit"
								  >
									  <template #text>
										  {{
											  $t('registration.buttons.continue')
										  }}
									  </template>
								  </main-button>
							  </template>
						  </main-form>
					  </div>
				  </swiper-slide>
				  <swiper-slide>
					  <div class="login__step">
						  <main-head
							  class="head-no-theme"
							  :title="$t('reset_password.title')"
							  :text="$t('reset_password.confirm_text[0]', { email: loginService.formForgot.value.form.forgot_email })"
						  />
						  <main-text class="login__step_text">
							  {{ $t('reset_password.confirm_text[1]') }}
						  </main-text>
						  <verify-link
							  class="login_link"
							  :verify-text="$t('reset_password.send_letter[0]')"
							  verify-url="/password/forgot"
							  :data="{ email: loginService.formForgot.value.form.forgot_email }"
						  />
					  </div>
				  </swiper-slide>
			  </swiper>
		  </main-modal>
	  </page-container>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { AuthMessage } from "@/modules/auth/lang/AuthMessage.js";
import { IonToast, IonImg, onIonViewWillEnter } from "@ionic/vue";
import { computed, ref } from "vue";
import { LanguageConfig } from "@/configs/LanguageConfig.ts";
import { LoginService } from "@/modules/auth/services/LoginService.js";
import { Swiper, SwiperSlide } from "swiper/vue";
import { api } from "@/api/api.js";

import logoLarge from "@img/logo-large.svg";
import key from "@icon/key.svg";
import email from "@icon/email.svg";

import MainForm from "@/modules/form/Components/MainForm.vue";
import MainInput from "@/modules/common/Components/UI/MainInput.vue";
import MainButton from "@/modules/common/Components/UI/MainButton.vue";
import MainModal from "@/modules/modal/Components/MainModal.vue";
import MainLink from "@/modules/common/Components/UI/MainLink.vue";
import MainLabel from "@/modules/common/Components/UI/MainLabel.vue";
import ChoseLanguagePopup from "@/modules/common/Components/ChoseLanguagePopup.vue";
import MainIcon from "@/modules/common/Components/UI/MainIcon.vue";
import arrow_down from "@icon/arrow_down.svg";
import PageContainer from "@/modules/common/Components/PageContainer.vue";
import MainHead from "@/modules/common/Components/MainHead.vue";
import MainText from "@/modules/common/Components/UI/MainText.vue";
import VerifyLink from "@/modules/verify/Components/UI/VerifyLink.vue";
import ValidationErrorsOut from "@/modules/validate/Components/ValidationErrorsOut.vue";
import GoogleLoginForm from "@/modules/auth/Components/GoogleLoginForm.vue";
import ActionAlert from "@/modules/common/Components/UI/ActionAlert.vue";

const loginService = new LoginService();

const { locale, t } = useI18n({
  useScope: "global",
  messages: AuthMessage,
});

const swiperData = ref(null);

function swiperInit(swiper) {
  swiperData.value = swiper;
}

const activeLanguageIcon = computed(() => LanguageConfig[locale.value].icon);

const toastMessage = ref("");
const isToastOpen = ref(false);

async function reVerifyEmail() {
	try {
		const response = await api.post("/email/verify", loginService.form.value.form);
		
		toastMessage.value = response.data.message;
		isToastOpen.value = true;
	} catch(err) {
		console.error(err);
	}
}

const verifyButtons = computed(() => [
	{
		text: t("login.verify.buttons.cancel"),
		role: "cancel",
		cssClass: "cancel-verify",
	},
	{
		text: t("login.verify.buttons.verify"),
		role: "confirm",
		handler: reVerifyEmail,
	},
]);

onIonViewWillEnter(() => {
  loginService.setLoginForm();
  loginService.setForgotForm();
})
</script>

<style scoped lang="scss">
.login {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  padding-bottom: env(--ion-safe-area);
	
  &_toast {
	  --background: rgba(30, 30, 30, 0.75);
	  --color: #F1F1F2;
	  font-family: SFProT, serif;
  }
	
  &__errors {
  	margin-top: -12px;
	padding-left: 12px;
  }

  &__step {
    min-height: 525px;
    display: flex;
    flex-direction: column;

    &_text {
	  color: #6F7682;
      margin-bottom: 26px;
    }

    .login {
      &__form {
        margin-bottom: 0;
        flex: 1 1 auto;
      }
    }
  }

  &__locale {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &_icon {
    &-arrow {
      stroke: #6F7682;
    }
  }

  &_logo {
    max-width: 87px;
    padding-top: env(--ion-safe-area);
    margin: 58px auto 56px;
  }

  &__form {
    margin-bottom: 24px;
  }

  &__block {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    flex: 1 1 auto;
	margin-bottom: 37px;
  }

  &_link {
    --color: #53b1fd;

    &-white {
      --color: #e4e7ec;

      margin-bottom: auto;
    }
  }

  &_text {
    color: #6f7682;
    display: inline-flex;
    gap: 6px;
  }

  &__interface {
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
  }
}
</style>
