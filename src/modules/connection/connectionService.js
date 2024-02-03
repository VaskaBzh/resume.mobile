import { ref } from 'vue'
import {currentSub, getCurrentSub, pendingAmount, subsList} from '@/modules/sub_accounts/subaccaunts.js'
import {api} from "@/api/api.js";
export const segmentIncome = ref('income')
export const isVisTooltip = ref(false)
export const currentMinThreshold = ref(0.005)
export const progressBar = ref()

export let incomesService = ref([])

export let subsId = ref(null)
export const getPendingAmount = () => {
  const max = currentMinThreshold.value // max -- 100%
  const current = pendingAmount.value //  current -- х% 
  const result = (current * 100) / max
  // progressBar.value.style.width =  Math.ceil(result) + '%'
}

export const InitIncomesRequest = async () => {

  if (!currentSub.value.group_id) {
    return this;
  }

  try {

    let response = await api.get(`/incomes/${currentSub.value.group_id}`)
    incomesService.value = response.data.data

  } catch(error) {

    console.error(error)

  }

}