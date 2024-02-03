import { api } from "@/api/api.js";
import { ref } from "vue";
import {activeId, activeSub} from "@/modules/common/store/SubStore.js";
import { ResponseTrait } from "@/traits/ResponseTrait.js";
import { GraphDataService } from "@/modules/graphs/services/GraphDataService.js";
import { LineGraphData } from "@/modules/statistic/DTO/LineGraphData.js";
import {BarGraphData} from "@/modules/statistic/DTO/BarGraphData.js";

export const statisticHahRate = ref({});
export const statisticIncomes = ref({});

export const actualStatisticOffset = ref(96);

const responseTrait = new ResponseTrait();
const graphDataServiceLine = new GraphDataService();
const graphDataServiceColumn = new GraphDataService(30);

export async function getSubStatistic(lineGraphOffset = 96) {
    if (!activeId.value) {
        return this;
    }

    actualStatisticOffset.value = lineGraphOffset;

    graphDataServiceLine.setOffset(actualStatisticOffset.value);

    try {
        const response = await api.get(`/statistic/${activeId.value}?offset=${actualStatisticOffset.value}`);

        graphDataServiceLine.records = responseTrait.getResponseData(response).hashes.map(
            (hashEl) => new LineGraphData(hashEl)
        );
        await graphDataServiceLine.makeFullValues();
        graphDataServiceLine.setDefaultKeys();
        statisticHahRate.value = graphDataServiceLine.graph;

        graphDataServiceColumn.records = responseTrait.getResponseData(response).incomes.map(
            (incomeEl) => new BarGraphData(incomeEl)
        );

        graphDataServiceColumn.setDefaultKeys(60 * 60 * 1000 * 24);
        await graphDataServiceColumn.makeFullBarValues();

        statisticIncomes.value = graphDataServiceColumn.graph;
    } catch(err) {
        console.error(err);
    }
}