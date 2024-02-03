<template>
	<ion-page class="page">
	    <ion-content class="page__container" :class="{ 'page__container-loader': (isSubsLoading || isUserLoading) && !UnSpinnerPagesEnum[$route.name] }">
	      <ion-content class="page__content">
	        <ion-refresher class="page_refresher" slot="fixed" :pull-factor="0.5" :pull-min="60" :pull-max="80" @ionRefresh="handleRefresh($event)">
	          <ion-refresher-content
	              class="page_refresher_content"
	              refreshing-spinner="crescent"
	          />
	        </ion-refresher>
	        <ion-spinner name="crescent" class="page_spinner" v-if="(isSubsLoading || isUserLoading) && !UnSpinnerPagesEnum[$route.name]"/>
	        <slot v-else/>
	      </ion-content>
	    </ion-content>
	</ion-page>
</template>

<script setup>
import { IonContent, IonSpinner, IonPage, IonRefresher, IonRefresherContent } from '@ionic/vue';
import { isSubsLoading } from "@/modules/common/SubService.js";
import { isUserLoading } from "@/modules/user/UserService.js";
import {UnSpinnerPagesEnum} from "@/modules/common/enums/UnSpinnerPagesEnum.js";

const handleRefresh = (event) => {
  location.reload();
  // event.target.complete();
};
</script>

<style scoped lang="scss">
.page {
	background: inherit;
	overflow: hidden;
	border-radius: 28px 28px 0 0;
	&-smooth {
		border-radius: 0 0 0 0;
	}
	&-no-theme {
		.page {
			&_spinner {
				color: #2E90FA;
			}
			&__container {
				--background: #16181A;
				
				&::part(background) {
					border-radius: 0 0 0 0;
				}
			}
		}
	}
	&_spinner {
		color: var(--primary-500, #2E90FA);
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
	&__content {
		--padding-top: 24px;
		--padding-bottom: calc(48px + var(--ion-safe-area-bottom, 0));
		--padding-start: calc(16px + var(--ion-safe-area-left, 0));
		--padding-end: calc(16px + var(--ion-safe-area-right, 0));
		--background: transparent;
	
		&::part(scroll) {
			display: flex;
			flex-direction: column;
			width: 100%;
		}
	}
	&__container {
		--background: var(--background-bg, #16181A);
	    --padding-top: 0;
	    --padding-bottom: 0;
	    --padding-start: 0;
	    --padding-end: 0;
	    position: relative;
		
		&::part(background) {
			border-radius: 28px 28px 0 0;
		}
	}
}
</style>