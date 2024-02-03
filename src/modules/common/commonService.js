import { ref } from 'vue';
export const isHome = ref(false)
export const isStatictic = ref(false)
export const isIncome = ref(false)
export const isWorkers = ref(false)
export const isSettings = ref(false)
export const currentHeight = ref(null)
export const isLoadingPost = ref(false);
export const isDisable = ref(false);
export const isAllowed = ref(false);

//Validate
export const validateEnums = {
  strokeLetters: /[a-z]/,
  highLetters: /[A-Z]/,
  numbers: /[0-9]/,
  symbols: /[!@#\$%\^&\*,.?]/,
};
export const validateEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;


//Таймер
export const timerSecond = ref(null)
const timer = (i) => {
  const getSecond = new Promise((resolve) => {
    setTimeout(resolve, 1000);
    timerSecond.value = i
   })    
  return getSecond         
}

export const counter = async () => {
  for (let i = 59; i > -1; i--) {
    if(i === 0) {
      isSendLetter.value = false
    }
    await timer(i);
  }
}
//Есть ли асики ? (если нет - экран заглушка)
export const isHaveAsic = ref(true)