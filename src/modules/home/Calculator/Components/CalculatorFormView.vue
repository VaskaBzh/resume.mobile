<template>
  <div class="article-calculator-form">
    <main-head :title="$t('title_calc')" />
    <main-form class="calculator__form form form-buttons-down" @submit.prevent="isFullDataCalc = true">
      <template #list class="form__lists">
        <div class="form__lists">
          <main-input
              :placeholder="$t('placeholder_calc[0]')"
              :value="hashrateCalc"
              :name="'hashrate'"
              :end-text="'TH/s'"
              :label="$t('label_calc[0]')"
              class="input_calc"
              @changeValue="hashrateCalc = $event"
          />
          <main-input
              :placeholder="$t('placeholder_calc[1]')"
              :value="countWorkersCalc"
              :name="'hashrate'"
              :label="$t('label_calc[1]')"
              class="input_calc"
              @changeValue="countWorkersCalc = $event"
          />
          <main-input
              :placeholder="$t('placeholder_calc[2]')"
              :value="powerCalc"
              :name="'hashrate'"
              :end-text="'W'"
              :label="$t('label_calc[2]')"
              class="input_calc"
              @changeValue="powerCalc = $event"
          />
          <main-input
              :placeholder="$t('placeholder_calc[3]')"
              :value="costsCalc"
              :name="'hashrate'"
              :end-text="$t('unit_calc')"
              :label="$t('label_calc[3]')"
              class="input_calc"
              @changeValue="costsCalc = $event"
          />
        </div>
      </template>
      <template #content>

        <Transition>
          <div v-show="isFullDataCalc">
            <div class="segment-container">
              <ion-segment
                  :value="calculatorInterval"
                  @ionChange="calculatorInterval = $event.detail.value"
              >
                <ion-segment-button :value="1">
                  <ion-label>{{ $t('tab_calc[0]') }}</ion-label>
                </ion-segment-button>
                <ion-segment-button :value="24">
                  <ion-label>{{ $t('tab_calc[1]') }}</ion-label>
                </ion-segment-button>
                <ion-segment-button :value="720">
                  <ion-label>{{ $t('tab_calc[2]') }}</ion-label>
                </ion-segment-button>
              </ion-segment>
            </div>
            <div class="income-inf-card" >
              <info-row v-for="(card, index) in cardsIncome" :key="index" :bitcoin-value="card.btc">
                <template #title>{{ card.title }}</template>
              </info-row>
              <!--              <div class="card-content">-->
              <!--                <div class="one-item">-->
              <!--                  <p class="title-inf-card">{{ card.title }}</p>-->
              <!--                  <div class="content-inf-card">-->
              <!--                    <div>-->
              <!--                      <span class="count-data-btc">{{ card.btc }}</span>-->
              <!--                      <span class="count-title-btc"> BTC</span>-->
              <!--                    </div>-->
              <!--                    <p class="count-dara-ruble">{{ card.ruble }}</p>-->
              <!--                  </div>-->
              <!--                </div>-->
              <!--              </div>-->
            </div>
            <p class="approximate-calc">* {{ $t('text_calc') }}</p>
          </div>
        </Transition>
      </template>
      <template #buttons>
        <div class="button-calculate">
          <main-button
              class="calc-button"
              :no_preloader="true"
              :class="{disable: isEmptyDataCalc}"
              type="submit"
          >
            <template #text>
              {{$t('button_calc')}}
            </template>
          </main-button>
        </div>
      </template>
    </main-form>
    <!-- </ion-content>  -->
  </div>

</template>
<script setup>
import {IonLabel, IonSegment, IonSegmentButton} from '@ionic/vue';
import MainForm from "@/modules/form/Components/MainForm.vue";
import {ref, watch, computed, onMounted} from 'vue'
import {useI18n} from 'vue-i18n';
import MainButton from "@/modules/common/Components/UI/MainButton.vue";
import {HomeMessage} from "@/modules/home/lang/HomeMessage.js";
import {costsCalc, countWorkersCalc, hashrateCalc, powerCalc} from "@/modules/home/Calculator/calculator.js";
import MainInput from "@/modules/common/Components/UI/MainInput.vue";
import MainHead from "@/modules/common/Components/MainHead.vue";
import InfoRow from "@/modules/statistic/InfoRow.vue";
import {minerstats} from "@/modules/minerstats/store/MinerstatStore.js";

const { t } = useI18n({
  useScope: 'global',
  messages: HomeMessage
})

const isEmptyDataCalc = ref(true);
const isFullDataCalc = ref(false);

const calculatorInterval = ref(1);

