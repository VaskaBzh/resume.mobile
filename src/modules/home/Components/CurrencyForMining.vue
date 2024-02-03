<template>
  <article class="info-banner-card">
    <div class="btc-row-card">
      <div class="btc-block">
          <div class="svg-container-btc">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
            <rect y="0.5" width="32" height="32" rx="16" fill="#FFB868"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.2816 9.63499C20.76 9.87966 22.7034 10.6371 22.9189 12.8935C23.0651 14.5384 22.3716 15.5172 21.2248 16.0688C23.0763 16.5309 24.2024 17.6173 23.9697 20.0275C23.6864 23.0483 21.4264 23.833 18.1954 23.9985L18.2005 27.1173L16.2976 27.1197L16.2925 24.0009C16.0846 23.9979 15.8672 24.001 15.6442 24.0042C15.3462 24.0085 15.0382 24.0129 14.7296 24.003L14.7347 27.1217L12.8353 27.1242L12.8302 24.0054L9.02474 23.9302L9.34544 21.6509C9.34544 21.6509 10.7827 21.6826 10.756 21.6661C11.2852 21.6632 11.4422 21.2881 11.4813 21.0417L11.4718 16.0423L11.4868 12.484C11.4283 12.1131 11.176 11.6681 10.3981 11.6546C10.4404 11.6166 9.00482 11.6564 9.00482 11.6564L9 9.56681L12.8996 9.5618L12.8947 6.50692L14.8592 6.50439L14.8642 9.55928C15.2434 9.54877 15.6176 9.55178 15.9959 9.55481H15.9959L15.996 9.55482C16.1202 9.55581 16.2447 9.55681 16.3701 9.55734L16.3651 6.50246L18.2766 6.5L18.2816 9.63499ZM14.6296 15.3827L14.7261 15.3869C15.8826 15.4373 19.3118 15.5868 19.3171 13.5077C19.3118 11.5338 16.3933 11.5975 15.0373 11.6271C14.8771 11.6306 14.7388 11.6336 14.6296 11.6327V15.3827ZM14.7916 21.5066C14.7309 21.5041 14.6749 21.5018 14.6242 21.4999L14.6242 17.7499C14.745 17.751 14.8969 17.7491 15.0726 17.747C16.6752 17.727 20.2546 17.6824 20.2377 19.6724C20.2557 21.7307 16.2154 21.565 14.7916 21.5066Z" fill="white"/>
          </svg>
        </div>
        <div class="btc-bitcoin-title">
          <p class="btc-text">BTC</p>
          <p class="bitcoin-text">Bitcoin</p>
        </div>
      </div>

<!--      <div class="svg-container-schedule">-->
<!--        <svg xmlns="http://www.w3.org/2000/svg" width="58" height="25" viewBox="0 0 58 25" fill="none">-->
<!--          <path d="M1 24L6.97561 15.801C8.02536 14.3606 10.092 14.1477 11.4133 15.3438L13.8238 17.5258C14.8749 18.4772 16.4484 18.563 17.5966 17.7315L23.9851 13.1053L30.5854 7.25747C31.6256 6.33582 33.1627 6.24932 34.2998 7.04845L38.2482 9.82335C38.4894 9.99282 38.7042 10.1969 38.8859 10.429L43.0712 15.7775C44.3558 17.4191 46.8817 17.2826 47.9819 15.5122L57 1" stroke="#32D583"/>-->
<!--        </svg>-->
<!--      </div>-->
      <div class="counter-block">
        <p class="counter-dollar">${{ minerstats.priceUsd }}</p>
