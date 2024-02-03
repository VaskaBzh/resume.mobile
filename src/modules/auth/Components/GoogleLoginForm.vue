<template>
	<div class="fac__step">
		<main-head
			:title="$t(`google.title`)"
			:text="$t(`google.text`)"
            class="head-no-theme"
		/>
		<main-form class="fac__form form-buttons-down" @submit.prevent="$emit('getCode', codeInput)">
			<template #list>
				<input-code class="code-no-theme" name="code" :code_length="6" @changeValue="codeInput = $event" />
			</template>
			<template #buttons>
				<main-button class="button--full fac_button" type="submit">
					<template #text>
						{{ $t(`google.button`) }}
					</template>
				</main-button>
			</template>
		</main-form>
	</div>
</template>
<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { AuthMessage } from "@/modules/auth/lang/AuthMessage.js";

import MainButton from "@/modules/common/Components/UI/MainButton.vue";
import MainHead from "@/modules/common/Components/MainHead.vue";
import InputCode from "@/modules/common/Components/UI/InputCode.vue";
import MainForm from "@/modules/form/Components/MainForm.vue";

useI18n({
	useScope: "global",
	messages: AuthMessage,
});

const codeInput = ref("");
</script>
<style scoped lang="scss">
.fac {
	&__form {
		flex: 1 1 auto;
	}
	&__step {
		min-height: 404px;
		display: flex;
		flex-direction: column;
	}
	&_button {
		margin-top: auto;
	}
	&__block {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		min-height: 600px;
	}
}
</style>