function getProfit() {
  const seconds = 3600 * calculatorInterval.value;
  const btcComFee = 0.5;
  const allBtcFee = 3.5;
  const earnTime =
      (minerstats.value.networkDifficulty * Math.pow(2, 32)) /
      (hashrateCalc.value * (countWorkersCalc.value?.length > 0 ? countWorkersCalc.value : 0) * Math.pow(10, 12) * seconds);

  const total = minerstats.value.blockReward / earnTime;

  const totalWithFppsPercent = total + total * (minerstats.value.fppsRate / 100);

  return totalWithFppsPercent - totalWithFppsPercent * ((btcComFee + allBtcFee) / 100);
}

function getCost() {
  const kw = powerCalc.value / 1000;

  return (calculatorInterval.value * kw * costsCalc.value * (countWorkersCalc.value?.length > 0 ? countWorkersCalc.value : 0)) / minerstats.value.priceUsd;
}

const cardsIncome = computed(() => {
  const profit = getProfit();
  const cost = getCost();

  return [
    {
      title: t('card_title_calc[0]'),
      btc: profit,
    },
    {
      title: t('card_title_calc[1]'),
      btc: cost,
    }, {
      title: t('card_title_calc[2]'),
      btc: profit - cost,
    },
  ]
})

watch(()=> [hashrateCalc.value, powerCalc.value, costsCalc.value, countWorkersCalc.value], (newData)=> {
  if(!newData.includes(null)) {
    isEmptyDataCalc.value = false;
    isFullDataCalc.value = false;
  }
  if(newData.includes('')) {
    isEmptyDataCalc.value = true;
  }
})

onMounted(()=> {
  if(![hashrateCalc.value, powerCalc.value, costsCalc.value, countWorkersCalc.value].includes(null)) {
    isEmptyDataCalc.value = false;
    isFullDataCalc.value = false;
  }
  if([hashrateCalc.value, powerCalc.value, costsCalc.value, countWorkersCalc.value].includes('')) {
    isEmptyDataCalc.value = true;
  }
})
</script>
<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.calculator {
  &__form {
    flex: 1 1 auto;
  }
}

.article-calculator-form {
  min-height: 489px;
  width: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s linear;
}

.disable {
  pointer-events: none;
  opacity: .5;
}

.form__lists {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  gap: 12px;
}

.input_calc {
  width: 100%;
}

.calc-button {
  width: 100%;
}

.form:focus-within {
  transition: all 0.3s linear;
  // margin-bottom: 100px;
  overflow-y: hidden;
}

// .empty-container{
//   width: 100%;
//   height: 120px;
// }
.title-modal {
  padding: 24px 0 12px;
  position: sticky;
  background: var(--background-bg, #F9FAFB);
  z-index: 10;
}

.button-calculate {
  width: 100%;
  margin-top: 84px;
}

.segment-container {
  width: 100%;
}

ion-segment {
  padding: 2px 0px;
  border-radius: 10px;
  background: var(--gray-100);
}

ion-content {
  --background: inherit;
}

ion-segment-button.ios::part(indicator-background) {
  border-radius: 10px;
}

ion-segment-button::part(indicator-background) {
  background: var(--secondary-color-1);
}

.segment-button-checked.ios::part(native) {
  color: #2E90FA;
  font-weight: 600;
}

ion-segment-button.ios::part(native) {
  color: #98A2B3;
}

.income-inf-card {
  width: 100%;
  margin: 12px 0 8px 0;
  border-radius: 24px;
  background: var(--secondary-color-1);
  box-shadow: 2px 2px 4px -2px rgba(29, 41, 57, 0.05), 0px 4px 12px -4px rgba(29, 41, 57, 0.05);
  color: #F5FAFF;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
}

.one-item {
  width: 100%;
  margin-bottom: 10px;
}

.content-inf-card {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-inf-card {
  color: var(--gray-400, #6f7682);
  font-size: map-get($caption_2, "font-size");
  line-height: map-get($caption_2, "line-height");
  letter-spacing: map-get($caption_2, "letter-spacing");
}

.count-data-btc {
  color: var(--gray-700, #e2e4e6);
  font-weight: 400;
  font-size: map-get($headline, "font-size");
  line-height: map-get($headline, "line-height");
  letter-spacing: map-get($headline, "letter-spacing");
}

.count-title-btc {
  color: var(--gray-700, #e2e4e6);
  font-weight: 600;
  font-size: map-get($caption_2, "font-size");
  line-height: map-get($caption_2, "line-height");
  letter-spacing: map-get($caption_2, "letter-spacing");
}

.count-dara-ruble {
  color: var(--gray-300, #595e68);
  font-size: map-get($foot_note, "font-size");
  line-height: map-get($foot_note, "line-height");
  letter-spacing: map-get($foot_note, "letter-spacing");
}

.approximate-calc {
  color: var(--gray-400, #6f7682);
  font-size: map-get($caption_2, "font-size");
  line-height: map-get($caption_2, "line-height");
  letter-spacing: map-get($caption_2, "letter-spacing");
  font-family: SFProT, serif;
}

</style>