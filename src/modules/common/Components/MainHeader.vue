<template>
	<ion-header class="header" collapse="fade" v-if="pageData?.title">
		<ion-toolbar mode="ios" class="header__toolbar" :class="{ 'header__toolbar-tabs': pageData?.tabs }">
			<div class="header__content">
				<main-title @click.prevent="openSubModal(pageData)" class="header_title">
					{{
						pageData?.title === 'sub' ?
							(activeSub?.name ?
								activeSub.name :
								$t(`titles.${pageData?.title}`)) :
							$t(`titles.${pageData?.title}`)
					}}
					<main-icon :class="{ 'header_title_icon-opened': isOpenSub }" v-if="pageData?.title === 'sub'" :icon="arrow_down" class="header_title_icon" />
					<main-label class="header_title-sub" v-if="pageData?.sub_title === 'sub'">
						{{ activeSub.name ? activeSub.name:$t(`sub_titles.${pageData?.sub_title}`) }}
						<main-icon :class="{ 'header_title_icon-opened': isOpenSub }" :icon="arrow_down" class="header_title_icon" />
					</main-label>
					<main-label class="header_title-sub" v-if="pageData?.sub_title === 'sub_name'">
						{{ subList.find(sub => sub.id == router.currentRoute.value.query.group_id)?.name ?? "..." }}
					</main-label>
				</main-title>
				<main-tabs class="header__tabs" :tabs="pageData?.tabs" />
			</div>
			<ion-back-button v-if="pageData?.prev_page" :default-href="{ name: pageData?.prev_page, query: router.currentRoute.value.query }" slot="start" :icon="arrow_left" text="" class="header_button"></ion-back-button>
			<main-icon @click="router.push({ name: 'settings_sub' })" v-if="pageData?.title === 'sub'" slot="end" :icon="sub_settings" class="header_icon header_icon-sub icon-large" />
		</ion-toolbar>
		<main-modal
			class="header__modal"
			@ionModalWillPresent="isOpenSub = true; isOpenSubModal = true"
			@ionModalWillDismiss="isOpenSub = false; isOpenSubModal = false"
			:isOpen="isOpenSubModal"
		>
			<swiper
				:slides-per-view="1"
				:space-between="15"
				class="header__steps"
				:allowTouchMove="false"
				autoHeight
				@swiper="swiperInit"
			>
				<swiper-slide v-if="$route.name !== 'settings_sublist'">
					<div class="header__step">
						<main-head :title="$t('sub_modal.titles.list')" />
						<ion-list class="header__list">
							<main-item
								class="header__list_elem"
								v-for="sub in subList"
								:key="sub.id"
								@click="setActiveSub(sub.id)"
							>
								<main-icon class="icon-large header__list_icon" :icon="sub_icon" slot="start" />
								{{ sub.name }}
								<main-icon v-if="sub.id === activeId" class="header_icon header_icon-tick" :icon="tick" slot="end" />
							</main-item>
						</ion-list>
						<main-button class="header__step_button button--full" @click="swiperData.slideNext()">
							<template #text>
								{{ $t("sub_modal.buttons.list") }}
							</template>
						</main-button>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div class="header__step">
						<main-head :title="$t('sub_modal.titles.add')" :text="$t('sub_modal.text.add')" />
						<main-form class="header__form form-buttons-down" @submit.prevent="addSub(swiperData.slideNext.bind(swiperData))">
							<template #list>
								<main-input
									:placeholder="$t('sub_modal.placeholder')"
									:value="addSubForm.form.name"
									:icon="sub_icon"
									name="name"
									@changeValue="addSubForm.form.name = $event"
								/>
							</template>
							<template #buttons>
								<main-button class="header__step_button button--full" type="submit">
									<template #text>
										{{ $t("sub_modal.buttons.add") }}
									</template>
								</main-button>
							</template>
						</main-form>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div class="header__step header__step-last">
						<success-card
							:button_text="$t('sub_modal.buttons.confirm', { sub: addSubForm.form.name })"
							:text="$t('sub_modal.text.confirm', { sub: addSubForm.form.name })"
							:title="$t('sub_modal.titles.confirm', { sub: addSubForm.form.name })"
							@confirm="setActiveByName(addSubForm.form.name); closeSubModal()"
						/>
					</div>
				</swiper-slide>
			</swiper>
		</main-modal>
	</ion-header>
</template>

