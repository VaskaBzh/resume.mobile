<!--<template>-->
<!--  <article class="FAQ-container">-->
<!--    <h3 class="title">FAQ</h3>-->
<!--    <div class="search-container">-->
<!--      <SearchInput></SearchInput>-->
<!--    </div>-->
<!--    <div v-for="(card, index) in faqCards" :key="index">-->
<!--      <p class="accordion-title">{{ card.title }}</p>-->
<!--      <ion-accordion-group  expand="inset" v-for="(item, index) in card.content">-->
<!--        <ion-accordion value="first" :toggle-icon="icon" >-->
<!--          <ion-item slot="header" :lines="(card.content.length - 1) == index ? 'none' : 'inset'">-->
<!--            <ion-label>{{ item.question }}</ion-label>-->
<!--          </ion-item>-->
<!--          <div class="ion-content-text" slot="content">{{ item.answer }}</div>-->
<!--        </ion-accordion>-->
<!--      </ion-accordion-group>-->
<!--    </div>-->
<!--  </article>-->
<!--</template>-->
<!--<script setup>-->
<!--  import SearchInput from '../../Common/Components/UI/SearchInput.vue';-->
<!--  import { IonAccordion, IonAccordionGroup, IonItem, IonLabel } from '@ionic/vue';-->
<!--  import { ref } from 'vue'-->
<!--  const icon = `data:image/svg+xml;utf8,<svg width="64px" height="64px" viewBox="-4.56 -4.56 33.12 33.12" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 9L12 17L20 9" stroke="#d0d5dd" stroke-width="2.088" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>-->
<!--    `-->
<!--  const faqCards = ref([-->
<!--    {-->
<!--      title: 'Как начать майнить с Allbtc Pool?',-->
<!--      content: -->
<!--      [-->
<!--        {-->
<!--          question: 'Что такое Allbtc Pool?',-->
<!--          answer: 'First Content'-->
<!--        },-->
<!--        {-->
<!--          question: 'Как работают выплаты в Allbtc Pool?',-->
<!--          answer: 'Allbtc pool использует схему выплаты PPLNS (pay-per-last-N-shares). Когда пул находит блок, он распределяет награду между всеми участниками, учитывая их долю в последней серии. Сумма вознаграждения равняется награде за блок, умноженной на долю каждого участника в серии. Выплаты происходят автоматически после нахождения блока и обычно происходят каждые несколько часов. '-->
<!--        },-->
<!--        {-->
<!--          question: 'Чем отличается фактический хэшрейт от заявленного?',-->
<!--          answer: 'Third Content'-->
<!--        },-->
<!--      ]-->
<!--    },-->
<!--    {-->
<!--      title: 'Безопасность аккаунта',-->
<!--      content:-->
<!--      [-->
<!--        {-->
<!--          question: 'Как обезопасить свой аккаунт в Allbtc Pool?',-->
<!--          answer: 'First Content'-->
<!--        },-->
<!--        {-->
<!--          question: 'Как защитить свой кошелек?',-->
<!--          answer: 'Second content'-->
<!--        },-->
<!--        {-->
<!--          question: 'Как защититься от фрода?',-->
<!--          answer: 'Third Content'-->
<!--        }-->
<!--      ]-->
<!--    },-->
<!--  ])-->
<!--</script>-->
<!--<style scoped lang="scss">-->
<!--.FAQ-container{-->
<!--  padding: 24px 16px;-->
<!--  background: var( &#45;&#45;background-bg);-->
<!--  margin-bottom: 40px;-->
<!--  border-radius: 28px 28px 0px 0px;-->
<!--}-->
<!--.accordion-title{-->
<!--  color: var(&#45;&#45;gray-400);-->
<!--  font-size: map-get($sub_headline, "font-size");-->
<!--  line-height:  map-get($sub_headline, "line-height");-->
<!--  letter-spacing: map-get($sub_headline, "letter-spacing");-->
<!--  margin: 16px 0 8px 16px;-->
<!--}-->
<!--.ion-content-text{-->
<!--  color: var(&#45;&#45;gray-400);-->
<!--  padding: 12px 16px;-->
<!--  font-size: map-get($foot_note, "font-size");-->
<!--  line-height:  map-get($foot_note, "line-height");-->
<!--  letter-spacing: map-get($foot_note, "letter-spacing");-->
<!--}-->
<!--ion-label{-->
<!--  color: var(&#45;&#45;gray-700);-->
<!--  font-size: map-get($sub_headline, "font-size");-->
<!--  line-height:  map-get($sub_headline, "line-height");-->
<!--  letter-spacing: map-get($sub_headline, "letter-spacing");-->
<!--}-->
<!--.title{-->
<!--  margin-bottom: 24px;-->
<!--}-->
<!--ion-accordion.accordion-collapsing ion-item[slot='header'],-->
<!--  ion-accordion.accordion-collapsed ion-item[slot='header'],-->
<!--  ion-accordion.accordion-expanding ion-item[slot='header'],-->
<!--  ion-accordion.accordion-expanded ion-item[slot='header'] {-->
<!--    color: var(&#45;&#45;gray-700);-->
<!--    font-size: map-get($sub_headline, "font-size");-->
<!--    line-height:  map-get($sub_headline, "line-height");-->
<!--    letter-spacing: map-get($sub_headline, "letter-spacing");-->
<!--    &#45;&#45;border-width: 0;-->
<!--  }-->
<!--.search-container{-->
<!--  margin-bottom: 34px ;-->
<!--}-->
<!--div[slot='content'] {-->
<!--  background: var(&#45;&#45;secondary-color-1);-->
<!--}-->
<!--</style>-->