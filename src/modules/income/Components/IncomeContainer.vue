<template>
  <page-container>
    <div class="income-cards-container">
      <article class="income-card flex-column">
        <InfoRow :bitcoin-value="activeSub.totalAmount">
          <template v-slot:title>{{ $t('income_cards[0]') }}</template>
        </InfoRow>
        <progress-bar id="1232fww" :title-text="$t('income_cards[1]')" :tag="'p'" :value="progress" />
      </article>
      <article class="income-card one-component">
        <InfoRow :bitcoin-value="activeSub.yesterdayAmount">
          <template v-slot:title>{{ $t('income_cards[2]') }}</template>
        </InfoRow>
      </article>
      <article class="income-card flex-column">
        <InfoRow :bitcoin-value="activeSub.monthAmount">
          <template v-slot:title>{{ $t('income_cards[3]') }}</template>
        </InfoRow>
        <main-loader class="income_loader">
          <main-column-graph
              v-if="incomeColumnGraph?.dates?.length > 0"
              :graph-data="incomeColumnGraph"
              :height="80"
          />
        </main-loader>
      </article>
      <main-preloader class="income_preloader" :is-empty="isIncomeDataEmpty">
        <income-table :table="incomeList" />
      </main-preloader>
    </div>
  </page-container>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { IncomeMessage } from "@/modules/income/Lang/IncomeMessage.js";
import { computed, onMounted, ref, watch } from "vue";
import InfoRow from "@/modules/statistic/InfoRow.vue";
import { activeSub } from "@/modules/common/store/SubStore.js";
import ProgressBar from "@/modules/statistic/ProgressBar.vue";
import PageContainer from "@/modules/common/Components/PageContainer.vue";
import IncomeTable from "@/modules/income/Components/IncomeTable.vue";
import { getIncomeList, incomeList } from "@/modules/income/incomeService.js";
import {BarGraphData} from "@/modules/statistic/DTO/BarGraphData.js";
import {GraphDataService} from "@/modules/graphs/services/GraphDataService.js";
import MainColumnGraph from "@/modules/graphs/Components/MainBarGraph.vue";
import MainPreloader from "@/modules/preloader/Components/MainPreloader.vue";
import MainLoader from "@/modules/preloader/Components/MainLoader.vue";


const { t } = useI18n({
  scope: 'global',
  messages: IncomeMessage,
})

const progress = computed(() => {
  return  (0.005 / 100) / activeSub.value.pendingAmount
})
const graphDataServiceColumn = new GraphDataService(30);
const incomeColumnGraph = ref({});

const isIncomeDataEmpty = ref(false);

watch(() => incomeList.value.rows, async (newRowsList) => {
  isIncomeDataEmpty.value = newRowsList.length <= 0;

  const rows = [...newRowsList];
  graphDataServiceColumn.records = rows.map(
      (incomeEl) => new BarGraphData(incomeEl)
  );

  graphDataServiceColumn.setDefaultKeys(60 * 60 * 1000 * 24);
  await graphDataServiceColumn.makeFullBarValues();

  incomeColumnGraph.value = graphDataServiceColumn.graph;
})
</script>

<style scoped lang="scss">
ion-segment {
  padding: 2px 0px;
  border-radius: 10px;
  background: var(--gray-100);
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
  color: var(--gray-400);
}
.income {
  &__progress {
    border-radius: 24px;
    background: var(--secondary-color-1, #212327);
    box-shadow: 2px 3px 6px -2px rgba(9, 10, 11, 0.10);
    padding: 16px;
  }
  &_loader {
    height: 120px;
  }
  &_preloader {
    height: 100%;
  }
}
.accrual-cards:last-child{
  margin: 16px 0;
}
.income-card{
  border-radius: 24px;
  padding: 16px;
  background: var(--secondary-color-1);
  box-shadow: 0px 3px 12px -6px rgba(22, 22, 22, 0.15), 0px -1px 4px 0px rgba(47, 47, 47, 0.02);
}
.flex-column{
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.income-cards-container{
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1 1 auto;
}
.one-component{
  padding-bottom: 12px;
  border-radius: 20px;
}
</style>