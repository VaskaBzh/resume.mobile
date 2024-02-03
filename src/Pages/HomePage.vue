<template>
	<page-container>
    <ProgressBar id="home_progress11" :route-name="`${route.name}`" :title-text="$t('home.titles[2]')" :tag="'h1'"></ProgressBar>
    <main-head :title="$t('home.titles[0]')" class="home_head"/>
		<quick-action-card/>
    <main-head :title="$t('home.titles[1]')" class="home_head"></main-head>
    <currency-for-mining />
	</page-container>
</template>

<script setup>
import QuickActionCard from "@/modules/home/Components/QuickActionCard.vue";
import PageContainer from "@/modules/common/Components/PageContainer.vue";
import { HomeMessage } from "@/modules/home/lang/HomeMessage.js";
import { useI18n } from 'vue-i18n';
import MainHead from "@/modules/common/Components/MainHead.vue";
import ProgressBar from "@/modules/statistic/ProgressBar.vue";
import {onMounted} from "vue";
import {useRoute} from "vue-router";
import CurrencyForMining from "@/modules/home/Components/CurrencyForMining.vue";

useI18n({
  useScope: 'global',
  messages: HomeMessage
})

const route = useRoute()

</script>

<style scoped lang="scss">
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-184px);
  opacity: 0;
}
.ion-page{
  background: var(--gradient-main, linear-gradient(141deg, #024BC0 15.87%, #3597F9 97.76%));
}

.home_head {
  margin-top: 32px;
}

.cards-container{
  width: 100%;
}
.home-main{
  width: 100%;
  height: 673px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 28px 28px 0px 0px;
  background: #16181A;
  transition: all 0.3s linear;
  animation: animatePage 0.3s ease-out forwards;
}
ion-content{
  --background: inherit;
}
</style>