<template>
  <div class="progress-bar-container">
	<div class="title__content">
	  <p class="title-p" v-if="tag === 'p'">
	    {{ titleText }}
	    <main-alert
		  :id="id"
	      :header="$t('tooltip.title')"
	      :message="$t('tooltip.messages', { amount: activeSub.pendingAmount })"
	      :buttons="[$t('tooltip.button')]"
	    />
	  </p>
	  <p class="title-h1" v-if="tag === 'h1'">
	    {{ titleText }}
	  </p>
	</div>
    <div :class="`progress__${routeName}`">
      <div class="btc-container">
        <span class="btc">{{ activeSub.pendingAmount }} BTC</span>
        <span class="btc">0.005 BTC</span>
      </div>
	    <ion-progress-bar class="progress_bar" :value="progress"></ion-progress-bar>
    </div>
  </div>
</template>
<script setup>
  import { useI18n } from 'vue-i18n';
  import { activeSub } from "@/modules/common/store/SubStore.js";
  import { IonProgressBar } from "@ionic/vue";
  import {computed} from "vue";
  import {IncomeMessage} from "@/modules/income/Lang/IncomeMessage.js";
  import MainAlert from "@/modules/common/Components/UI/MainAlert.vue";

  const {t} = useI18n({
    useScope: 'global',
    messages: IncomeMessage
  })

  defineProps({
    tag: {
      type: String,
      default: 'p'
    },
    titleText: {
      type: String,
      default: ''
    },
    routeName: {
      type: String,
      default: 'income'
    },
    id: {
      type: String,
    },
  })

  const progress = computed(() => {
	  return activeSub.value?.pendingAmount === 0.005 ?
		  100 :
		  (0.005 / 100) / activeSub.value?.pendingAmount
  })
  

</script>
<style scoped lang="scss">
.title-h1 {
  color: var(--gray-800, #F1F1F2);
  font-family: SFProT, sans-serif;
  font-size: 22px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0.35px;
  margin-bottom: 20px;
}
.progress {
  &__income {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  &__home {
    display: flex;
    flex-direction: column;
    gap: 2px;
    border-radius: 20px;
    background: var(--secondary-color-1);
    box-shadow: 2px 3px 6px -2px rgba(9, 10, 11, 0.10);
    padding: 16px;
  }
	&_bar {
		--progress-background: var(--progress-bar-line, #2E90FA);
		--buffer-background: #53B1FD26;
		
		height: 12px;
		border-radius: 16px;
		&::part(progress) {
			border-radius: 16px;
		}
	}
}
.title-p{
  color: var(--gray-400, #6F7682);
  font-weight: 400;
  font-size: map-get($caption_2, "font-size");
  line-height:  map-get($caption_2, "line-height");
  letter-spacing: map-get($caption_2, "letter-spacing");
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.btc{
  color: var(--gray-80080, rgba(241, 241, 242, 0.80));
  font-style: normal;
  font-weight: 500;
  font-size: map-get($caption_1, "font-size");
  line-height:  map-get($caption_1, "line-height");
}
.gray-line{
  position: relative;
  width: 100%;
  height: 12px;
  border-radius: 16px;
  background: rgba(83, 177, 253, 0.15);
  transition: all 0.3s linear;
}
.blue-line{
  position: absolute;
  top: 0;
  left: 0;
  height: 12px;
  border-radius: 16px;
  background: var(--progress-bar-line);
  transition: all 0.3s linear;
}
.progress-bar-container{
  display: flex;
  flex-direction: column;
  font-family: SFProT, serif;
}
.btc-container{
  display: flex;
  justify-content: space-between;
}
</style>