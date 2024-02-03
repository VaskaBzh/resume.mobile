<template>
  <page-container>
    <div class="workers-main" v-if="activeSub.workersCount">
      <div class="card-container">
        <div class="info-card-container">
          <InfoCard
            class="workers__card"
            v-for="card in infoCards"
            :color="card.color"
          >
            <template v-slot:title>{{ card.title }}</template>
            <template v-slot:num>{{ card.num }}</template>
            <template v-slot:unit>{{ card.unit }}</template>
          </InfoCard>
        </div>
        <!-- <MainInfoCard/> -->
      </div>
      <div class="button-container">
        <button
          class="button-gray"
          v-for="(status, i) in workerStatuses"
          :key="i"
          @click="setActiveStatus(status.value)"
          :class="{ active: status.value === activeStatus }"
        >
          {{ $t(status.text) }} ({{ status.count }})
        </button>
      </div>
      <main-preloader class="income_preloader" :is-empty="isWorkersEmpty">
        <table-workers />
      </main-preloader>
    </div>
    <empty-card
	  v-else
	  :image="empty_workers"
      :text="$t('empty.text')"
      :button_text="$t('add_workers')"
      @clicked="connectionRedirect"
    />
  </page-container>
</template>

<script setup>
import { getWorkerList } from "@/modules/workers/services/WorkerService.js";
import { computed, ref, watch } from "vue";
import { activeSub } from "@/modules/common/store/SubStore.js";
import { useI18n } from "vue-i18n";
import { WorkerMessages } from "@/modules/workers/lang/WorkerMessages.js";
import { workerTable } from "@/modules/workers/store/WorkerStore.js";
import router from "@/router";
import InfoCard from "@/modules/statistic/InfoCard.vue";
import EmptyCard from "@/modules/common/Components/EmptyCard.vue";
import PageContainer from "@/modules/common/Components/PageContainer.vue";
import TableWorkers from "@/modules/workers/component/TableWorkers.vue";
import MainPreloader from "@/modules/preloader/Components/MainPreloader.vue";
import empty_workers from "@img/own-blank.png";

const isWorkersEmpty = ref(false);
watch(
  () => workerTable.value.rows,
  (newRowsData) => {
    isWorkersEmpty.value = newRowsData <= 0;
  }
);

const { t } = useI18n({
  useScope: "global",
  messages: WorkerMessages,
});
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
  ];
});

const workerStatuses = computed(() => {
  return [
    {
      text: "worker_table.tab[0]",
      count: activeSub.value?.workersCount ?? 0,
      value: "all",
    },
    {
      text: "worker_table.tab[1]",
      count: activeSub.value?.workersActive ?? 0,
      value: "active",
    },
    {
      text: "worker_table.tab[2]",
      count: activeSub.value?.workersInactive ?? 0,
      value: "inactive",
    },
    {
      text: "worker_table.tab[3]",
      count: activeSub.value?.workersDead ?? 0,
      value: "dead",
    },
  ];
});

const activeStatus = ref("all");

function setActiveStatus(status) {
  activeStatus.value = status;

  getWorkerList(activeStatus.value);
}

const connectionRedirect = () => {
  router.push("connection");
};
</script>

<style scoped lang="scss">
.workers__card {
  width: 100%;
}
.sub-container {
  height: auto;
}
.add-container {
  max-height: 84vh;
}
.successful-container {
  max-height: 40vh;
}
.workers-main {
  width: 100%;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}
ion-content {
  --background: inherit;
}
.input-container {
  width: 100%;
  margin: 24px 0 0;
}
.button-container {
  display: flex;
  width: calc(100% + 32px);
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  margin: 0 -16px 20px;
  padding: 0 16px;
  min-height: 34px;
  gap: 8px;
}
.button-gray {
  border-radius: 8px;
  border: 1.5px solid var(--gray-200, #e4e7ec);
  background: inherit;
  padding: 0 16px;
  color: var(--gray-400, #98a2b3);
  font-family: SFProT, serif;
  font-size: map-get($foot_note, "font-size");
  line-height: map-get($foot_note, "line-height");
  letter-spacing: map-get($foot_note, "letter-spacing");
  white-space: nowrap;
  width: 100%;
  min-height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.active {
  color: var(--primary-500);
  border-radius: 8px;
  border: 1.5px solid var(--primary-500, #2e90fa);
}
.button-container::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.card-container {
  width: 100%;
  display: flex;
  margin-bottom: 24px;
}
.ion-page {
  background: linear-gradient(141deg, #024bc0 15.87%, #3597f9 97.76%);
  justify-content: normal;
}
.header-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 9vh;
  margin-bottom: 10px;
}
.svg-open-subaccaunts {
  margin-top: 6px;
}
.title-container {
  padding-top: 5vh;
  display: flex;
  align-items: center;
  gap: 4px;
}
// ion-button{
//   width: auto;
// }
.info-card-container {
  display: flex;
  gap: 8px;
  width: 100%;
}
.title-text {
  color: var(--primary-25, #f5faff);
  text-align: center;
  /* font-weight: 600; */
  font-size: map-get($headline, "font-size");
  line-height: map-get($headline, "line-height");
  letter-spacing: map-get($headline, "letter-spacing");
}
.modal-container {
  padding: 24px 16px;
  height: auto;
}
.blue-button-container {
  margin-top: 97px;
}

.emty-container {
  display: flex;
  width: 100%;
  height: 653px;
  align-items: center;
  justify-content: center;
}
.btn-next {
  border-radius: 16px;
  background-color: transparent;
  width: 100%;
  margin-top: 24px;
}
.successful-button {
  color: var(--primary-25, #f5faff);
  font-weight: 600;
  font-size: map-get($callout, "font-size");
  line-height: map-get($callout, "line-height");
  letter-spacing: map-get($callout, "letter-spacing");
  padding: 16px 0;
  width: 100%;
  border-radius: 16px;
  background: var(--primary-500);
  box-shadow: 2px 2px 4px -2px rgba(29, 41, 57, 0.05),
    0px 4px 12px -4px rgba(29, 41, 57, 0.05);
}
.button-next-container {
  width: 100%;
  // margin-top: 24px;
}
.swiper .swiper-slide {
  min-height: 456px;
  align-items: baseline;
  text-align: left;
}

.swiper .swiper-slide:nth-child(2n) {
  height: 76vh;
}
.swiper .swiper-slide:nth-child(3n) {
  height: 28vh;
}
</style>
