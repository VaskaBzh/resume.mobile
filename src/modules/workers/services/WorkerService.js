import { activeId, activeSub } from "@/modules/common/store/SubStore.js";
import { TableService } from "@/modules/table/services/TableService.js";
import { WorkerData } from "@/modules/workers/DTO/WorkerData.js";
import { workerTable, workerData, workerGraph } from "@/modules/workers/store/WorkerStore.js";
import { api, apiController } from "@/api/api.js";
import { ResponseTrait } from "@/traits/ResponseTrait.js";
import {ref} from "vue";

import { GraphDataService } from "@/modules/graphs/services/GraphDataService.js";
import { LineGraphData } from "@/modules/statistic/DTO/LineGraphData.js";

const tableService = new TableService();
const responseTrait = new ResponseTrait();
export let workersSub = ref([])
export let clickTableWorker = ref({})

export const actualWorkerOffset = ref(96);

const graphDataServiceLine = new GraphDataService();
export async function getWorkerList(status = 'all') {
    await apiController.abortRequest();

    tableService.tableModel
        .setTitlesLength(3)
        .setTitleString("worker.table.titles")
        .setRowsData(WorkerData);

    await tableService.fetch(
        workerTable,
        "workers",
        activeId.value,
        1,
        1000,
        status
    );
}


export async function getWorkerSub() {
    let activeSubId = localStorage.getItem('activeId')
    try {
        const { data: data } = await api.get(`/workers/${activeSubId ? JSON.parse(activeSubId):activeSub.value.id}`)
        workersSub.value.push(data.data)
    } catch(error) {
        console.error(error)
    }
}

export async function getWorkerData(worker_id) {
    try {
        const response =  await api.get(`/workers/worker/${worker_id}`);
        await getWorkerGraph(worker_id);

        workerData.value = responseTrait.getResponseData(response);

    } catch(err) {
        console.error(err);
    }
}

export async function getWorkerGraph(worker_id, workerGraphOffset = 96) {
    actualWorkerOffset.value = workerGraphOffset;
    graphDataServiceLine.setOffset(actualWorkerOffset.value);

    try {
        const response =  await api.get(`/workerhashrate/${worker_id}?offset=${actualWorkerOffset.value}`);

        graphDataServiceLine.records = responseTrait.getResponseData(response).map(
            (hashEl) => new LineGraphData(hashEl)
        );

        await graphDataServiceLine.makeFullValues();

        graphDataServiceLine.setDefaultKeys();
        workerGraph.value = graphDataServiceLine.graph;
    } catch(err) {
        console.error(err);
    }
}