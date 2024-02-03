<script setup>
import PageContainer from "@/modules/common/Components/PageContainer.vue";
import {
  clickTableWorker,
  getWorkerGraph,
  actualWorkerOffset,
} from "@/modules/workers/services/WorkerService";
import InfoCard from "@/modules/statistic/InfoCard.vue";
import {computed, ref, watch} from "vue";
import { useI18n } from "vue-i18n";
import { WorkerMessages } from "@/modules/workers/lang/WorkerMessages";
import { useRouter } from "vue-router";
import MainLineGraph from "@/modules/graphs/Components/MainLineGraph.vue";
import MainLoader from "@/modules/preloader/Components/MainLoader.vue";
import { onIonViewWillEnter } from "@ionic/vue";
import { workerGraph } from "@/modules/workers/store/WorkerStore";
import {viewport} from "@/modules/viewport/store/ViewportStore.js";

const { t } = useI18n({
  scope: "global",
  messages: WorkerMessages,
});

const workerRoute = useRouter();

const infoCards = computed(() => {
  return [
    {
      title: t("info_card[0]"),
      num: clickTableWorker?.value.hashPerMin,
      unit: `${clickTableWorker?.value.hashPerMinuteUnit ?? "T"}H/s`,
    },
    {
      title: t("info_card[1]"),
      num: clickTableWorker?.value.hashPerDay,
      unit: `${clickTableWorker?.value.hashPerDayUnit ?? "T"}H/s`,
    },
  ];
});

const worker = ref(null);
const graphFullHeight = ref(331);

onIonViewWillEnter(async () => {
  await getWorkerGraph(clickTableWorker?.value.id);
  if (viewport.value > window.innerHeight) {
	setTimeout(() => {
      graphFullHeight.value = 331;
	}, 50);

    return this;
  }

  setTimeout(() => {
	  graphFullHeight.value = worker.value?.clientHeight ? (worker.value?.clientHeight - 210) : 331;
  }, 50);
});

watch(() => viewport.value, (newViewportValue) => {
  if (newViewportValue > window.innerHeight) {
	setTimeout(() => {
      graphFullHeight.value = 331;
	}, 50);

    return this;
  }
	 
  setTimeout(() => {
    graphFullHeight.value = worker.value?.clientHeight ? (worker.value?.clientHeight - 210) : 331;
  }, 50);
})
</script>

<template>
  <page-container>
    <div class="worker" ref="worker">
      <div class="worker-info">
        <p class="worker-name">{{ clickTableWorker?.name }}</p>
        <p :class="`worker-status-${clickTableWorker?.status.toLowerCase()}`">
          {{
            `${String(clickTableWorker?.status)[0]}` +
            `${String(clickTableWorker?.status).slice(1).toLocaleLowerCase()}`
          }}
        </p>
      </div>
      <div class="info-card-container">
        <InfoCard v-for="card in infoCards">
          <template v-slot:title>{{ card.title }}</template>
          <template v-slot:num>{{ card.num }}</template>
          <template v-slot:unit>{{ card.unit }}</template>
        </InfoCard>
      </div>
      <!--  <ion-grid>-->
      <!--    <ion-row>-->
      <!--      <ion-col class="name_col">Hashrate</ion-col>-->
      <!--      <ion-col class="name_col">Reject</ion-col>-->
      <!--      <ion-col class="name_col">Date</ion-col>-->
      <!--      <ion-col class="name_col">Time</ion-col>-->
      <!--    </ion-row>-->
      <!--    <ion-row>-->
      <!--      <ion-col class="name_row">{{ `${Number(clickTableWorker?.hashPerDay).toFixed()}` + ` ${clickTableWorker?.hashPerDayUnit + 'H/s'}` }}</ion-col>-->
      <!--      <ion-col class="name_row">{{ Number(clickTableWorker?.rejectRate).toFixed() + " %" }}</ion-col>-->
      <!--      <ion-col class="name_row">22.02.2023</ion-col>-->
      <!--      <ion-col class="name_row">17:08</ion-col>-->
      <!--    </ion-row>-->
      <!--  </ion-grid>-->
      <main-loader class="preloader-flex">
        <main-line-graph
            v-if="workerGraph?.dates?.length > 0"
            :graph-data="workerGraph"
            :height="graphFullHeight"
            :offset="actualWorkerOffset"
            isWorkerGraph
            @change-offset="getWorkerGraph(clickTableWorker?.id, $event)"
        />
      </main-loader>
    </div>
  </page-container>
</template>

<style scoped lang="scss">
.worker {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}
.worker-info {
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 16px;
  background: var(--secondary-color-1, #fff);
  box-shadow: 1px 2px 4px -2px rgba(184, 194, 208, 0.1);
  margin-bottom: 8px;
}

.worker-name {
  color: var(--gray-80080, rgba(29, 41, 57, 0.8));
  font-family: SFProT, serif;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px; /* 129.412% */
  letter-spacing: -0.408px;
}
.worker-status-active {
  background: var(--background-green, #e9f8f1);
  color: var(--secondary-green, #1fb96c);
}

.worker-status-inactive {
  background: var(--background-red, #e9f8f1);
  color: var(--secondary-red, #f1404a);
}

.worker-status-dead {
  background: var(--background-tabs, #e9f8f1);
  color: var(--gray-500, #8c919b);
}

.worker-status-active,
.worker-status-inactive,
.worker-status-dead {
  padding: 1px 8px;
  border-radius: 8px;
  text-align: center;
  font-family: SFProT, serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
}

.info-card-container {
  display: flex;
  gap: 8px;
  flex-flow: row nowrap;
  margin-bottom: 24px;
}

.name_col {
  text-align: center;
  color: var(--gray-500, #667085);
  font-feature-settings: "case" on;
  font-family: SFProT, serif;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 13px;
  letter-spacing: 0.066px;
}

.name_row {
  color: var(--gray-80080, rgba(29, 41, 57, 0.8));
  text-align: center;
  font-feature-settings: "case" on;
  font-family: SFProT, serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.5px;
}
</style>
