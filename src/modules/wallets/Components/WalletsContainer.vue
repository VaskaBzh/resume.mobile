<template>
  <page-container class="wallet">
    <main-loader class="wallet__wrapper">
      <article class="wallet__block" v-if="isWallet">
        <div class="payout-setting-block">
          <main-head :title="$t('auto_payout.title[0]')" />
          <main-alert
              class="wallet__alert"
              :buttons="[$t('auto_payout.wallet.alert.button')]"
              :header="$t('auto_payout.wallet.alert.title')"
              :message="$t('auto_payout.wallet.alert.text')"
              id="wallet_alert_1"
          />
          <Transition name="slide-fade">
            <div class="autopayout-minimal">
              <main-label class="wallet_label">{{ $t('auto_payout.label') }}</main-label>
              <div class="autopayout-card-container">
                <span>{{ 0.005 }}</span>
                <span class="btc-text-static">BTC</span>
              </div>
            </div>
          </Transition>
        </div>
        <div class="autopayout-minimal">
          <main-label class="wallet_label">{{ $t('accrual_card.label[4]') }}</main-label>
          <div class="autopayout-card-container">
            <span>{{ currentWallet.wallet }}</span>
          </div>
        </div>
        <main-button
            class="wallet_button"
            fill="clear"
            no_preloader
            @click="isOpenChangeModal = true"
        >
          <template #text>
            {{ $t('auto_payout.wallet.change.change_button') }}
          </template>
        </main-button>
      </article>
      <empty-card
          v-else
          :image="empty_wallet"
          :text="$t('auto_payout.wallet.add.empty_text')"
          :button_text="$t('auto_payout.wallet.add.title')"
          @clicked="isOpenAddModal = true"
      />
    </main-loader>
    <main-modal
        ref="modal"
        :isOpen="isOpenAddModal"
        @ionModalWillPresent="isOpenAddModal = true;"
        @ionModalWillDismiss="isOpenAddModal = false; newWalletUser.form.confirmation_code = ''; newWalletUser.form.wallet_address = ''"
    >
      <swiper
          :slides-per-view="1"
          :space-between="15"
          class="wallet__steps"
          :allowTouchMove="false"
          autoHeight
          @swiper="swiperInit"
      >
        <swiper-slide>
          <div class="wallet__step">
            <main-head
                :title="$t('auto_payout.wallet.add.title')"
            />
            <main-form
                class="wallet__form form-content-down"
                @submit.prevent="
                sendLetterForWallet(swiperData);
              "
            >
              <template #list>
                <main-input
                    :value="newWalletUser.form.wallet_address"
                    :label="$t('auto_payout.wallet.add.label[1]')"
                    :placeholder="$t('auto_payout.wallet.placeholder')"
                    name="wallet_address"
                    @changeValue="newWalletUser.form.wallet_address = $event"
                />
              </template>
              <template #content>
                <div class="connection-warning">
                  <main-icon :icon="warning_mark" class="warning_icon"/>
                  <p class="warning__text">{{ $t('auto_payout.wallet.warning_text') }}</p>
                </div>
              </template>
              <template #buttons>
                <main-button
                    class="wallet-change button--full"
                    type="submit"
                >
                  <template #text>
                    {{
		              $t('auto_payout.wallet.add.title')
                    }}
                  </template>
                </main-button>
              </template>
            </main-form>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="wallet__step">
            <main-head
                :title="$t('auto_payout.wallet.add.title')"
                :text="$t('auto_payout.wallet.add.code_text')"
            />
            <main-form class="wallet__form form-buttons-down" @submit.prevent="sendLetterForWallet(swiperData)">
              <template #list>
                <input-code
                    :code_length="5"
                    :value="newWalletUser.form.confirmation_code"
                    @change-value="newWalletUser.form.confirmation_code = $event"
                    name="confirmation_code"
                />
                <div>
                  <verify-link :verify-url="`/send/code/${user.id}`" :verify-text="$t('auto_payout.wallet.change.send[0]')"/>
                </div>
              </template>
              <template #buttons>
                <main-button
                    no_preloader
                    class="wallet-change button--full"
                    fill="clear"
                    @click="
                      swiperData.slidePrev();
                      newWalletUser.form.confirmation_code = ''
                    "
                  >
                  <template #text>
                    {{ $t('auto_payout.wallet.change.prev_button') }}
                  </template>
                </main-button>
                <main-button
                    class="wallet-change button--full"
                    type="submit"
                >
                  <template #text>
                    {{ $t('auto_payout.wallet.add.title')  }}
                  </template>
                </main-button>
              </template>
            </main-form>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="wallet__step wallet__step-last">
            <success-card
                :button_text="$t('auto_payout.wallet.change.close_button')"
                :text="$t('auto_payout.wallet.successful.text[1]')"
                :title="$t('auto_payout.wallet.successful.title')"
                @confirm="
	                isOpenAddModal = false;
	                newWalletUser.form.wallet_address = '';
	                newWalletUser.form.confirmation_code = ''
	              "
            />
          </div>
        </swiper-slide>
      </swiper>
    </main-modal>
    <main-modal
        :isOpen="isOpenChangeModal"
        @ionModalWillPresent="isOpenChangeModal = true;"
        @ionModalWillDismiss="isOpenChangeModal = false; startVerify = false; newWalletUser.form.confirmation_code = ''; newWalletUser.form.wallet_address = ''"
    >
      <swiper
          :slides-per-view="1"
          :space-between="15"
          class="wallet__steps"
          :allowTouchMove="false"
          autoHeight
          @swiper="swiperInit"
      >
        <swiper-slide>
          <div class="wallet__step">
            <main-head
                :title="
                !isWallet ?
                  $t('auto_payout.wallet.add.title'):
                  $t('auto_payout.wallet.change.title')
              "
            />
            <main-form
                class="wallet__form form-content-down"
                @submit.prevent="
	              sendLetterForWallet(swiperData);
	            "
            >
              <template #list>
                <main-input
                    :value="newWalletUser.form.wallet_address"
                    :label="$t('auto_payout.wallet.add.label[1]')"
                    :placeholder="$t('auto_payout.wallet.placeholder')"
                    name="wallet_address"
                    @changeValue="newWalletUser.form.wallet_address = $event"
                />
              </template>
              <template #content>
                <div class="connection-warning">
                  <main-icon :icon="warning_mark" class="warning_icon"/>
                  <p class="warning__text">{{ $t('auto_payout.wallet.warning_text') }}</p>
                </div>
              </template>
              <template #buttons>
                <main-button
                    class="wallet-change button--full"
                    type="submit"
                    @click="startVerify = true"
                >
                  <template #text>
                    {{
                      !isWallet ?
                          $t('auto_payout.wallet.add.title') :
                          $t('auto_payout.wallet.change.change_button')
                    }}
                  </template>
                </main-button>
              </template>
            </main-form>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="wallet__step">
            <main-head
                :title="!isWallet ? $t('auto_payout.wallet.add.title'):$t('auto_payout.wallet.change.title')"
                :text="$t('auto_payout.wallet.add.code_text')"
            />
            <main-form class="wallet__form form-buttons-down" @submit.prevent="openChangeSuccessCard(); sendLetterForWallet(swiperData)">
              <template #list>
                <input-code
                    :code_length="5"
                    :value="newWalletUser.form.confirmation_code"
                    @change-value="newWalletUser.form.confirmation_code = $event"
                    name="confirmation_code"
                />
                <div>
                  <verify-link :verify-url="`/send/code/${user.id}`" :verify-text="$t('auto_payout.wallet.change.send[0]')"/>
                </div>
              </template>
              <template #buttons>
                <main-button
                    no_preloader
                    class="wallet-change button--full"
                    fill="clear"
                    @click="
                     startVerify = false;
                      swiperData.slidePrev();
                      newWalletUser.form.confirmation_code = '';
                    "
                  >
                  <template #text>
                    {{ $t('auto_payout.wallet.change.prev_button') }}
                  </template>
                </main-button>
                <main-button
                    class="wallet-change button--full"
                    type="submit"
                >
                  <template #text>
                    {{ isWallet ? $t('auto_payout.wallet.change.change_button') : $t('auto_payout.wallet.add.title')  }}
                  </template>
                </main-button>
              </template>
            </main-form>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="wallet__step wallet__step-last">
            <success-card
              :button_text="$t('auto_payout.wallet.change.close_button')"
              :text="$t('auto_payout.wallet.successful.text[0]')"
              :title="$t('auto_payout.wallet.successful.title')"
              @confirm="
	            isOpenChangeModal = false;
	            newWalletUser.form.wallet_address = '';
	            newWalletUser.form.confirmation_code = ''
              "
            />
          </div>
        </swiper-slide>
      </swiper>
    </main-modal>
  </page-container>
