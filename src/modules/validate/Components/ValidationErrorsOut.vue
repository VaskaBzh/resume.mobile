<template>
	<div class="errors">
	    <div
		    class="errors__main"
		    v-for="(errorName, i) in list_name"
		    :key="i"
	    >
		    <transition name="list">
			    <div
				    class="errors__container"
				    v-show="
			            error_list[errorName]?.length > 0 || errors[errorName]?.length > 0
			        "
			    >
				    <div
					    v-for="(error, i) in error_list[errorName] ?? errors[errorName]"
					    :key="i"
					    v-t="error"
					    class="errors_elem"
				    ></div>
			    </div>
	        </transition>
	    </div>
	</div>
</template>

<script setup>
import { ValidationErrorMessages } from "@/modules/validate/lang/ValidationErrorMessages";
import { useI18n } from "vue-i18n";
import { errors } from "@/modules/errors/store/ErrorStore.js";
import { ref, watch } from "vue";

const props = defineProps({
	error_list: {
		type: Object,
		default: {},
	},
	list_name: {
		type: Array,
		default: [""],
	},
})

useI18n({
	useScope: 'global',
	messages: ValidationErrorMessages,
})
</script>

<style scoped lang="scss">
.errors {
    padding: 4px 0 0;
	&__container {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	&-no-theme {
		.error {
			&_elem {
				color: #f1404a;
			}
		}
	}
    &_elem {
	    font-family: SFProT, serif;
        color: var(--secondary-red, #f1404a);
	    font-size: map-get($foot_note, "font-size");
	    font-weight: 400;
	    line-height: map-get($foot_note, "line-height");
	    letter-spacing: map-get($foot_note, "letter-spacing");
    }
}
.list-enter-active,
.list-leave-active {
	transition: all 0.35s ease-in-out;
}
.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(-30px);
	max-height: 0;
	padding-top: 0;
}
</style>
