<template>
	<layout-main class="layout-no-scroll">
    <ion-tabs class="footer">
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom" class="footer__tabs" id="mainFooter">
        <ion-tab-button tab="home" class="footer_tab" href="/home">
          <main-icon :icon="home" class="footer_icon" />
          <ion-label class="footer_label">{{ tabsTextArray[0] }}</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="statistic" class="footer_tab" href="/statistic">
          <main-icon :icon="statistic" class="footer_icon" />
          <ion-label class="footer_label">{{ tabsTextArray[1] }}</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="income" class="footer_tab" href="/income">
          <main-icon :icon="income" class="footer_icon footer_icon-fill" />
          <ion-label class="footer_label">{{ tabsTextArray[2] }}</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="workers" class="footer_tab" href="/workers">
          <main-icon :icon="workers" class="footer_icon" />
          <ion-label class="footer_label">{{ tabsTextArray[3] }}</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="settings" class="footer_tab" href="/settings">
          <main-icon :icon="settings" class="footer_icon" />
          <ion-label class="footer_label">{{ tabsTextArray[4] }}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
	</layout-main>
</template>

<script setup>
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel } from '@ionic/vue';
import { CommonMessage } from "@/modules/common/Lang/CommonMessage.js";
import { useI18n } from 'vue-i18n';
import { onMounted, ref, watch } from "vue";
import home from "@icon/home.svg";
import statistic from "@icon/statistic.svg";
import income from "@icon/income.svg";
import workers from "@icon/workers.svg";
import settings from "@icon/settings.svg";

import LayoutMain from "@/layouts/LayoutMain.vue";
import MainIcon from "@/modules/common/Components/UI/MainIcon.vue";

const { t, locale } = useI18n({
  useScope: 'global',
  messages: CommonMessage
})

const tabsTextArray = ref([]);

const setTabsTranslate = () => {
	tabsTextArray.value = Array.from({ length: 5 }).map((_, i) => CommonMessage[locale.value].tabs[i])
}

watch(() => locale.value, setTabsTranslate);
onMounted(() => {
	setTabsTranslate();
});
</script>
<style scoped lang="scss">
.footer {
	&__tabs {
		border-radius: 24px 24px 0px 0px;
		border: none;
		--background: var(--secondary-color-1);
		box-shadow: 0px -4px 8px 0px var(--footer-shadow, rgba(8, 8, 8, 0.15));
		display: flex;
		width: 100%;
		flex-wrap: nowrap;
		padding-bottom: var(--ion-safe-area-bottom, 0);
	}
	&_tab {
		width: 100%;
		padding: 5.5px 0;
		min-height: 50px;
		font-family: SFProT, serif;
		&.tab-selected {
			.footer {
				&_label {
					color: var(--primary-500, #2E90FA);
				}
				&_icon {
					&:not(&-fill) {
						stroke: var(--primary-500, #2E90FA);
					}
					&-fill {
						fill: var(--primary-500, #2E90FA);
					}
				}
			}
		}
		&:not(.tab-selected) {
			.footer {
				&_label {
					color: var(--gray-400, #98A2B3);
				}
				&_icon {
					&:not(&-fill) {
						stroke: var(--gray-400, #98A2B3);
					}
					&-fill {
						fill: var(--gray-400, #98A2B3);
					}
				}
			}
		}
	}
	&_label {
		text-align: center;
		font-size: 10px;
		font-weight: 500;
		letter-spacing: -0.24px;
	}
	&_icon {
		margin-bottom: 4px;
		width: 22px;
		height: 22px;
	}
}
</style>
