<template>
	<form class="form">
		<ion-list lines="none" class="form__list">
			<slot name="list" />
		</ion-list>
		<div class="form__content" v-if="$slots.content">
			<slot name="content" />
		</div>
		<div class="form__buttons">
			<slot name="buttons" />
		</div>
	</form>
</template>

<script setup>
import { IonList } from "@ionic/vue";


</script>

<style scoped lang="scss">
.form {
	display: flex;
	flex-direction: column;
  &-up {
    .form {
      &__content {
        margin-top: 0;
        margin-bottom: auto;
      }
      &__list {
        margin-bottom: 24px;
      }
    }
  }
	&-no-labels {
		.form {
			&__list {
				gap: 12px;
			}
		}
	}
  &-content-down {
    .form {
      &__content {
        margin-bottom: 12px;
      }
    }
  }
  &-buttons-down {
    .form {
      &__buttons {
        margin-top: auto;
      }
    }
  }
	&__content {
		margin-top: auto;
		margin-bottom: 24px;
	}
	&__list {
		background: transparent;
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-bottom: 56px;
	}
	&__buttons {
		display: flex;
		flex-wrap: nowrap;
		gap: 8px;
		margin-top: 8px;
	}
}
</style>