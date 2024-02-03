<template>
   <article class="article-feedback">
    <h3 class="title-modal">{{ $t('title_feedback') }}</h3>
    <div class="button-container">
      <main-button :size="'small'">
        <template #text>
          <div class="content">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
              <path d="M22.47 18.33C22.47 18.69 22.39 19.06 22.22 19.42C22.05 19.78 21.83 20.12 21.54 20.44C21.05 20.98 20.51 21.37 19.9 21.62C19.3 21.87 18.65 22 17.95 22C16.93 22 15.84 21.76 14.69 21.27C13.54 20.78 12.39 20.12 11.25 19.29C10.0881 18.4401 8.99169 17.5041 7.97 16.49C6.95877 15.472 6.0261 14.3789 5.18 13.22C4.36 12.08 3.7 10.94 3.22 9.81C2.74 8.67 2.5 7.58 2.5 6.54C2.5 5.86 2.62 5.21 2.86 4.61C3.1 4 3.48 3.44 4.01 2.94C4.65 2.31 5.35 2 6.09 2C6.37 2 6.65 2.06 6.9 2.18C7.16 2.3 7.39 2.48 7.57 2.74L9.89 6.01C10.07 6.26 10.2 6.49 10.29 6.71C10.38 6.92 10.43 7.13 10.43 7.32C10.43 7.56 10.36 7.8 10.22 8.03C10.09 8.26 9.9 8.5 9.66 8.74L8.9 9.53C8.79 9.64 8.74 9.77 8.74 9.93C8.74 10.01 8.75 10.08 8.77 10.16C8.8 10.24 8.83 10.3 8.85 10.36C9.03 10.69 9.34 11.12 9.78 11.64C10.23 12.16 10.71 12.69 11.23 13.22C11.77 13.75 12.29 14.24 12.82 14.69C13.34 15.13 13.77 15.43 14.11 15.61C14.16 15.63 14.22 15.66 14.29 15.69C14.37 15.72 14.45 15.73 14.54 15.73C14.71 15.73 14.84 15.67 14.95 15.56L15.71 14.81C15.96 14.56 16.2 14.37 16.43 14.25C16.66 14.11 16.89 14.04 17.14 14.04C17.33 14.04 17.53 14.08 17.75 14.17C17.97 14.26 18.2 14.39 18.45 14.56L21.76 16.91C22.02 17.09 22.2 17.3 22.31 17.55C22.41 17.8 22.47 18.05 22.47 18.33Z" stroke="#F5FAFF" stroke-width="1.5" stroke-miterlimit="10"/>
            </svg>
            <a href="tel:+79853529062">{{ $t('button_feedback') }}</a>
          </div>
        </template>
    </main-button>
    <main-button :size="'small'">
      <template #text>
        <div class="content">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M11.9854 15.4083L15.2268 19.0936C16.4277 20.4589 17.0282 21.1416 17.6567 20.9754C18.2852 20.8092 18.5008 19.9108 18.9318 18.1138L21.3229 8.1459C21.9868 5.37832 22.3187 3.99454 21.5808 3.312C20.843 2.62947 19.564 3.13725 17.0061 4.15282L5.13876 8.86449C3.09293 9.67674 2.07001 10.0829 2.00507 10.7808C1.99842 10.8522 1.99831 10.9241 2.00474 10.9955C2.06754 11.6937 3.08921 12.1033 5.13255 12.9223C6.05838 13.2934 6.5213 13.479 6.8532 13.8344C6.89052 13.8743 6.9264 13.9157 6.96078 13.9584C7.26658 14.3384 7.39709 14.8371 7.65808 15.8344L8.14653 17.701C8.4005 18.6715 8.52749 19.1568 8.86008 19.223C9.19267 19.2891 9.48225 18.8867 10.0614 18.0819L11.9854 15.4083ZM11.9854 15.4083L11.6676 15.0771C11.3059 14.7001 11.1251 14.5117 11.1251 14.2775C11.1251 14.0433 11.3059 13.8548 11.6676 13.4778L15.2406 9.75409" stroke="#F5FAFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <a href="https://t.me/allbtc_support">Telegram</a>
        </div>
      </template>
    </main-button>
    <main-button :size="'small'">
      <template #text>
        <div class="content">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
            <path d="M17.5 9L14.37 11.5C13.34 12.32 11.65 12.32 10.62 11.5L7.5 9M17.5 20.5H7.5C4.5 20.5 2.5 19 2.5 15.5V8.5C2.5 5 4.5 3.5 7.5 3.5H17.5C20.5 3.5 22.5 5 22.5 8.5V15.5C22.5 19 20.5 20.5 17.5 20.5Z" stroke="#F5FAFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <a href="mailto:support@all-btc.com">Email</a>
        </div>
      </template>
    </main-button>
    </div>
   </article>
</template>
<script setup>
  import { useI18n } from 'vue-i18n';
  import MainButton from "@/modules/common/Components/UI/MainButton.vue";
    const { t } = useI18n({
        useScope: 'global',
    })
</script>
<style scoped lang="scss">
.article-feedback{
  padding: 24px 16px 58px;
}
.title-modal{
  margin-bottom: 24px;
}
a{
  color: var(--primary-25, #F5FAFF);
  text-decoration: none;
  font-weight: 600;
  font-size: map-get($callout, "font-size");
  line-height:  map-get($callout, "line-height");
  letter-spacing: map-get($callout, "letter-spacing");
}
.content{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
.button-container{
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>