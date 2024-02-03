<template>
  <article class="info">
    <div class="info__header">
      <p class="info_title">
        <slot name="title"></slot>
      </p>
      <main-alert
        v-if="header"
        class="icon-large"
        :id="id"
        :header="header"
        :message="message"
        :buttons="buttons"
      />
    </div>
    <div class="info__body">
      <span
        class="info_text"
        :class="{
          'info_text-red': color === 'red',
          'info_text-green': color === 'green',
          'info_text-blue': color === 'blue',
        }"
      >
        <slot name="num"></slot>
      </span>
      <span class="info_unit">
        <slot name="unit"></slot>
      </span>
    </div>
  </article>
</template>
<script setup>
import { defineProps } from "vue";
import MainAlert from "@/modules/common/Components/UI/MainAlert.vue";
const props = defineProps({
  color: {
    type: String,
  },
  icon: {
    type: String,
  },
  id: {
    type: String,
  },
  header: {
    type: String,
  },
  message: {
    type: String,
  },
  buttons: {
    type: Array,
    default: () => ["button_text"],
  },
});
</script>
<style scoped lang="scss">
.info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-radius: 16px;
  padding: 12px 16px;
  background: var(--secondary-color-1, #595e68);
  flex: 1 1 auto;
  min-height: 60px;
  box-shadow: 2px 3px 6px -2px rgba(9, 10, 11, 0.10);
  font-family: SFProT, serif;
  &__body {
    display: flex;
    align-items: flex-end;
    gap: 4px;
  }
  &__header {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  &_title {
    color: var(--gray-400, #6F7682);
    font-style: normal;
    font-weight: 400;
    font-size: map-get($caption_2, "font-size");
    line-height: map-get($caption_2, "line-height");
    letter-spacing: map-get($caption_2, "letter-spacing");
  }
  &_text {
    color: var(--gray-80080, rgba(241, 241, 242, 0.8));
    font-style: normal;
    font-weight: 600;
    padding-right: 4px;
    font-size: map-get($title_3, "font-size");
    line-height: map-get($title_3, "line-height");
    letter-spacing: map-get($title_3, "letter-spacing");
    font-family: SFProD, serif;
    &-red {
      color: var(--secondary-red, #f1404a);
    }
    &-green {
      color: var(--secondary-green, #1FB96C);
    }
    &-blue {
      color: #2e90fa;
    }
  }
  &_unit {
    color: var(--gray-300, #595e68);
    font-style: normal;
    font-weight: 400;
    font-size: map-get($sub_headline, "font-size");
    line-height: map-get($sub_headline, "line-height");
    letter-spacing: map-get($sub_headline, "letter-spacing");
  }
}
</style>
