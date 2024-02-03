<template>
  <main-link @click.prevent="sendVerifyMessage()" class="verify" :class="{ 'verify-gray': service.text.length <= 7 }">
    {{ service.text.length <= 7 ? $t('re_verify') : "" }} {{ service.text }}
  </main-link>
</template>

<script>
import {VerifyMessages} from "@/modules/verify/lang/VerifyMessages";
import {VerifyService} from "@/modules/verify/services/VerifyService";

import MainLink from "@/modules/common/Components/UI/MainLink.vue";
import {useI18n} from "vue-i18n";

export default {
  components: {MainLink},
  props: {
    verifyText: String,
    data: Object,
    verifyUrl: {
      type: String,
      default: "/email/verify",
    },
    sendVerification: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    const {t} = useI18n(
        {
          useScope: 'global',
          messages: VerifyMessages,
        },
    )
    return {
      t
    }
  },

  name: "verify-link",
  data() {
    return {
      service: new VerifyService(),
    };
  },
  watch: {
    sendVerification(newSendVerificationState) {
      if (newSendVerificationState) {
        this.service.setTimer(60000);
      }
    }
  },
  methods: {
    sendVerifyMessage() {
      const status = this.service.sendEmailVerification(this.verifyUrl, this.data);
      this.$emit("sendVerification", status)
      this.service.setTimer(60000);
    },
  },
  mounted() {
    if (this.sendVerification) {
      this.service.setTimer(60000);
    }
    this.service.setVerifyText(this.$t("verify_link"));
    this.service.setText();
  },
}
</script>

<style scoped lang="scss">
.verify {
	&-gray {
		--color: var(--gray-400, #6F7682);
	}
}
</style>
