<template>
  <layout-main>
    <page-container class="page-no-theme">
      <div class="registration">
        <swiper
          :slides-per-view="1"
          :space-between="15"
          :modules="modules"
          class="registration__steps"
          :allowTouchMove="false"
          :pagination="{
            clickable: false,
            el: '#reg_pagination',
          }"
          @swiper="setSwiper"
          id="reg_swiper"
        >
          <swiper-slide class="registration__step">
	        <main-head
		      class="registration_title head-no-theme"
		      :title="$t('registration.steps.titles[0]')"
	        />
            <main-form
              class="registration__form"
              @submit.prevent="registrationService.nextStep(1, swiperElem)"
            >
              <template #list>
                <main-input
	              class="block-no-theme"
                  :placeholder="$t('registration.steps.inputs.sub.placeholder')"
                  :label="$t('registration.steps.inputs.sub.label')"
                  :value="registrationService.form.value.form.name"
                  :icon="key"
                  type="text"
                  name="name"
                  @changeValue="registrationService.form.value.form.name = $event"
                />
                <main-input
	              class="block-no-theme"
                  :placeholder="
                    $t('registration.steps.inputs.email.placeholder')
                  "
                  :label="$t('registration.steps.inputs.email.label')"
                  :value="registrationService.form.value.form.email"
                  :icon="email"
                  type="email"
                  name="email"
                  @changeValue="registrationService.form.value.form.email = $event"
                />
              </template>
              <template #content>
                <div class="registration__content">
                  <main-text class="registration__content_text text-sm">
                    {{ $t("registration.message.text") }}
                    <main-link @click="openPolicy" class="registration__content_link">
                      {{ $t("registration.message.link") }}
                    </main-link>
                  </main-text>
                </div>
              </template>
              <template #buttons>
                <main-button type="submit" class="registration_button button--full">
                  <template #text>
                    {{ $t("registration.buttons.continue") }}
                  </template>
                </main-button>
              </template>
            </main-form>
          </swiper-slide>
          <swiper-slide class="registration__step">
	        <main-head
		      class="registration_title head-no-theme"
		      :title="$t('registration.steps.titles[1]')"
	        />
            <main-form
              class="registration__form"
              @submit.prevent="registrationService.nextStep(2, swiperElem)"
            >
              <template #list>
                <main-input
	              class="block-no-theme"
                  :placeholder="
                    $t('registration.steps.inputs.password.placeholder')
                  "
                  :label="$t('registration.steps.inputs.password.label')"
                  :value="registrationService.form.value.form.password"
                  :icon="key"
                  type="password"
                  name="password"
                  @changeValue="
                    registrationService.form.value.form.password = $event;
                    registrationService.isPasswordItemValid();
                  "
                  :has-errors="false"
                />
                <transition name="list">
                  <div
                    v-if="!registrationService.isPasswordValid.value"
                    class="validate-password-container"
                  >
                    <div
                      class="input-validate item-row"
                      v-for="item in registrationService.passwordValidateItems
                        .value"
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
	              class="block-no-theme"
                  :placeholder="
                    $t('registration.steps.inputs.password_confirm.placeholder')
                  "
                  :label="
                    $t('registration.steps.inputs.password_confirm.label')
                  "
                  :value="registrationService.form.value.form.password_confirmation"
                  :icon="key"
                  type="password"
                  name="password_confirmation"
                  :has-errors="false"
                  @changeValue="
                    registrationService.form.value.form.password_confirmation = $event
                  "
                />
                <validation-errors-out
	                class="errors-no-theme registration__errors"
                  :list_name="['password']"
                />
              </template>
              <template #content>
                <div class="registration__content">
                  <main-text class="registration__content_text registration__content_text-no-wrap text-sm">
                    {{ $t("registration.message.text") }}
                    <main-link @click="openPolicy" class="registration__content_link">
                      {{ $t("registration.message.link") }}
                    </main-link>
                  </main-text>
                </div>
              </template>
              <template #buttons>
                <main-button
                  @click="registrationService.prevStep(swiperElem)"
                  fill="clear"
                  no_preloader
                  class="registration_button button--full"
                >
                  <template #text>
                    {{ $t("registration.buttons.back") }}
                  </template>
                </main-button>
                <main-button type="submit" class="registration_button button--full">
                  <template #text>
                    {{ $t("registration.buttons.continue") }}
                  </template>
                </main-button>
              </template>
            </main-form>
          </swiper-slide>
          <swiper-slide class="registration__step">
	        <main-head
		      class="registration_title head-no-theme"
		      :title="$t('registration.steps.titles[2]')"
	        />
            <main-form class="registration__form">
              <template #list>
                <main-text class="registration__content_text">
	              {{
	                $t(
                        "registration.steps.confirm_email.text",
		                {
		                  email: registrationService.form.value.form.email,
		                }
                    )
                  }}
                </main-text>
	            <verify-link
		          class="confirm_link registration__content_link-confirm"
		          verify-url="/email/verify"
		          :verify-text="$t('registration.steps.confirm_email.link')"
		          :data="{
				      email: registrationService.form.value.form.email,
				  }"
	            />
              </template>
              <template #content>
                <div class="registration__content">
                  <main-text class="registration__content_text registration__content_text-no-wrap text-sm">
                    {{ $t("registration.message.text") }}
                    <main-link @click="openPolicy" class="registration__content_link">
                      {{ $t("registration.message.link") }}
                    </main-link>
                  </main-text>
                </div>
              </template>
              <template #buttons>
                <main-button
                  @click="registrationService.prevStep(swiperElem)"
                  fill="clear"
                  no_preloader
                  class="button--full registration_button"
                >
                  <template #text>
                    {{ $t("registration.buttons.back") }}
                  </template>
                </main-button>
                <main-button disabled class="registration_button button--full">
                  <template #text>
                    {{ $t("registration.buttons.continue") }}
                  </template>
                </main-button>
              </template>
            </main-form>
          </swiper-slide>
          <div class="registration__pagination" id="reg_pagination"></div>
        </swiper>
      </div>
    </page-container>
  </layout-main>
