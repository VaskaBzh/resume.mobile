import { ref, computed } from 'vue';
import { api } from '@/api/api.js';
import { isLoading, validateEnums } from "@/modules/common/commonService.js";

import { currentMinThreshold, getPendingAmount } from "@/modules/income/incomeService.js";
import { id } from "@/modules/user/UserService.js";
import {SubData} from "@/modules/sub_accounts/DTO/SubData.js";

export const subsList = ref([])
export let currentSub = ref({})
export const menuType = ref('');
export const newSubName = ref('')
export const isAccountExist = ref(null)
export const successfulCreate = ref(false)
export const isSubList = ref(true) //переменная для отображения саб листа / добавить саб аккаунт
export const pendingAmount = ref(0)

export const isAllowedSub = ref(true)
export const addCard = ref()
export const listCard = ref()
// export const swiperSubs = ref()

//Validate
export const isNameValid = computed(() => 
validateEnums.strokeLetters.test(newSubName.value) &&
validateEnums.highLetters.test(newSubName.value) &&
validateEnums.numbers.test(newSubName.value) &&
!validateEnums.symbols.test(newSubName.value) &&
newSubName.value.length >= 3 &&
newSubName.value.length <= 15);

//Sub
export async function getSubsList() {
  try {
    const response = await api.get(`/subs/${id.value}`);

    subsList.value = response.data.list.map(sub => new SubData(sub));

    if(localStorage.getItem('subId')) {
      getCurrentSub('', JSON.parse(localStorage.getItem('subId')));

      return this;
    }

    getCurrentSub('',subsList.value[0].group_id);
  } catch (error) {
    console.error(error)
  }
}
// TODO: Использовать только на воркерах, в остальных местах - нет
// export const getSubaccount = async (sub) => {
//   try{
//     const response = await api.get(`/subs/sub/${sub}`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       }
//     })
//     console.log(response)
//   } catch(error){
//     console.error(error)
//   }
// }

// Зависит от того где вызывается функция:
//    subName - если меняем саб аккаунт - в силу того, что компонент листа - айоник компонент => он сам обрабатывает смену, а возвращает - имя. Поэтому мы его берем и работаем внутри массива
//            - когда добавили новый саб, у нас есть только имя, по нему ищем в общем списке нового, чтобы переключиться
//    subId - пользователь уже залогинен, обновил/вышел из приложения / добавил новый саб - в локал сторадже сохранен айдишник его выбранного субаккаунта. По нему ищем в массиве текущей саб
export function getCurrentSub(subName, subId) {
  currentSub.value = subsList.value.find(sub => {
    if (subId && sub.group_id === subId) {
      return sub;
    }
    if (subName && sub.name === subName) {
      return sub;
    }
  });

  changeSub()
  return currentSub.value
}

function changeSub(isName) {
  menuType.value = currentSub.value.name
  pendingAmount.value = currentSub.value.pending_amount
  if(isName) {
    getPendingAmount()
  }
  localStorage.setItem('subId', currentSub.value.group_id)
}

export const createSub = async () => {
  isLoading.value = true
  try {
    const response = await api.post(`/subs/create/${id.value}`, { name: newSubName.value })

    isSubList.value = false
    successfulCreate.value = true
    isLoading.value = false
  } catch(errors){
    isAccountExist.value = errors.response.data.errors.messages[0]
    successfulCreate.value = false

    isLoading.value = false
  }
}

// Если придется кастомить модалки на появление сабов
// export const changeStepSub = () => {
//   const windowHeight = window.innerHeight //Высота всего экрана
//   const addSubHeight = (windowHeight * 84) / 100 + 48 //Высота модалки - Добавить субаккаунт
//   const offsetTopAddSub = windowHeight - addSubHeight //Расстояние от верха экрана до модалки (доб саб)
//   const offsetTopList = dragModalView.value.offsetTop //Расстояние от верха экрана до модалки (саб лист)
//   console.log(offsetTopList, offsetTopAddSub)
//   isSubList.value = !isSubList.value
//   // element.offsetBottom = element.offsetTop + element.offsetHeight
//   setTimeout(() => {
//   console.log(dragModalView.value.offsetTop)
//   }, 100);
// }