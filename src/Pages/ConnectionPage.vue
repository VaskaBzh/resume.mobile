<template>
	<page-container>
	    <main-head :title="$t('connection.title')" :text="$t('connection.sub_title')" />
		<main-copy text="btc.all-btc.com:4444" label="Port" />
		<main-copy text="btc.all-btc.com:3333" label="Port 1" />
		<main-copy text="btc.all-btc.com:2222" label="Port 2" />
		<main-copy :text="`${subList.find(sub => sub.id == router.currentRoute.value.query.group_id)?.name ?? activeSub.name}.worker_name`" label="Worker name" />
	    <div class="connection-warning">
	      <main-icon :icon="connect" class="warning_icon"/>
	      <p class="warning__text">{{$t('connection.warning')}}</p>
	    </div>
	</page-container>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { ConnectionMessage } from "@/modules/connection/Lang/connectionMessage";
import { ref } from "vue";
import {activeSub, subList} from "@/modules/common/store/SubStore.js";

import connect from '@icon/connect.svg'
import MainIcon from "@/modules/common/Components/UI/MainIcon.vue";
import PageContainer from "@/modules/common/Components/PageContainer.vue";
import MainCopy from "@/modules/common/Components/UI/MainCopy.vue";
import router from "@/router/index.js";
import MainHead from "@/modules/common/Components/MainHead.vue";

const { t }  = useI18n({
  useScope: 'global',
  messages: ConnectionMessage,
})


const cardsConnection = ref([
  {
    label: "Port",
    value: "btc.all-btc.com:4444",
  },
  {
    label: "Port1",
    value: "btc.all-btc.com:3333",
  },
  {
    label: "Port2",
    value: "btc.all-btc.com:2222",
  },
  {
    label: "Worker",
    value: "mainbtcsub001",
  },
]);

</script>

<style scoped>
ion-input.custom {
  --border-radius: 12px;
  --background: #FFF;
  --box-shadow: 1px 2px 4px -2px rgba(184, 194, 208, 0.10);
  --color: rgba(29, 41, 57, 0.80);
  --placeholder-opacity: 0.8;
  --padding-bottom: 10px;
  --padding-end: 10px;
  --padding-start: 10px;
  --padding-top: 10px;
  --placeholder-color: 1px 2px 4px -2px rgba(184, 194, 208, 0.10);
}

.connection_title {
  margin: 0;
  color: var(--gray-800);
  /* Bold/Title 2 */
  font-family: SFProT, serif;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px; /* 127.273% */
  letter-spacing: 0.35px;
}

.warning_icon {
  width: 24px;
  min-width: 24px;
  height: 24px;
}

.connection_inputs:not(:first-child) {
  margin-top: 16px;
}

.connection_subtitle {
  color:  #98A2B3;
  font-family: SFProT, serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  margin: 8px 0 24px;
  letter-spacing: -0.32px;
}

.connection-warning {
  display: flex;
  flex-flow: row nowrap;
  gap: 12px;
  align-items: center;
  border-radius: 12px;
  background: rgba(83, 177, 253, 0.07);
  padding: 12px;
  margin-top: 24px;
}

.warning__text {
  color: var(--primary-400, #53B1FD);
  font-family: SFProT, serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
}

.connection_label {
  display: inline-block;
  padding: 0 0 4px 12px;
  font-family: SFProT, serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 138.462% */
  letter-spacing: -0.078px;

}
</style>
