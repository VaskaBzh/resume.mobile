<template>
  <div class="progress-bar-container">
    <p class="title">{{ $t('income_card[1]') }}</p>
    <div>
      <div class="btc-container">
        <span class="btc">{{ pendingAmount }} BTC</span>
        <span class="btc"> {{ currentMinThreshold  }} BTC</span>
      </div>
      <div class="gray-line">
        <div class="blue-line" ref="progressBar"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { pendingAmount } from '../../Subaccaunt/subaccaunts'
  import { IncomeMessage } from '../Lang/IncomeMessage';
  import { useI18n } from 'vue-i18n';
import { currentMinThreshold, progressBar } from '../incomeService';
  const { t } = useI18n({
    useScope: 'global',
    messages: IncomeMessage
  })
</script>
<style scoped lang="scss">
.title{
  color: var(--gray-400);
  font-weight: 400;
  font-size: map-get($caption_2, "font-size");
  line-height:  map-get($caption_2, "line-height");
  letter-spacing: map-get($caption_2, "letter-spacing");
}
.btc{
  color: var(--gray-80080);
  font-style: normal;
  font-weight: 500;
  font-size: map-get($caption_1, "font-size");
  line-height:  map-get($caption_1, "line-height");
}
.gray-line{
  position: relative;
  width: 100%;
  height: 12px;
  border-radius: 16px;
  background: rgba(83, 177, 253, 0.15);
  transition: all 0.3s linear;
}
.blue-line{
  position: absolute;
  top: 0;
  left: 0;
  height: 12px;
  border-radius: 16px;
  background: var(--progress-bar-line);
  transition: all 0.3s linear;
}
.progress-bar-container{
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.btc-container{
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}
</style>