</template>

<script setup>
import "swiper/css";
import "swiper/css/bundle";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper";
import { useI18n } from "vue-i18n";
import { AuthMessage } from "@/modules/auth/lang/AuthMessage.js";
import { RegistrationService } from "@/modules/auth/services/RegistrationService.js";
import { ref } from "vue";

import pdf from "@files/policy.pdf";
import LayoutMain from "@/layouts/LayoutMain.vue";
import email from "@icon/email.svg";
import key from "@icon/key.svg";
import PageContainer from "@/modules/common/Components/PageContainer.vue";
import MainInput from "@/modules/common/Components/UI/MainInput.vue";
import MainForm from "@/modules/form/Components/MainForm.vue";
import MainButton from "@/modules/common/Components/UI/MainButton.vue";
import MainLink from "@/modules/common/Components/UI/MainLink.vue";
import MainText from "@/modules/common/Components/UI/MainText.vue";
import ValidationErrorsOut from "@/modules/validate/Components/ValidationErrorsOut.vue";
import VerifyLink from "@/modules/verify/Components/UI/VerifyLink.vue";
import MainHead from "@/modules/common/Components/MainHead.vue";

useI18n({
  useScope: "global",
  messages: AuthMessage,
});

const swiperElem = ref(null);

function setSwiper(swiperData) {
  swiperElem.value = swiperData;
}

const modules = [Pagination];

function openPolicy() {
	window.open(pdf, '_blank');
}

const registrationService = new RegistrationService();
</script>

<style scoped lang="scss">
.registration {
  flex: 1 1 auto;
  display: flex;
	&_button {
	  --color: #F5FAFF;
	  &[fill="clear"] {
	  	--color: #F5FAFF;
	  }
	}
  &__errors {
    margin-top: -12px;
    padding-left: 12px;
  }
  &__steps {
    flex: 1 1 auto;
    display: flex;

    --swiper-pagination-bullet-width: 100%;
    --swiper-pagination-bullet-height: 100%;
    --swiper-pagination-bullet-inactive-color: var(--progress-bar-line);
    --swiper-pagination-bullet-active-color: var(--progress-bar-line);
    --swiper-pagination-bullet-inactive-opacity: 0.15;
    --swiper-pagination-bullet-horizontal-gap: 0;
  }
  &__pagination {
    display: flex;
    gap: 8px;
    width: 100%;
    bottom: 80px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 4px;
    flex-wrap: nowrap;
  }
  &__step {
    display: flex;
    flex-direction: column;
  }
  &_title {
    margin-bottom: 24px;
  }
  &__form {
    flex: 1 1 auto;
  }
  &__content {
    padding-bottom: 24px;
    &_text {
	  color: #6F7682;
	  &-no-wrap {
	    white-space: normal;
	    word-break: break-word;
	  }
    }
    &_link {
      --padding-top: 0;
      --padding-bottom: 0;
      --padding-start: 0;
      --padding-end: 0;
	  --color: #53B1FD;

      white-space: normal;
      word-break: break-word;
      font-size: inherit;
      line-height: inherit;
      letter-spacing: inherit;
      font-weight: inherit;
      margin-inline: 0;
      min-height: 0;
      &::part(native) {
        display: inline;
      }
	  &-confirm {
		--color: #53B1FD;
	    --border-radius: 0px 0px 0px 0px;
	  }
    }
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
