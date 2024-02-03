<template>
  <page-container>
    <lists-container>
      <main-list
        :label="$t('settings_list.label[5]')"
        :items="cardsAcc"
        @clicked="redirectTo"
      ></main-list>
      <main-list
        :label="$t('settings_list.label[0]')"
        :items="cardsSub"
        @clicked="redirectTo"
      ></main-list>
      <main-list
        :label="$t('settings_list.label[1]')"
        :items="cardsInterface"
      ></main-list>
      <a href="https://t.me/allbtc_support">
        <main-list
          :label="$t('settings_list.label[6]')"
          :items="cardsSupport"
        ></main-list>
      </a>
    </lists-container>
    <chose-language-popup triggerId="lang" />
    <chose-theme-popup triggerId="theme" />
  </page-container>
</template>
<script setup>
import { reactive, ref, watch, computed } from "vue";
import { SettingsMessage } from "@/modules/settings/lang/SettingsMessage.js";
import { user } from "@/modules/user/UserService.js";
import { useI18n } from "vue-i18n";
import { onIonViewWillEnter } from "@ionic/vue";
import MainList from "@/modules/common/Components/UI/MainList.vue";
import router from "@/router/index.js";
import lang from "@icon/lang.svg";
import theme from "@icon/theme.svg";
import sub_settings from "@icon/sub_settings.svg";
import sub_edit from "@icon/sub_edit.svg";
import case_icon from "@icon/case.svg";
import supp_icon from "@icon/emailBlue.svg";
import ListsContainer from "@/modules/common/Components/ListsContainer.vue";
import PageContainer from "@/modules/common/Components/PageContainer.vue";
import LayoutMain from "@/layouts/LayoutMain.vue";
import MainHeader from "@/modules/common/Components/MainHeader.vue";
import ChoseLanguagePopup from "@/modules/common/Components/ChoseLanguagePopup.vue";
import ChoseThemePopup from "@/modules/common/Components/ChoseThemePopup.vue";

const { t } = useI18n({
  useScope: "global",
  messages: SettingsMessage,
});

const { locale } = useI18n({
  useScope: "global",
});

const cardsAcc = computed(() => {
	if (user.value?.has_referrer_role) {
		return [
			{
				name: t("settings_list.li[9]"),
				value: "settings_user",
				arrow_right: true,
				icon: sub_edit,
			},
			{
				name: t("settings_list.li[1]"),
				value: "referral_cabinet",
				arrow_right: true,
				icon: case_icon,
			}
		]
	}
	
	return [
		{
			name: t("settings_list.li[9]"),
			value: "settings_user",
			arrow_right: true,
			icon: sub_edit,
		},
	]
});

const cardsSub = ref([
  {
    name: computed(() => t("settings_list.li[0]")),
    icon: sub_settings,
    value: "settings_sublist",
    arrow_right: true,
  },
]);

const cardsInterface = ref([
  {
    name: computed(() => t("settings_list.li[2]")),
    icon: theme,
    id: "theme",
    arrow_right: true,
  },
  {
    name: computed(() => t("settings_list.li[3]")),
    icon: lang,
    id: "lang",
    arrow_right: true,
  },
]);

const cardsSupport = ref([
  {
    name: computed(() => t("settings_list.li[12]")),
    arrow_right: true,
    icon: supp_icon,
  },
]);

const redirectTo = (routeName) => {
  router.push({
    name: routeName,
  });
};
</script>

<style scoped lang="scss">
.settings {
  &__items {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
}
.settings-main {
  width: 100%;
  height: 91vh;
  display: flex;
  padding: 0px 16px 0px 16px;
  flex-direction: column;
  align-items: flex-start;
}
svg {
  stroke: var(--primary-400);
}
.title-card {
  color: var(--gray-400);
  font-weight: 400;
  font-size: map-get($sub_headline, "font-size");
  line-height: map-get($sub_headline, "line-height");
  letter-spacing: map-get($sub_headline, "letter-spacing");
  padding: 24px 0 8px 16px;
}
.settings-header {
  width: 100%;
  min-height: calc(9vh + 28px);
  color: #d1e9ff;
}
.settings-title {
  color: #f5faff;
  padding-top: 5.5vh;
  text-align: center;
  font-style: normal;
  font-weight: 600;
  font-size: map-get($body, "font-size");
  line-height: map-get($body, "line-height");
  letter-spacing: map-get($body, "letter-spacing");
}

a {
  text-decoration: none;
}
</style>
