<template>
  <page-container>
    <main-preloader class="referral" :is-empty="isReferralListEmpty">
      <div class="referral__container">
        <article
          class="referral-card"
          v-for="(card, i) in referralCards"
          :key="i"
        >
          <div class="referral-card-header">
            <p class="email">{{ card.email }}</p>
            <!-- <div
                class="percent"
                :class="{
              blue: card.percent > 1,
              orange: card.percent <= 1,
            }"
            >
              <p>{{ card.percent }}%</p>
            </div> -->
          </div>
          <div class="referral-card-info">
            <div class="referral-card-info-line">
              <span class="title">{{ t("referral_card.title[0]") }}</span>
              <span class="data"
                >{{ card.hash_per_day }} {{ card.hash_unit }}h/s</span
              >
            </div>
            <div class="referral-card-info-line">
              <span class="title">{{ t("referral_card.title[1]") }}</span>
              <span class="data">
                <span class="data-green">{{ card.active_workers }}</span> /
                <span class="data-red">{{ card.inactive_workers }}</span>
              </span>
            </div>
            <!-- закомменчено потому что на бэке нет этих данных пока что -->

            <!-- <div class="referral-card-info-line">
              <span class="title">{{ t("referral_card.title[2]") }}</span>
              <span class="data">{{ card.created_at }}</span>
            </div> -->
            <div class="referral-card-info-line">
              <span class="title">{{ t("referral_card.title[3]") }}</span>
              <span class="data">{{ card.total_income }} BTC</span>
            </div>
          </div>
        </article>
      </div>
    </main-preloader>
  </page-container>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { api } from "@/api/api";
import { useI18n } from "vue-i18n";
import { onIonViewWillEnter } from "@ionic/vue";
import { id } from "@/modules/user/UserService.js";
import { ReferralMessage } from "@/modules/referral/lang/ReferralMessage.js";
import PageContainer from "@/modules/common/Components/PageContainer.vue";
import MainPreloader from "@/modules/preloader/Components/MainPreloader.vue";

const { t } = useI18n({
  scope: "global",
  messages: ReferralMessage,
});

watch(
  () => id.value,
  () => {
    getReferralsList();
  }
);

onIonViewWillEnter(() => {
  getReferralsList();
});

const referralCards = ref([]);
const isReferralListEmpty = ref(false);

const getReferralsList = async () => {
  if (!id.value) {
    return;
  }

  isReferralListEmpty.value = false;

  try {
    const response = await api.get(`/referrals/${id.value}`);

    if (response.data.data.length <= 0) {
      isReferralListEmpty.value = true;

      return this;
    }

    referralCards.value = response.data.data.map((referral) => {
      return {
        email: referral.email,
        active_workers: referral.referral_active_workers_count,
        inactive_workers: referral.referral_inactive_workers_count,
        hash_per_day: referral.referral_hash_per_day,
        hash_unit: referral.referral_hash_per_day_unitt || "T",
        total_income: referral.total_amount,
        created_at: response.data.data.created_at,
        percent: referral?.referral_percent,
      };
    });
  } catch (error) {
    isReferralListEmpty.value = true;
    console.error(error);
  }
};
</script>

<style scoped lang="scss">
.referral {
  &__container {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;
  }
}
.referral-card {
  border-radius: 20px;
  padding: 16px;
  background: var(--secondary-color-1);
  box-shadow: 0px 3px 12px -6px rgba(22, 22, 22, 0.15),
    0px -1px 4px 0px rgba(47, 47, 47, 0.02);
  font-family: SFProT, serif;

  &-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    margin-bottom: 16px;

    .email {
      font-weight: 600;
      font-size: 15px;
      line-height: 20px;
      letter-spacing: -0.5px;
      color: var(--gray-80080, #f1f1f2cc);
    }

    .percent {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      line-height: 18px;
      padding: 4px 8px 4px 8px;
      border-radius: 8px;
      width: 50px;
      height: 25px;
    }

    .blue {
      background: var(--background-second, #eff8ff);
      color: var(--primary-500, #2e90fa);
    }

    .orange {
      background: var(--background-orange, #fff3d9);
      color: var(--secondary-orange, #ffb319);
    }
  }

  &-info {
    display: flex;
    flex-direction: column;

    &-line {
      display: flex;
      justify-content: space-between;

      .title {
        font-weight: 400;
        font-size: 13px;
        line-height: 18px;
        color: var(--gray-400, #6f7682);
        letter-spacing: -0.08px;
      }

      .data {
        font-weight: 600;
        font-size: 13px;
        line-height: 18px;
        color: var(--gray-500, #8c919b);
        letter-spacing: -0.08px;

        &-green {
          color: var(--secondary-green, #1fb96c);
        }

        &-red {
          color: var(--secondary-red, #f1404a);
        }
      }
    }
  }
}
</style>
