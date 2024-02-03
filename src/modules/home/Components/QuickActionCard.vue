<template>
  <swiper
	  class="card__swiper"
    :modules="modules"
    slides-per-view="auto"
    :horizontal="true"
    :space-between="8"
    :pagination="{ clickable: true, dynamicBullets: true }"
  >
    <swiper-slide v-if="user?.has_referrer_role" @click="router.push('referral_cabinet')">
      <div class="card-container">
        <p class="card-title">{{ $t('quick_action[2]') }}</p>
        <div class="img-png">
          <ion-img :src="ref_img" alt="referral_program" />
        </div>
      </div>
    </swiper-slide>
    <swiper-slide @click="router.push('watcher')">
      <div class="card-container">
        <p class="card-title">{{ $t('quick_action[0]') }}</p> 
        <div class="img-png">
          <ion-img :src="watcher_img" alt="watchers" />
        </div>
      </div>
    </swiper-slide>
    <swiper-slide id="openCalc">
      <div class="card-container">
        <p class="card-title">{{ $t('quick_action[1]') }}</p> 
        <div class="img-png">
          <ion-img :src="calculator_img" alt="calculator" />
        </div>
      </div>
    </swiper-slide>
    <swiper-slide @click="telegramRedirect">
      <div class="card-container">
        <p class="card-title">{{ $t('quick_action[3]') }}</p> 
        <div class="img-png">
          <ion-img :src="help_img" alt="help" />
        </div>
      </div>
    </swiper-slide>
    <swiper-slide @click="faqRedirect">
      <div class="card-container">
        <p class="card-title">FAQ</p> 
        <div class="img-png">
          <ion-img :src="faq_img" alt="faq" />
        </div>
      </div>
    </swiper-slide>
  </swiper>
  <main-modal trigger-id="openCalc">
    <calculator-form-view />
  </main-modal>
</template>
<script setup>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Pagination } from "swiper";
  import { HomeMessage } from "@/modules/home/lang/HomeMessage.js";
  import { useI18n } from 'vue-i18n';
  import { IonImg } from "@ionic/vue";

  import 'swiper/css';
  import 'swiper/css/autoplay';
  import 'swiper/css/keyboard';
  import 'swiper/css/pagination';
  import 'swiper/css/scrollbar';
  import 'swiper/css/zoom';
  import '@ionic/vue/css/ionic-swiper.css';
  import CalculatorFormView from "@/modules/home/Calculator/Components/CalculatorFormView.vue";
  import router from "@/router/index.js";
  import MainModal from "@/modules/modal/Components/MainModal.vue";
  import ref_img from "@img/ref.png";
  import watcher_img from "@img/observer.png";
  import calculator_img from "@img/calculator.png";
  import help_img from "@img/communication.png";
  import faq_img from "@img/faq.png";
  import {user} from "@/modules/user/UserService.js";

    const { t } = useI18n({
        useScope: 'global',
        messages: HomeMessage
  });
  const modules = [Pagination];

  function faqRedirect() {
    window.location.href = 'https://all-btc.com/faq/description';
  }
  function telegramRedirect() {
    window.location.href = 'https://t.me/allbtc_support'
  }
</script>
<style scoped lang="scss">
ion-button{
  --background: inherit;
  width: auto;
}
.card-container{
  width: 88px;
  height: 88px;
  border-radius: 12px;
  background: var(--secondary-color-1, #212327);
  filter: drop-shadow(1px 2px 4px rgba(29, 29, 29, 0.10));
  position: relative;
  overflow: hidden;
  padding: 6px;
}
.img-png{
  width: 65px;
  height: 65px;
  position: absolute;
  bottom: -7px;
  right: 0;
}
.swiper{
  width: calc(100% + 32px);
  padding: 0 16px;
  margin: 0 -16px;
  position: relative;
}
.card-title{
  color: var(--gray-700, #E2E4E6);
  text-align: left;
  font-size: map-get($caption_2, "font-size");
  line-height:  map-get($caption_2, "line-height");
  letter-spacing: map-get($caption_2, "letter-spacing");
}
.swiper-slide{
  width: fit-content;
}
.calc-modal-container:focus-within{
  transition: all 0.3s linear;
}
</style>