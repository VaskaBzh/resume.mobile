<template>
  <div class="container-row">
    <div class="data-row">
      <p class="title-row"><slot name="title"></slot></p>
      <div class="info_value">
        <span class="num-row">{{ bitcoinValue.toFixed(8) }}</span>
        <span class="btc"> BTC </span>
      </div>
    </div>
    <div class="convertor-row">
      <span>{{ '&asymp;'+ ' $' }}{{ usdValue ? usdValue.toFixed(2) : 0 }}</span>
      <span v-if="$i18n.locale === 'ru'">{{ '&asymp;'+ ' &#8381' }}{{ rubbleValue ? rubbleValue.toFixed(2) : 0 }}</span>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import { minerstats } from "@/modules/minerstats/store/MinerstatStore.js";
import { currencyRubble } from "@/modules/currencies/store/CurrencyStore.js";

const props = defineProps({
  bitcoinValue: {
    type: Number,
    default: 0,
  }
})

const rubbleValue = ref(0);
const usdValue = ref(0);

function converterProcess() {
  if (minerstats.value.priceUsd) {
    usdValue.value = props.bitcoinValue * minerstats.value.priceUsd;
  }
  if (currencyRubble.value) {
    rubbleValue.value = usdValue.value * currencyRubble.value;
  }
}

watch(() => currencyRubble.value, () => {
  converterProcess();
})

watch(() => minerstats.value.priceUsd, () => {
  converterProcess();
})

watch(() => props.bitcoinValue, () => {
  converterProcess();
})

onMounted(() => {
  converterProcess();
})
</script>
<style scoped lang="scss">
.info {
  &_value {
    display: flex;
    align-items: flex-end;
    gap: 4px;
  }
}
.container-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  font-family: SFProT, serif;
}
.data-row {
  display: flex;
  flex-direction: column;
  width: fit-content;
  gap: 2px;
}
.title-row {
  color: var(--gray-400, #6F7682);
  font-weight: 400;
  font-family: SFProT, serif;
  font-size: map-get($caption_2, "font-size");
  line-height:  map-get($caption_2, "line-height");
  letter-spacing: map-get($caption_2, "letter-spacing");
  width: 100%;
}
.num-row {
  color: var(--gray-80080, rgba(241, 241, 242, 0.80));
  font-family: SFProD, serif;
  font-weight: 600;
  font-size: map-get($title_3, "font-size");
  line-height:  map-get($title_3, "line-height");
  letter-spacing: map-get($title_3, "letter-spacing");
}
.convertor-row{
  color: var(--gray-300, #595E68);
  text-align: right;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-size: map-get($caption_1, "font-size");
  line-height:  map-get($caption_1, "line-height");
  letter-spacing: map-get($caption_1, "letter-spacing");
  margin-left: auto;
}
.btc{
  color: var(--gray-300, #595E68);
  font-weight: 400;
  font-size: map-get($sub_headline, "font-size");
  line-height:  map-get($sub_headline, "line-height");
  letter-spacing: map-get($sub_headline, "letter-spacing");
}
</style>