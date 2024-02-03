import { ref } from "vue"
import { api } from "@/api/api.js";
import axios from "axios";

export const homePage = 300
export const minerStatistic = ref({})
export const getMinerStatistic = async () => {
    try{
        const response  = await api.get('/minerstats')
        minerStatistic.value = response.data.minerstats;
    }catch (error){
        console.error(error)
    }
}
export const getConverterData = async () => {
    try{
        // const response  = await axios.get("https://www.cbr-xml-daily.ru/latest.js")
        // console.log(response)
    }catch (error){
        console.error(error)
    }
}