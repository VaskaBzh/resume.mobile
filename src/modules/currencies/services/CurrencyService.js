import axios from "axios";
import { ResponseTrait } from "@/traits/ResponseTrait.js";
import { currencyRubble } from "@/modules/currencies/store/CurrencyStore.js";

let currencyThrottle = 0;
const responseTrait = new ResponseTrait();

export async function getCurrencies() {
    try {
        const response = await axios.get("https://www.cbr-xml-daily.ru/latest.js");

        currencyRubble.value = 1 / responseTrait.getResponseData(response).rates.USD;
    } catch(err) {
        console.error(err);

        if (currencyThrottle > 2) {
            return this;
        }

        currencyThrottle++;

        setTimeout(() => {
            getCurrencies();
        }, 100);
    }
}