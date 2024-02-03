<template>
  <page-container>
    <main-loader class="referral">
      <div class="referral__container">
        <div class="statistic__block statistic__block-grid">
          <info-card
            v-for="(card, i) in infoCards"
            :key="i"
            :color="card.color"
            :id="'cabinet_' + i"
            :header="card.alert?.header"
            :message="card.alert?.message"
            :buttons="card.alert?.button"
          >
            <template v-slot:title>{{ card.title }}</template>
            <template v-slot:num>{{ card.num }}</template>
            <template v-slot:unit>{{ card?.unit }}</template>
          </info-card>
        </div>
        <article
          class="income-card one-component"
          v-for="(card, i) in incomeCards"
          :key="i"
        >
          <info-row :bitcoin-value="card.num">
            <template v-slot:title>{{ card.title }}</template>
          </info-row>
        </article>
        <div class="referral-link-card">
          <main-head
            :title="t('ref_link.header')"
            :text="t('ref_link.text')"
            class="head-low"
          ></main-head>
          <main-copy class="referral_copy" :text="copyUrl"></main-copy>
        </div>
        <div class="referral-select-card">
          <main-head
            :title="t('sub_select.card.header')"
            :text="t('sub_select.card.text')"
            class="head-low"
          ></main-head>
          <ion-select
            :interface-options="SelectHeader"
            interface="action-sheet"
            placeholder="Subaccount"
            :value="activeSub"
            @ionChange="switchSub($event)"
          >
            <ion-select-option
              v-for="card in selectOptionCards"
              :key="card.id"
              :value="card.id"
              class="options"
            >
              <main-icon :icon="sub"></main-icon>
              {{ card.name }}</ion-select-option
            >
          </ion-select>
        </div>
      </div>
    </main-loader>
  </page-container>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { api } from "@/api/api";
import { onIonViewWillEnter } from "@ionic/vue";
import { ReferralMessage } from "@/modules/referral/lang/ReferralMessage.js";
import { IonSelect, IonSelectOption } from "@ionic/vue";
import { activeId, subList } from "@/modules/common/store/SubStore.js";
import { id } from "@/modules/user/UserService.js";
import PageContainer from "@/modules/common/Components/PageContainer.vue";
import MainHead from "@/modules/common/Components/MainHead.vue";
import MainCopy from "@/modules/common/Components/UI/MainCopy.vue";
import MainIcon from "@/modules/common/Components/UI/MainIcon.vue";
import InfoCard from "@/modules/statistic/InfoCard.vue";
import InfoRow from "@/modules/statistic/InfoRow.vue";
import sub from "@icon/sub.svg";
import MainLoader from "@/modules/preloader/Components/MainLoader.vue";

const { t } = useI18n({
  scope: "global",
  messages: ReferralMessage,
});

const activeSub = ref("");
const copyUrl = ref("");
const refData = ref({});

const selectOptionCards = computed(() =>
  subList.value.map((s) => {
    return {
      id: s.id,
      name: s.name,
    };
  })
);

const switchSub = async (ev) => {
  try {
    await api.put(`/subs/sub/activate/${ev.detail.value}`);

    // await getData();
  } catch (error) {
    console.error(error);
  }
};

const getData = async () => {
  if (!activeId.value) {
    return;
  }

  try {
    const response = await api.get(`/referrals/statistic/${id.value}`);

    const record = response?.data?.data;

    const url = new URL(record?.referral_url);

    refData.value = {
      invited_referrals: record?.attached_referrals_count || 0,
      total_income: record?.referrals_total_amount || 0,
      active_referrals: record?.active_referrals_count || 0,
      current_hash_rate: record?.total_referrals_hash_rate || 0,
      referral_percent: record?.referral_percent || 0,
      hash_rate_unit: record?.hash_rate_unit || "T",
    };

    activeSub.value = record?.group_id;

    copyUrl.value = `https://all-btc.com/registration${url.search}`;
  } catch (error) {
    console.error(error);
  }
};

watch(
  () => activeId.value,
  async () => {
    await getData();
  }
);

onIonViewWillEnter(async () => {
  await getData();
});

const SelectHeader = {
  header: t("sub_select.popup_header"),
};

const incomeCards = computed(() => [
  {
    title: t("title.income_card[0]"),
    num: Number(refData.value.total_income) ?? 0,
  },
  // {
  //   title: t("title.income_card[1]"),
  //   num: 0,
  //   usd: 0,
  //   rub: 0,
  // },
]);

const infoCards = computed(() => {
  return [
    {
      title: t("title.info_card[0]"),
      num: `${refData.value.referral_percent}%`,
      color: "blue",
    },
    {
      title: t("title.info_card[1]"),
      num: refData.value.current_hash_rate,
      unit: `${refData.value.hash_rate_unit}h/s`,
      alert: {
        header: t("alert.current_hash[0]"),
        message: t("alert.current_hash[1]"),
        button: [t("alert.button")],
      },
    },
    {
      title: t("title.info_card[2]"),
      num: refData.value.invited_referrals,
    },
    {
      title: t("title.info_card[3]"),
      num: refData.value.active_referrals,
      alert: {
        header: t("alert.active_refs[0]"),
        message: t("alert.active_refs[1]"),
        button: [t("alert.button")],
      },
    },
  ];
});
</script>
<style scoped lang="scss">
.referral {
  display: flex;
  flex-direction: column;
  &_copy {
    --background: var(--background-bg, #16181a);
    --color: var(--gray-80080, rgba(241, 241, 242, 0.8));
  }
  &__container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
.statistic {
  &__block {
    margin-bottom: 8px;
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
      margin-bottom: 43px;
    }

    &-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
      gap: 8px;
    }
  }
}

ion-select::part(icon) {
  color: var(--gray-300, #595e68);
  opacity: 1;
  position: absolute;
  right: 0;
}

.income-card,
.referral-link-card,
.referral-select-card {
  border-radius: 20px;
  padding: 16px;
  background: var(--secondary-color-1);
  box-shadow: 0px 3px 12px -6px rgba(22, 22, 22, 0.15),
    0px -1px 4px 0px rgba(47, 47, 47, 0.02);
}

.referral-link-card,
.referral-select-card {
  border-radius: 24px;
  margin-bottom: 8px;
}

.one-component {
  padding-bottom: 12px;
  border-radius: 20px;
  margin-bottom: 8px;
}

ion-select {
  background: var(--background-bg, #16181a);
  border-radius: 12px;
  padding: 0px 12px 0px 12px;
  color: var(--gray-80080, rgba(241, 241, 242, 0.8));
  width: 100%;
}
</style>