<script setup>
	import 'swiper/css';
	import "swiper/css/bundle";

	import { IonHeader, IonToolbar, IonBackButton, IonList } from '@ionic/vue';
	import { HeaderDataEnum } from "@/modules/common/enums/HeaderDataEnum.js";
	import { useI18n } from "vue-i18n";
	import { HeaderMessage } from "@/modules/common/Lang/HeaderMessage.js";
	import { Swiper, SwiperSlide } from "swiper/vue";
	import { onMounted, ref, watch } from "vue";
  import {
    addSub,
    addSubForm,
    closeSubModal,
    formProcess,
    isOpenSubModal,
    openSubModal,
    setActiveByName,
    setActiveSub
  } from "@/modules/common/SubService.js";
	import { activeId, activeSub, subList } from "@/modules/common/store/SubStore.js";
	
	import arrow_left from "@icon/arrow_left.svg";
	import arrow_down from "@icon/arrow_down.svg";
	import MainTitle from "@/modules/common/Components/UI/MainTitle.vue";
	import router from "@/router/index.js";
	import MainLabel from "@/modules/common/Components/UI/MainLabel.vue";
	import MainIcon from "@/modules/common/Components/UI/MainIcon.vue";
	import MainModal from "@/modules/modal/Components/MainModal.vue";
	import MainItem from "@/modules/common/Components/UI/MainItem.vue";
	import tick from "@icon/tick.svg";
	import sub_icon from "@icon/sub.svg";
	import sub_settings from "@icon/sub_settings.svg";
	import MainHead from "@/modules/common/Components/MainHead.vue";
	import MainButton from "@/modules/common/Components/UI/MainButton.vue";
	import MainForm from "@/modules/form/Components/MainForm.vue";
	import MainInput from "@/modules/common/Components/UI/MainInput.vue";
	import SuccessCard from "@/modules/common/Components/SuccessCard.vue";
	import MainTabs from "@/modules/common/Components/UI/MainTabs.vue";

	useI18n({
		useScope: 'global',
		messages: HeaderMessage
	})
	
	const swiperData = ref(null);
	
	function swiperInit(swiper) {
		swiperData.value = swiper;
	}

	const pageData = ref(null);
	
	const isOpenSub = ref(false);

	function getPageData(routeName = router.currentRoute.value.name) {
		pageData.value = HeaderDataEnum[routeName];
	}
	
	watch(() => router.currentRoute.value.name, (newName) => getPageData(newName))
	onMounted(() => {
		getPageData();
	})
</script>

<style scoped lang="scss">
.header {
	box-shadow: none;
	padding-top: env(--ion-safe-area);
	&__form {
		flex: 1 1 auto;
	}
	&_icon {
		&-sub {
			stroke: var(--primary-25, #F5FAFF);
			position: absolute;
			right: 15px;
			top: 50%;
			transform: translateY(-50%);
			z-index: 1000;
		}
	    &-tick {
	      stroke: var(--secondary-green, #1FB96C);
	    }
	}
	&__tabs {
		margin-top: 11px;
	}
	&__step {
		width: 100%;
		min-height: 630px;
		position: relative;
		display: flex;
		flex-direction: column;
		padding: 0 1.5px 0;
		&-last {
			height: fit-content;
			padding-bottom: 0;
		}
		&_button {
			margin-top: auto;
		}
	}
	&_title {
		color: var(--primary-25, #F5FAFF);
		font-family: SFProT, serif;
		&-sub {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			color: var(--primary-100, #D1E9FF);
			gap: 4px;
		}
		&_icon {
			--color: var(--primary-100, #D1E9FF);
			stroke: var(--primary-100, #D1E9FF);
			transition: all 0.5s ease 0s;
			&-opened {
				transform: rotate(180deg);
			}
		}
	}
	&__list {
		background: transparent;
		margin-bottom: 20px;
		height: 100%;
		overflow-y: scroll;
	    &_icon {
	      margin-right: 16px;
	    }
		&_elem {
			--background: transparent;
			--padding-start: 0;
			--padding-end: 0;
			--inner-border-width: 0px 0px 0.5px 0px;
			--border-color: var(--gray-200, #43474E);
			&:last-child {
				--inner-border-width: 0px 0px 0px 0px;
			}
		}
	}
	&_button {
		--min-height: 24px;
		--min-width: 24px;
		--icon-font-size: 24px;
		display: inline-flex;
		position: absolute;
		left: 15px;
		top: 50%;
		transform: translateY(-50%);
		z-index: 1000;
	}
	&__content {
		width: 100%;
		height: 100%;
	}
	&__toolbar {
		--background: transparent;
		--border-color: transparent;
		--min-height: 74px;
		--padding-bottom: 0;
		//--padding-start: 10px;
		//--padding-end: 10px;
		//--padding-bottom: 30px;
		//--padding-top: 10px;
		--color: var(--primary-25, #F5FAFF);
		//--opacity: 1;
		//--opacity-scale: 1;
		//--background: transparent;
		&-tabs {
			--min-height: 105px;
			.header {
				&__content {
					padding-top: 32px;
				}
				&_button,
				&_icon-sub {
					transform: translateY(-60%);
				}
			}
		}
	}
	//&_title {
	//	background: var(--gradient-main, linear-gradient(117deg, #024BC0 16.84%, #3597F9 103.73%));
	//}
}
</style>