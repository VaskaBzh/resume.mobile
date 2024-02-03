<template>
  <page-container>
    <div
      class="statistic"
      v-if="activeSub?.workersCount || activeSub?.workersDead"
    >
      <div
        class="statistic__block statistic__block-margin statistic__block-line"
      >
        <main-loader>
          <main-line-graph
            v-if="statisticHahRate?.dates?.length > 0"
            :graph-data="statisticHahRate"
            :height="162"
            :offset="actualStatisticOffset"
            @change-offset="getSubStatistic($event)"
          />
        </main-loader>
      </div>
      <div
        class="statistic__block statistic__block-margin statistic__block-grid"
      >
        <InfoCard v-for="card in infoCards" :color="card.color">
          <template v-slot:title>{{ card.title }}</template>
          <template v-slot:num>{{ card.num }}</template>
          <template v-slot:unit>{{ card.unit }}</template>
        </InfoCard>
      </div>
      <article
        class="statistic__block statistic__block-fill statistic__block-bar"
      >
        <progress-bar id="1231234122fww" :title-text="$t('income_cards[1]')" />
        <main-loader class="statistic_preloader statistic_preloader-bar">
          <main-column-graph
            v-if="statisticIncomes?.dates?.length > 0"
            :graph-data="statisticIncomes"
            :height="80"
          />
        </main-loader>
      </article>
      <article
        class="statistic__block statistic__block-fill statistic__block-gap"
      >
        <InfoRow v-for="(card, i) in cards" :key="i" :bitcoin-value="card.num">
          <template v-slot:title>{{ card.title }}</template>
        </InfoRow>
      </article>
    </div>
    <empty-card
      v-else
      :image="empty_statistic"
      :text="t('empty_card[0]')"
      :button_text="t('empty_card[1]')"
      @clicked="connectionRedirect"
    />
  </page-container>
</template>

<script setup>
import { activeId, activeSub } from "@/modules/common/store/SubStore.js";
import { computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { StatisticMessage } from "@/modules/statistic/Lang/StatisticMessage.js";
import {
  actualStatisticOffset,
  getSubStatistic,
  statisticHahRate,
  statisticIncomes,
} from "@/modules/statistic/statisticService.js";
import { onIonViewWillEnter } from "@ionic/vue";
import { useRoute } from "vue-router";
import router from "@/router";
import ProgressBar from "@/modules/statistic//ProgressBar.vue";
import InfoRow from "@/modules/statistic/InfoRow.vue";
import InfoCard from "@/modules/statistic/InfoCard.vue";
import MainLineGraph from "@/modules/graphs/Components/MainLineGraph.vue";
import MainColumnGraph from "@/modules/graphs/Components/MainBarGraph.vue";
import PageContainer from "@/modules/common/Components/PageContainer.vue";
import MainLoader from "@/modules/preloader/Components/MainLoader.vue";
import EmptyCard from "@/modules/common/Components/EmptyCard.vue";
import empty_statistic from "@img/own-blank.png";

const { t } = useI18n({
  scope: "global",
  messages: StatisticMessage,
});

const cards = computed(() => [
  {
    title: t("income_inf[0]"),
    num: activeSub.value.todayAmount,
  },
  {
    title: t("income_inf[1]"),
    num: activeSub.value.yesterdayAmount,
  },
  {
    title: t("income_inf[2]"),
    num: activeSub.value.monthAmount,
  },
]);
const infoCards = computed(() => {
  return [
    {
      title: t("info_card[0]"),
      num: activeSub.value.hashPerMinute,
      unit: `${activeSub.value.hashPerMinuteUnit ?? "T"}H/s`,
    },
    {
      title: t("info_card[1]"),
      num: activeSub.value.hashPerDay,
      unit: `${activeSub.value.hashPerDayUnit ?? "T"}H/s`,
    },
    {
      title: t("info_card[2]"),
      num: activeSub.value.workersActive,
      color: "green",
    },
    {
      title: t("info_card[3]"),
      num: activeSub.value.workersInactive,
      color: "red",
    },
  ];
});

const route = useRoute();

const connectionRedirect = () => {
  router.push("connection");
};

watch(
  () => activeId.value,
  async () => {
    if (route.name === "statistic") {
      await getSubStatistic();
    }
  }
);
onIonViewWillEnter(async () => {
  await getSubStatistic();
});
</script>

<style scoped lang="scss">
.statistic {
  width: 100%;
  &_preloader {
    &-bar {
      height: 120px;
    }
  }
  &__block {
    margin-bottom: 8px;
    width: 100%;
    &-gap {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    &-fill {
      border-radius: 24px;
      background: var(--secondary-color-1, #212327);
      box-shadow: 2px 3px 6px -2px rgba(9, 10, 11, 0.1);
      padding: 16px;
    }
    &-bar {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    &-line {
      min-height: 238px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &-margin {
      margin-bottom: 24px;
    }
    &-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
      gap: 8px;
    }
  }
}
</style>
