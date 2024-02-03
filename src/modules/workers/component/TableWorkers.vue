<template>
  <ion-grid class="workers_table" :fixed="true">
    <ion-row class="worker_row worker_row-title">
      <ion-col class="worker_col-name">{{
        $t("worker_table.thead[0]")
      }}</ion-col>
      <ion-col class="worker_col-name">{{
        $t("worker_table.thead[1]")
      }}</ion-col>
      <ion-col class="worker_col-name">{{
        $t("worker_table.thead[2]")
      }}</ion-col>
    </ion-row>
    <ion-row
      class="worker_row"
      :id="row.id"
      v-for="(row, i) in workerTable.rows"
      :key="i"
      :class="`worker_row-${row.status.toLowerCase()}`"
      @click="
        $router.push({ name: 'worker' });
        clickTableWorker = row;
      "
    >
      <ion-col class="worker_col-name">{{ row.name }}</ion-col>
      <ion-col class="worker_col-name">{{ row.hashPerMinRender }}</ion-col>
      <ion-col class="worker_col-name">{{ row.rejectRate }}</ion-col>
      <main-icon class="worker_icon" :icon="arrow_right" />
    </ion-row>
  </ion-grid>
</template>

<script setup>
import { IonGrid, IonRow, IonCol, onIonViewWillEnter } from "@ionic/vue";
import { workerTable } from "@/modules/workers/store/WorkerStore";
import arrow_right from "@icon/arrow_right.svg";
import MainIcon from "@/modules/common/Components/UI/MainIcon.vue";
import router from "@/router/index.js";
import { clickTableWorker } from "@/modules/workers/services/WorkerService.js";
import { useI18n } from "vue-i18n";
import { WorkerMessages } from "@/modules/workers/lang/WorkerMessages";

const { t } = useI18n({
  useScope: "global",
  messages: WorkerMessages,
});
</script>

<style scoped lang="scss">
.workers_table {
  width: 100%;
}
.worker_col-name {
  color: var(--gray-400, #98a2b3);
  font-family: SFProT, serif;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 13px;
  letter-spacing: 0.066px;
}
.worker {
  &_icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    stroke: var(--gray-300, #595E68);
  }
  &_row {
    width: 100%;
    padding: 0 12px;
    margin-bottom: 4px;
    &-active {
      &::before {
        background: var(--secondary-green, #1fb96c);
      }
    }
    &-inactive {
      &::before {
        background: var(--secondary-red, #f1404a);
      }
    }
    &-dead {
      &::before {
        background: var(--gray-500, #8c919b);
      }
    }
    &:not(&-title) {
      border-radius: 12px;
      min-height: 48px;
      background: var(--secondary-color-1, #212327);
      display: flex;
      align-items: center;
      white-space: nowrap;
      box-shadow: 1px 2px 4px -2px rgba(29, 29, 29, 0.1);
      position: relative;
      &::before {
        content: "";
        width: 8px;
        min-width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 8px;
      }
      .worker {
        &_col {
          &-name {
            &:first-child {
              width: 100%;
              max-width: 29.2%;
              overflow: hidden;
              text-overflow: ellipsis;
              padding-right: 10px;
            }
          }
        }
      }
    }
    &-title {
      margin-bottom: 8px;
      .worker {
        &_col {
          &-name {
            &:first-child {
              max-width: 33%;
              width: 100%;
            }
          }
        }
      }
    }
    .worker {
      &_col {
        &-name {
          font-weight: 500;
          font-size: map-get($caption_1, "font-size");
          line-height: map-get($caption_1, line-height);
        }
      }
    }
  }
}
</style>
