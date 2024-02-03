import { ref } from 'vue'
import { api } from "@/api/api.js";
import {activeId, activeSub} from "@/modules/common/store/SubStore.js";
import { ResponseTrait } from "@/traits/ResponseTrait.js";
import {IncomeData} from "@/modules/income/DTO/IncomeData.js";
import {TableService} from "@/modules/table/services/TableService.js";
import {WorkerData} from "@/modules/workers/DTO/WorkerData.js";
import {workerTable} from "@/modules/workers/store/WorkerStore.js";
import {BarGraphData} from "@/modules/statistic/DTO/BarGraphData.js";
import {statisticIncomes} from "@/modules/statistic/statisticService.js";
export const segmentIncome = ref('income')
export const isVisTooltip = ref(false)
export const currentMinThreshold = ref(0.005)
export const progressBar = ref()

export let incomeList = ref([])

const responseTrait = new ResponseTrait();
const tableService = new TableService();
export const isIncomesColumnEmpty = ref(false);
// export let subsId = ref(null)
// export const getPendingAmount = () => {
//   const max = currentMinThreshold.value // max -- 100%
//   const current = pendingAmount.value //  current -- х%
//   const result = (current * 100) / max
//   // progressBar.value.style.width =  Math.ceil(result) + '%'
// }

// export const InitIncomesRequest = async () => {
//   if (!activeSub.value.group_id) {
//     return this;
//   }
//
//   try {
//     let response = await api.get(`/incomes/${activeSub.value.group_id}`);
//
//     incomeList.value = responseTrait.getResponseData(response).map(incomeRecord => new IncomeData(incomeRecord));
//   } catch(error) {
//     console.log(error)
//   }
// }

export async function getIncomeList() {
  tableService.tableModel
      .setTitlesLength(8)
      .setTitleString("income")
      .setRowsData(IncomeData);

  await tableService.fetch(
      incomeList,
      "income",
      activeId.value,
      1,
      1000
  );
}