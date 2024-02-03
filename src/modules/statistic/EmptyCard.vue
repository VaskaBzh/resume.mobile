<template>
  <article class="empty-article">
    <div class="empty-content">
      <div>
        <!--        <img src="../assets/images/own-blank.png">-->
      </div>
      <p class="empty-text">{{ text }}</p>
    </div>
    <button class="empty-button">{{ button_text }}</button>
  </article>
</template>
<script setup>
const props = defineProps({
  text: {
    type: String,
    default: "text",
  },
  button_text: {
    type: String,
    default: "button_text",
  },
});
// import { ref, defineProps } from "vue";
//
// const props = defineProps(['text', 'empty_text'])
//
//
//
// const blankCards = ref([
//   {
//     text: t('cards_blank.autopayout'),
//     // img: require('../assets/images/autopayout-blank.png')
//   },
//   {
//     text: t('cards_blank.statistic'),
//     // img: require('../assets/images/statistic-blank.png'),
//     button: t('buttons_blank[0]'),
//   },
//   {
//     text: t('cards_blank.income_income'),
//     // img: require('../assets/images/income-blank.png')
//   },
//   {
//     text: t('cards_blank.income_payments'),
//     // img: require('../assets/images/payment-blank.png')
//   },
//   {
//     text: t('cards_blank.input_search'),
//     // img: require('../assets/images/sad-blank.png')
//   },
//   {
//     text: t('cards_blank.watcher'),
//     // img: require('../assets/images/watcher-blank.png')
//   },
// ])
</script>
<style scoped lang="scss">
.empty-article {
  border-radius: 24px;
  padding: 16px;
  background: var(--secondary-color-1);
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 4px -2px rgba(29, 41, 57, 0.05),
    0px 4px 12px -4px rgba(29, 41, 57, 0.05);
}
.empty-text {
  color: var(--gray-400);
  text-align: center;
  font-size: map-get($sub_headline, "font-size");
  line-height: map-get($sub_headline, "line-height");
  letter-spacing: map-get($sub_headline, "letter-spacing");
}
.empty-button {
  color: var(--primary-25, #f5faff);
  font-weight: 600;
  font-size: map-get($callout, "font-size");
  line-height: map-get($callout, "line-height");
  letter-spacing: map-get($callout, "letter-spacing");
  padding: 16px 0;
  border-radius: 16px;
  margin-top: 52px;
  background: var(--primary-500);
  box-shadow: 2px 2px 4px -2px rgba(29, 41, 57, 0.05),
    0px 4px 12px -4px rgba(29, 41, 57, 0.05);
}
.empty-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
</style>
