<template>
  <div class="container">
    <div v-for="(card, index) in cards" :key="index">
      <p class="accordion-title">{{ card.title }}</p>

      <ion-accordion-group expand="inset">
        <ion-accordion
          v-for="(item, index) in card.content"
          :key="index"
          :value="index"
        >
          <ion-item slot="header">
            <ion-label>{{ item.question }}</ion-label>
          </ion-item>
          <div class="ion-content-text" slot="content">{{ item.answer }}</div>
        </ion-accordion>
      </ion-accordion-group>
    </div>
  </div>
</template>

<script setup>
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel } from "@ionic/vue";
import { defineComponent, defineProps, PropType, ref } from "vue";

const components = defineComponent({
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
});

//Для проверки пока нет пропсов

// const cards = ref([
//   {
//     title: "Как начать майнить с Allbtc Pool?",
//     content: [
//       {
//         question: "Что такое Allbtc Pool?",
//         answer:
//           "First Content Allbtc pool использует схему выплаты PPLNS (pay-per-last-N-shares). Когда пул н",
//       },
//       {
//         question: "Как работают выплаты в Allbtc Pool?",
//         answer:
//           "Allbtc pool использует схему выплаты PPLNS (pay-per-last-N-shares). Когда пул находит блок, он распределяет награду между всеми участниками, учитывая их долю в последней серии. Сумма вознаграждения равняется награде за блок, умноженной на долю каждого участника в серии. Выплаты происходят автоматически после нахождения блока и обычно происходят каждые несколько часов. ",
//       },
//       {
//         question: "Чем отличается фактический хэшрейт от заявленного?",
//         answer:
//           "Third Content Allbtc pool использует схему выплаты PPLNS (pay-per-last-N-shares). Когда пул н",
//       },
//     ],
//   },
//   {
//     title: "Безопасность аккаунта",
//     content: [
//       {
//         question: "Как обезопасить свой аккаунт в Allbtc Pool?",
//         answer:
//           "Allbtc pool использует схему выплаты PPLNS (pay-per-last-N-shares). Когда пул нFirst Content",
//       },
//       {
//         question: "Как защитить свой кошелек?",
//         answer:
//           "Allbtc pool использует схему выплаты PPLNS (pay-per-last-N-shares). Когда пул нSecond content",
//       },
//       {
//         question: "Как защититься от фрода?",
//         answer:
//           "Third Allbtc pool использует схему выплаты PPLNS (pay-per-last-N-shares). Когда пул нContent",
//       },
//     ],
//   },
// ]);

const props = defineProps({
  cards: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.accordion-title {
  color: var(--gray-400);
  font-size: map-get($sub_headline, "font-size");
  line-height: map-get($sub_headline, "line-height");
  letter-spacing: map-get($sub_headline, "letter-spacing");
  margin: 0px 0 8px 16px;
}
.ion-content-text {
  color: var(--gray-400);
  padding: 12px 16px;
  font-size: map-get($foot_note, "font-size");
  line-height: map-get($foot_note, "line-height");
  letter-spacing: map-get($foot_note, "letter-spacing");
}
</style>
