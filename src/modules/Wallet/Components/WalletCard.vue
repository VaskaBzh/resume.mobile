<template>
  <div class="wallet-card" id="openChangeWallet" v-if="isWallet">
    <img src="../assets/images/wallet-icon.png">
    <div class="wallet-data">
        <span class="title-card">{{ currentWallet.name }}</span>
        <p class="wallet-address">{{ currentWallet.wallet }}</p>
    </div>
  </div>

  <teleport to="body">
    <DraggableModal trigger-id="openChangeWallet">
    <div class="card-wallet-option" v-if="!changeWallet">
      <h1 class="card-wallet-title">Main wallet</h1>
      <BlueButton @click="changeWallet = !changeWallet">
        {{ $t('auto_payout.wallet.button[0]') }}
        </BlueButton>
      <button class="delete-button" id="present-alert">{{ $t('auto_payout.wallet.button[1]') }}</button>
        <ion-alert
          trigger="present-alert"
          class="custom-alert"
          header="Удалить кошелек"
          :buttons="alertButtons"
          @didDismiss="setResult($event)"
        >
        </ion-alert>
    </div>
    <div class="card-wallet-option" v-else>
      <h3 class="edit-modal-title">{{ $t('auto_payout.wallet.change.title') }}</h3>
      <div class="input-container">
      <label class="label">{{ $t('auto_payout.wallet.change.label') }}</label>
      <input type="text" v-model="newNameWallet.name">
      <div class="button-container">
        <main-button @click="changeWalletName">
          <template #text>
            {{ $t('auto_payout.wallet.change.button') }}
          </template>
        </main-button>
      </div>
    </div>
    </div>
  </DraggableModal>
  </teleport>

</template>
<script setup>
  import { IonButton, IonAlert } from '@ionic/vue';
  import {onMounted, ref, watch} from 'vue'
  import { defineProps } from 'vue';
  import DraggableModal from '../../Draggable/Components/DraggableModal.vue';
  import { openModal, isOpenAddWalletEdit } from '../../Draggable/draggableService';
  import { useI18n } from 'vue-i18n';
  import { user } from "@/modules/user/UserService.js";
  import {currentSub} from "@/modules/Subaccaunt/subaccaunts.js";
  import {
    changeWalletName,
    currentWallet,
    isWallet,
    newNameWallet,
  } from "@/modules/Wallet/walletService.js";
  import MainButton from "@/modules/common/Components/UI/MainButton.vue";

  const { t } = useI18n({
    useScope: 'global',
  })
  // const props = defineProps(['currentCardIndex', 'index'])
  const changeWallet = ref(false)
  const handlerMessage = ref('');
  const roleMessage = ref('');

  const alertButtons = [
    {
      text: t('auto_payout.wallet.delete.button[0]'),
      role: 'cancel',
      handler: () => {
        handlerMessage.value = 'Alert canceled';
      },
    },
    {
      text: t('auto_payout.wallet.delete.button[1]'),
      role: 'confirm',
      cssClass: 'alert-button-confirm',
      handler: () => {
        handlerMessage.value = 'Alert confirmed';
      },
    },
  ];

  const setResult = (ev) => {
    roleMessage.value = `Dismissed with role: ${ev.detail.role}`;
  };
</script>
<style scoped lang="scss">
.wallet-card{
  display: flex;
  position: relative;
  margin-bottom: 8px;
  padding: 16px;
  gap: 12px;
  align-items: center;
  align-self: stretch;
  border-radius: 16px;
  background: var( --secondary-color-1);
  box-shadow: 2px 2px 4px -2px rgba(29, 41, 57, 0.05), 0px 4px 12px -4px rgba(29, 41, 57, 0.05);
}
.wallet-data{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.title-card{
  color: var( --gray-700);
  font-weight: 600;
  letter-spacing: -0.5px;
  font-size: map-get($sub_headline, "font-size");
  line-height:  map-get($sub_headline, "line-height");
}
.wallet-address{
  color: #98A2B3;
  font-size: map-get($foot_note, "font-size");
  line-height:  map-get($foot_note, "line-height");
  letter-spacing: map-get($foot_note, "letter-spacing");
  word-break: break-all;
}
.edit-modal-title{
  margin-bottom: 24px;
}
  .delete-button{
  margin-top: 8px;
  width: 100%;
  height: 56px;
  padding: 16px;
  align-self: stretch;
  border-radius: 16px;
  background:var( --secondary-color-1);
  box-shadow: 2px 2px 4px -2px rgba(29, 41, 57, 0.05), 0px 4px 12px -4px rgba(29, 41, 57, 0.05);
  color:rgba(255, 59, 48, 1);
  font-style: normal;
  font-weight: 600;
  font-size: map-get($callout, "font-size");
  line-height:  map-get($callout, "line-height");
  letter-spacing: map-get($callout, "letter-spacing");
}
.card-wallet-option{
  padding: 12px 16px 40px; 
  background: var( --background-bg);
  border-radius: 28px 28px 0px 0px;
  transition: all 0.3s linear;
  height: 35vh;
}
.card-wallet-option:focus-within{
  height: 72vh;
  transition: all 0.3s linear;
}
.card-wallet-title{
  margin-bottom: 24px;
  color: var(--secondary-color-2);
}  
.button-container{
  margin-top: 56px;
}
/* Почему то не работает */
button.alert-button.alert-button-confirm {
    background-color: var(--ion-color-success);
    color: var(--ion-color-success-contrast);
  }
.alert-button-confirm{
    color: red; 
}
input{
  height: 48px;
  width: 100%;
  border: none;
  align-self: stretch;
  border-radius: 12px;
  background: var( --secondary-color-1);
  margin-top: 4px;
  padding: 0px 12px;
  box-shadow: 1px 1px 6px -2px rgba(29, 41, 57, 0.05);
}
.label{
  color: var(--gray-400, #98A2B3);
  font-size: map-get($caption_1, "font-size");
  line-height: map-get($caption_1, "line-height");
  padding-left: 16px;
}
</style>