</template>

<script setup>
import { IncomeMessage } from "@/modules/income/Lang/IncomeMessage.js";
import { useI18n } from "vue-i18n";
import {
  currentWallet,
  sendLetterForWallet,
  newWalletUser,
  changeWalletAddress,
  getSubWallet,
  isWallet
} from "@/modules/Wallet/walletService.js";
import { Swiper, SwiperSlide } from "swiper/vue";
import { activeId } from "@/modules/common/store/SubStore.js";
import { watch, ref } from "vue";
import { useRoute } from "vue-router";

import MainAlert from "@/modules/common/Components/UI/MainAlert.vue";
import EmptyCard from "@/modules/common/Components/EmptyCard.vue";
import empty_wallet from "@img/Crypto_Wallet.png";
import MainLoader from "@/modules/preloader/Components/MainLoader.vue";
import MainHead from "@/modules/common/Components/MainHead.vue";
import MainInput from "@/modules/common/Components/UI/MainInput.vue";
import MainForm from "@/modules/form/Components/MainForm.vue";
import MainModal from "@/modules/modal/Components/MainModal.vue";
import MainButton from "@/modules/common/Components/UI/MainButton.vue";
import warning_mark from "@icon/warning-mark.svg";
import MainIcon from "@/modules/common/Components/UI/MainIcon.vue";
import SuccessCard from "@/modules/common/Components/SuccessCard.vue";
import PageContainer from "@/modules/common/Components/PageContainer.vue";
import InputCode from "@/modules/common/Components/UI/InputCode.vue";
import MainLabel from "@/modules/common/Components/UI/MainLabel.vue";
import { user } from "@/modules/user/UserService.js";
import VerifyLink from "@/modules/verify/Components/UI/VerifyLink.vue";