<!--        <p class="counter-percent">+1,49%</p>-->
      </div>
    </div>

    <div class="inf-row-card">
      <div class="info-block">
        <p class="currency-number">{{ ((minerstats.networkDifficulty ?? 1) * 0.000000000001).toFixed(2) }} T</p>
        <p class="currency-text">{{ $t("currency_for_mining.title[0]") }}</p>
        <p class="currency-text">{{ $t("currency_for_mining.title[1]") }}</p>
      </div>
      <div class="gray-line"></div>

      <div class="info-block">
        <div class="expected-percentage">
          <p class="currency-number">{{ Number(minerstats.blockReward).toFixed(2) ?? 1 }} BTC</p>
        </div>
        <p class="currency-text">{{ $t("currency_for_mining.title[0]") }}</p>
        <p class="currency-text">{{ $t("currency_for_mining.title[2]") }}</p>
      </div>
      <div class="gray-line"></div>

      <div class="info-block">
        <p class="currency-number">{{ 'FPPS+' }}</p>
        <p class="currency-text">{{ $t("currency_for_mining.title[4]") }}</p>
        <p class="currency-text">{{ $t("currency_for_mining.title[5]") }}</p>
      </div>
    </div>
  </article>
</template>
<script setup>

import {HomeMessage} from "@/modules/home/lang/HomeMessage.js";
import { useI18n } from 'vue-i18n';
import { minerStatistic } from "@/modules/home/Service/HomeService.js";
import {currencyRubble} from "../../currencies/store/CurrencyStore.js";
import {onMounted} from "vue";
import {getCurrencies} from "@/modules/currencies/services/CurrencyService.js";
import {minerstats} from "../../minerstats/store/MinerstatStore.js";


const { t } = useI18n({
  useScope: 'global',
  messages: HomeMessage
})

onMounted(async ()=> {
  await getCurrencies()
})

</script>
<style scoped lang="scss">
.info-banner-card{
  display: flex;
  padding: 16px;
  margin-bottom: 8px;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
  font-family: SFProT, sans-serif;
  align-self: stretch;
  border-radius: 20px;

  background: var(--secondary-color-1);
  box-shadow: 2px 2px 4px -2px rgba(29, 41, 57, 0.05), 0px 4px 12px -4px rgba(29, 41, 57, 0.05);
}
.hashrate-card{
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  border-radius: 12px;
  background: var(--secondary-color-1, #FFF);
  box-shadow: 2px 2px 4px -2px rgba(29, 41, 57, 0.05), 0px 4px 12px -4px rgba(29, 41, 57, 0.05);
}
.info-block {
	min-width: 87px;
}
.btc-row-card{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.btc-block{
  display: flex;
  gap:8px;
}
.btc-text{
  color: var(--gray-700, #344054);
  font-size: map-get($headline, "font-size");
  line-height:  map-get($headline, "line-height");
  letter-spacing: map-get($headline, "letter-spacing");
  font-weight: 400;
}
.bitcoin-text{
  color: var(--gray-400, #98A2B3);
  font-size: map-get($caption_2, "font-size");
  line-height:  map-get($caption_2, "line-height");
  letter-spacing: map-get($caption_2, "letter-spacing");
}
.counter-dollar{
  color: var(--gray-700, #344054);
  font-weight: 600;
  font-size: map-get($headline, "font-size");
  line-height:  map-get($headline, "line-height");
  letter-spacing: map-get($headline, "letter-spacing");
}
.counter-percent{
  color: #32D583;
  text-align: right;
  font-size: map-get($caption_2, "font-size");
  line-height:  map-get($caption_2, "line-height");
  letter-spacing: map-get($caption_2, "letter-spacing");
}
.currency-number{
  color: var(--gray-700, #344054);
  font-weight: 500;
  margin-bottom: 4px;
  font-family: SFProT, sans-serif;
  font-size: map-get($caption_1, "font-size");
  line-height:  map-get($caption_1, "line-height");
}
.currency-text{
  color: var(--gray-500, #667085);
  font-size: 10px;
  font-weight: 400;
  line-height: 13px; /* 130% */
  letter-spacing: 0.066px;
}
.gray-line{
  width: 1px;
  height: 26px;
  background: var(--gray-200, #E4E7EC);
}
.last-line{
  margin-top: 4px;
}
.inf-row-card{
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}
.currency-percent{
  color: var(--gray-500, #667085);
  font-size: map-get($caption_1, "font-size");
  line-height:  map-get($caption_1, "line-height");
  padding-left: 4px;
}
.expected-percentage{
  display: flex;
  width: 100%;
  flex: 1 0 0;
}
.network-hashrate{
  display: flex;
  gap:16px;
  width: 50%;
}

</style>