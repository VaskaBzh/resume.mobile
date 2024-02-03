<template>
  <main-head
    :title="$t('change_password.title')"
    :text="$t('change_password.text')"
  />
  <main-form @submit.prevent="changePassword">
    <template #list>
      <main-input
        :placeholder="$t('change_password.inputs.placeholder[0]')"
        :label="$t('change_password.inputs.label[0]')"
        :value="changePasswordForm.old_password"
        :icon="eye"
        type="text"
        name="name"
        @changeValue="changePasswordForm.old_password = $event"
      />
      <main-input
        :placeholder="$t('change_password.inputs.placeholder[1]')"
        :label="$t('change_password.inputs.label[1]')"
        :value="changePasswordForm.password"
        :icon="eye"
        type="text"
        name="name"
        @changeValue="changePasswordForm.password = $event"
      />
      <main-input
        :placeholder="$t('change_password.inputs.placeholder[2]')"
        :label="$t('change_password.inputs.label[2]')"
        :value="changePasswordForm.password_confirmation"
        :icon="eye"
        type="text"
        name="name"
        @changeValue="changePasswordForm.password_confirmation = $event"
      />
    </template>
    <template #buttons>
      <main-button type="submit" class="button--full">
        <template #text>
          {{ $t("change_password.buttons.change") }}
        </template>
      </main-button>
    </template>
  </main-form>
  <success-card
    :title="$t('change_password.success.title')"
    :text="$t('change_password.success.text')"
    :button_text="$t('change_password.buttons.close')"
  />
</template>

<script setup>
import { useI18n } from "vue-i18n";
import {
  changePasswordForm,
  changePassword,
} from "@/modules/user/UserService.js";
import { AuthMessage } from "@/modules/auth/lang/AuthMessage.js";
import PageContainer from "@/modules/common/Components/PageContainer.vue";
import MainForm from "@/modules/form/Components/MainForm.vue";
import MainInput from "@/modules/common/Components/UI/MainInput.vue";
import MainButton from "@/modules/common/Components/UI/MainButton.vue";
import SuccessCard from "@/modules/common/Components/SuccessCard.vue";
import MainHead from "@/modules/common/Components/MainHead.vue";
import eye from "@icon/eye.svg";

const { locale } = useI18n({
  useScope: "global",
  messages: AuthMessage,
});
</script>

<style lang="scss" scoped></style>
