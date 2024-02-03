import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js';
import { createI18n } from 'vue-i18n';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

const localeStorageLang = localStorage.getItem('lang')
export const i18n = createI18n({
  legacy: false,  //Для composition Api - false; option Api - true
  // fallbackLocale: 'en', //Язык по умолчанию
  locale: localeStorageLang || 'en' //При загрузке приложения - подключится нужныц перевод
  // messages     // Могут хранится все переводы. Но у нас локальные файлы

})

const app = createApp(App)
  .use(IonicVue, {
    innerHTMLTemplatesEnabled: true,
  })
  .use(router)
  .use(i18n);
  
router.isReady().then(() => {
  app.mount('#app');
});