useI18n({
  useScope: 'global',
  messages: IncomeMessage,
})


const isOpenChangeModal = ref(false)
const isOpenAddModal = ref(false)

const startVerify = ref(false)

const swiperData = ref(null);

function swiperInit(swiper) {
  swiperData.value = swiper;
}

async function openChangeSuccessCard() {
	await changeWalletAddress(swiperData.value)
}

const route = useRoute();

watch(() => activeId.value, async ()=> {
  if (route.name === "wallets") {
    await getSubWallet()
  }
})
</script>

<style scoped lang="scss">
.wallet {
	flex: 1 1 auto;
  &__wrapper {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
  }
  &__block {
	  flex: 1 1 auto;
  }

  &__step {
    display: flex;
    flex-direction: column;
    &:not(&-last) {
      height: 400px;
    }
  }
  &__form {
    flex: 1 1 auto;
  }
  &__alert {
    position: absolute;
    right: 0;
    top: 8px;
  }
  &_button {
    --padding-top: 8px;
    --padding-bottom: 8px;
    --padding-start: 12px;
    --padding-end: 0;

    box-shadow: none;
    color: var(--primary-400, #53B1FD);
    font-feature-settings: 'case' on;
    font-family: SFProT, serif;
    font-weight: 400;
    letter-spacing: map-get($sub_headline, "letter-spacing");
    font-size: map-get($sub_headline, "font-size");
    line-height: map-get($sub_headline, "line-height");
    min-height: 0;
  }
}
.change_wallet {
  background: transparent;
  width: auto;
  align-self: baseline;
  box-shadow: unset;
  color: var(--Primary-400, #53B1FD);
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

h3,
h1 {
  color: var(--secondary-color-2);
  font-weight: 700;
}

.payout-setting-block {
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
  align-items: center;
  position: relative;
}

.autopayout-minimal {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.autopayout-title {
  margin-top: 0;
  margin-bottom: 0;
  width: 85%;
}

.autopayout-tooltip {
  width: 100%;
  top: 2px;
  left: 0;
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  background: var(--background-tooltip);
  padding: 12px;
  color: var(--gray-600);
  font-size: map-get($caption_1, "font-size");
  line-height: map-get($caption_1, "line-height");
}

.title-card, .label {
  color: var(--gray-400, #98A2B3);
  font-size: map-get($caption_1, "font-size");
  line-height: map-get($caption_1, "line-height");
  padding-left: 12px;
}

.button-svg {
  border: none;
  background-color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4px;
  padding: 10px;
}

.input-worker {
  height: 48px;
  width: 100%;
  border: none;
  align-self: stretch;
  border-radius: 12px;
  background: var(--secondary-color-1);
  margin-top: 4px;
  padding: 0px 12px;
  box-shadow: 1px 1px 6px -2px rgba(29, 41, 57, 0.05);
}

input {
  outline: none;
}

.input-worker::placeholder {
  color: var(--gray-300);
  font-weight: 400;
  font-size: map-get($callout, "font-size");
  line-height: map-get($callout, "line-height");
  letter-spacing: map-get($callout, "letter-spacing");
}

.autopayout-card-container {
  border-radius: 12px;
  background: var(--secondary-color-1, #212327);
  display: flex;
  padding: 0 12px;
  justify-content: space-between;
  align-items: center;
  min-height: 48px;
  box-shadow: 1px 2px 4px -2px rgba(29, 29, 29, 0.10);
  color: var(--gray-400, #6F7682);;
  font-weight: 400;
  font-family: SFProT, serif;
  letter-spacing: map-get($sub_headline, "letter-spacing");
  font-size: map-get($sub_headline, "font-size");
  line-height: map-get($sub_headline, "line-height");
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 8px;
  }
}

.btc-text-static {
  color: var(--gray-400);
  font-size: map-get($foot_note, "font-size");
  line-height: map-get($foot_note, "line-height");
  letter-spacing: map-get($foot_note, "letter-spacing");
}

.title-wallets {
  margin: 24px 0 16px;
}

.add-wallet {
  border: none;
  background: var(--secondary-color-1);
  border-radius: 100px;
  padding: 10px;
  box-shadow: 1px 1px 6px -2px rgba(29, 41, 57, 0.05);
}

.add-wallet-container {
  display: flex;
  justify-content: center;
  margin: 16px 0;
}

.input-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.add-wallet-modal-card {
  height: 60vh;
  background: var(--background-bg);
  border-radius: 28px 28px 0px 0px;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  gap: 16px;
  transition: all 0.3s linear;
}

.add-wallet-modal-card_input {
  display: flex;
  flex-direction: column;
  padding: 12px 16px 40px;
  gap: 16px;
  transition: all 0.3s linear;
}

.min-threshold-modal-card {
  margin-top: 12px;
  padding: 12px 16px 40px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.add-wallet-modal-card:focus-within {
  height: 90vh;
  transition: all 0.3s linear;
}

.add-wallet-modal-card .blue-button {
  margin-top: auto;
}

.check-input {
  display: none;
}

input:focus + span {
  display: inline;
  padding-left: 0;
}

.close-modal {
  /* width: 36px;
  height: 5px; */
  /* flex-shrink: 0;
  border-radius: 5px; */
  /* background: var(--gray-300, #D0D5DD); */
  position: absolute;
  top: 8px;
  right: 8px;
  /* left: calc((100vw - 36px) / 2) */
}

.min-threshold-button {
  color: var(--secondary-color-2);
  height: 56px;
  font-style: normal;
  font-weight: 600;
  font-size: map-get($callout, "font-size");
  line-height: map-get($callout, "line-height");
  letter-spacing: map-get($callout, "letter-spacing");
  border-radius: 16px;
  background: var(--secondary-color-1);
  box-shadow: 2px 2px 4px -2px rgba(29, 41, 57, 0.05), 0px 4px 12px -4px rgba(29, 41, 57, 0.05);
}

.triangle-svg {
  position: absolute;
  right: -8px;
  top: 20%;

}

.empty-article {
  width: 100%;
  border-radius: 24px;
  padding: 16px;
  background: var(--secondary-color-1);
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 4px -2px rgba(29, 41, 57, 0.05), 0px 4px 12px -4px rgba(29, 41, 57, 0.05);
}

.empty-text {
  color: var(--gray-400);
  text-align: center;
  font-size: map-get($sub_headline, "font-size");
  line-height: map-get($sub_headline, "line-height");
  letter-spacing: map-get($sub_headline, "letter-spacing");
}

.empty-button {
  color: var(--primary-25, #F5FAFF);
  font-weight: 600;
  font-size: map-get($callout, "font-size");
  line-height: map-get($callout, "line-height");
  letter-spacing: map-get($callout, "letter-spacing");
  padding: 16px 0;
  border-radius: 16px;
  margin-top: 52px;
  background: var(--primary-500);
  box-shadow: 2px 2px 4px -2px rgba(29, 41, 57, 0.05), 0px 4px 12px -4px rgba(29, 41, 57, 0.05);
}

.empty-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.empty-content img {
  max-width: 112px;
}

ion-input.custom {
  --border-radius: 12px;
  --background: #FFF;
  --box-shadow: 1px 2px 4px -2px rgba(184, 194, 208, 0.10);
  --color: rgba(29, 41, 57, 0.80);
  --placeholder-opacity: 0.8;
  --padding-bottom: 10px;
  --padding-end: 10px;
  --padding-start: 10px;
  --padding-top: 10px;
  --placeholder-color: 1px 2px 4px -2px rgba(184, 194, 208, 0.10);
}

.connection_inputs:not(:first-child) {
  margin-top: 16px;
}

.connection_label {
  display: inline-block;
  padding: 0 0 4px 12px;
  font-family: SFProT, serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.078px;
}

.warning_icon {
  width: 24px;
  min-width: 24px;
  height: 24px;
}

.connection-warning {
  display: flex;
  flex-flow: row nowrap;
  gap: 12px;
  align-items: center;
  border-radius: 20px;
  background: var(--background-orange, #37322D);
  padding: 16px;
}

.warning__text {
  color: var(--secondary-orange, #FFB319);
  font-family: SFProT, serif;
  font-size: map-get($foot_note, "font-size");
  line-height: map-get($foot_note, "line-height");
  letter-spacing: map-get($foot_note, "letter-spacing");
}
</style>