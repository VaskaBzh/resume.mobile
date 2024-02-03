<template>
  <article class="article-accrual-card">
    <!-- Здесь будет v-for -->
    <div class="accrual_card" v-for="(income, i) in incomesService" :key="i">
      <div class="date-status-row">
        <span class="date-text">2 марта 2023</span>
        <div class="status-block">
          <span class="status-text">{{ income.status }}</span>
        </div>
      </div>
      <div class="all-data-inf" >
        <span class="title-card">{{ $t('accrual_card.label[0]') }}</span>
        <span class="data-card">{{ income.amount }} BTC</span>
      </div>
      <!-- Удалить как напишем итерации -->
      <div class="all-data-inf">
        <span class="title-card">{{ $t('accrual_card.label[1]') }}</span>
        <span class="data-card">{{ income.hash.toFixed(2) }} TH/s</span>
      </div>
      <div class="all-data-inf">
        <span class="title-card">{{ $t('accrual_card.label[2]') }}</span>
        <span class="data-card">{{ income['income_at'] }}</span>
      </div>
      <div class="all-data-inf">
        <span class="title-card">{{ $t('accrual_card.label[3]') }}</span>
        <span class="data-card">3MQTR...KgQkyH</span>
      </div>
    </div>
  </article>
</template>
<script setup>
import {incomesService} from "@/modules/Income/incomeService.js";
</script>
<style lang="scss">
.article-accrual-card{
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  //align-items: center;
  //gap: 8px;
  //align-self: stretch;
  //border-radius: 20px;
  //background: var( --secondary-color-1);
  //box-shadow: 2px 2px 4px -2px rgba(29, 41, 57, 0.05), 0px 4px 12px -4px rgba(29, 41, 57, 0.05);
}

.accrual_card {
  width: 100%;
  margin-top: 8px;
  display: flex;
  padding: 16px;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 20px;
  background: var( --secondary-color-1);
  box-shadow: 2px 2px 4px -2px rgba(29, 41, 57, 0.05), 0px 4px 12px -4px rgba(29, 41, 57, 0.05);
}
.date-status-row:first-child{
  padding-bottom: 8px;
}
.all-data-inf, .date-status-row{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.title-card{
  color: var( --gray-400);
  font-size: map-get($foot_note, "font-size");
  line-height:  map-get($foot_note, "line-height");
  letter-spacing: map-get($foot_note, "letter-spacing");
}
.data-card{
  color: var( --gray-500);
  text-align: center;
  font-weight: 600;
  font-size: map-get($foot_note, "font-size");
  line-height:  map-get($foot_note, "line-height");
  letter-spacing: map-get($foot_note, "letter-spacing");
}
.status-text{
  color: #1FB96C;
  text-align: center;
  font-style: normal;
  font-weight: 500;
  font-size: map-get($caption_1, "font-size");
  line-height:  map-get($caption_1, "line-height");
}
.status-block{
  display: flex;
  align-items: center;
  gap:3px;
  border-radius: var(--interactive-border-radius-radius-i-sm, 8px);
  background: var(--background-green);
  padding: 4px 8px;
}
.date-text{
  color: var( --gray-700);
  text-align: center;
  font-weight: 600;
  letter-spacing: -0.5px;
  font-size: map-get($sub_headline, "font-size");
  line-height:  map-get($sub_headline, "line-height");
}

</style>