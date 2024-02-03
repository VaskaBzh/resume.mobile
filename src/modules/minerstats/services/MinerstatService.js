import {ResponseTrait} from "@/traits/ResponseTrait.js";
import { api } from "@/api/api.js";
import { minerstats } from "@/modules/minerstats/store/MinerstatStore.js";
import { MinerstatData } from "@/modules/minerstats/DTO/MinerstatData.js";

let minerstatsFetchThrottle = 0;
const responseTrait = new ResponseTrait();

export async function getMinerstats() {
    try {
        const response = await api.get("/minerstats");

        const record = responseTrait.getResponseData(response).minerstats;

        minerstats.value = new MinerstatData(record);
    } catch(err) {
        console.error(err);

        if (minerstatsFetchThrottle > 2) {
            return this;
        }

        minerstatsFetchThrottle++;

        setTimeout(() => {
            getMinerstats()
        }, 100);
    }
}