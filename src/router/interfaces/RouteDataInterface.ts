import {VueComponentData} from "@ionic/vue-router/dist/types/types";

export interface RouteDataInterface {
    path: string,
    name: string,
    component: VueComponentData,
    meta: {
        middleware: Array<string>,
    }
    query?: object,
}