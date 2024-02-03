  import { ref } from 'vue'
  // import { isSubList } from '../Subaccaunt/subaccaunts'

  export const dragModalView = ref() //Переменная, хранящая саму модалку (элемент в доме)

  export const isOpen = ref(false) //Открыта ли модалка
  export const isTouch = ref(false)  //Произошел ли таб внутри модалки
  export const isClose = ref(false)  //Закрыта ли модалка пальцем - то есть скроллом
  export const currentPosition = ref(null) //Текущая позиция текущего таба ( где именно табнули)
  export const toScroll = ref()  //То НАСКОЛЬКО произайдет скролл модалки по оси Y когда мы водим пальцем 
  export const isScrollDown = ref(false) //Произошел ли скролл ВНУТРИ модалки ВНИЗ - чтобы понять необходимо ли ее закрытие
  export const isScrollUp = ref(false) //Произошел ли скролл ВНУТРИ модалки ВВЕРХ- чтобы понять необходимо ли ее вернуть на место
  export const upModalAnimation = ref(false) //Анимация поднятия модалки при скролле пальцем вверх(isScrollUp = true)
  export const firstOpenModal = ref(false) // Происходит конфликт двух анимаций поднятия модалок, поэтому надо через переменную использовать самую первую

  //Переменные связанные с открытием каждой конкретной модалки (чтобы не происходило открытие всех сразу)
  export const isOpenLang = ref(false);
  export const isOpenReset = ref(false);
  export const isOpenSecuritySms = ref(false);
  export const isOpenSecurityGoogle = ref(false);
  export const isOpenAddSub = ref(false);
  export const isOpenFaq = ref(false);
  export const isOpenCalc = ref(false);
  export const isOpenFeedback = ref(false);
  export const isOpenAddWallet = ref(false);
  export const isOpenEmail = ref(false);
  export const isOpenPassword = ref(false);
  export const isOpenNumber = ref(false);
  export const isOpenAddWalletEdit = ref(false);
  export const isOpenAddSubWatcher = ref(false);
  export const isOpenChange = ref(false);
  export const isOpenAddWatcher = ref(false);
  export const isOpenTheme = ref(false);
  export const isOpenSubListStatistic = ref(false);
  export const isOpenSubListIncome = ref(false);
  export const isOpenSubListWorkers = ref(false);
  export const isOpenMinThreshold = ref(false)
  export const isOpenСurrency = ref(false)

  // Открытие модалки - функция навешена по клику
  export const openModal = (name) => {
    isOpen.value = true
    firstOpenModal.value = true
    isClose.value = false
    currentPosition.value = null
    changeModalState(name)
  }
  // Начало таба по модалке(области, которая скроллится)
  export const touchStart = (e) => {
    firstOpenModal.value = false
    upModalAnimation.value = false
    currentPosition.value = e
    isTouch.value = true
    isClose.value = false
    isScrollUp.value = false
  }
  // Поднятие пальца с экрана
  export const touchEnd = (isClick) => {
    if(isClick == 'click'){
      isScrollDown.value = true
      isScrollUp.value = false
    }
    if (isScrollDown.value){
      isTouch.value = false
      isClose.value = true
      setTimeout(() => {
        isOpen.value = false
        closeAllModal()
      }, 300);
      isScrollDown.value = false
    }
    if(isScrollUp.value){
      upModalAnimation.value = true
      setTimeout(() => {
        modalDrag.style.bottom = '0px'
      }, 250);
    }
  }
  // Сама логика, в которой мы получаем значение на сколько пикселей палец опускается/поднимается
  export const draggModal = (e) => {
    toScroll.value = e.touches[0].pageY - currentPosition.value.touches[0].pageY
  }

  //Меняем состояние переменных для открытия нужной модалки
   const changeModalState = (name) => {
    switch(name){
      case 'lang':
        isOpenLang.value = true; break;
      case 'reset':
        isOpenReset.value = true; break;
      case 'sms':
        isOpenSecuritySms.value = true; break;
      case 'google':
        isOpenSecurityGoogle.value = true; break;
      case 'add-sub':
        isOpenAddSub.value = true; break;
      case 'faq':
        isOpenFaq.value = true; break;
      case 'calc':
        isOpenCalc.value = true; break;
      case 'add-wallet':
        isOpenAddWallet.value = true; break;
      case 'add-sub-watcher':
        isOpenAddSubWatcher.value = true; break;
      case 'change':
        isOpenChange.value = true; break;
      case 'add-watcher':
        isOpenAddWatcher.value = true; break;
      case 'email':
        isOpenEmail.value = true; break;
      case 'password':
        isOpenPassword.value = true; break;
      case 'sub-list-workers':
        isOpenSubListWorkers.value = true; break;
      case 'sub-list-statistic':
        isOpenSubListStatistic.value = true; break;
      case 'sub-list-income':
        isOpenSubListIncome.value = true; break;
      case 'number':
        isOpenNumber.value = true; break;
      case 'feeddback':
        isOpenFeedback.value = true; break;
      case 'add-wallet-edit':
        isOpenAddWalletEdit.value = true; break;
      case 'theme':
        isOpenTheme.value = true; break;
      case 'min-threshold':
        isOpenMinThreshold.value = true; break
      case 'currency':
        isOpenСurrency.value = true; break  
    }
  }
  //Закрытие всех модалок
  export const closeAllModal = () => {
    isOpenReset.value = false;
    isOpenLang.value = false;
    isOpenSecuritySms.value = false;
    isOpenSecurityGoogle.value = false;
    isOpenAddSub.value = false;
    isOpenFaq.value = false;
    isOpenCalc.value = false;
    isOpenFeedback.value = false;
    isOpenAddWallet.value = false;
    isOpenEmail.value = false;
    isOpenPassword.value = false;
    isOpenNumber.value = false;
    isOpenAddWalletEdit.value = false;
    isOpenAddSubWatcher.value = false;
    isOpenChange.value = false;
    isOpenAddWatcher.value = false;
    isOpenTheme.value = false;
    isOpenSubListWorkers.value = false;
    isOpenSubListIncome.value = false;
    isOpenSubListStatistic.value = false;
    isOpenMinThreshold.value = false
    isOpenСurrency.value = false
    isSubList.value = true  //Не опечатка, так надо чтобы при открытии сабов - всегда первым экраном шел лист
  }