import router from "@/router/index.js";
import { i18n } from "@/main.ts";

export class DynamicallyHeaderRules {
    get "Accept-Language"() {
        return `${i18n.global.locale.value};q=1`;
    }

    get Authorization() {
        return localStorage.getItem("token");
    }

    get "X-Access-Key"() {
        return router.currentRoute.value.query?.access_key;
    }

    checkRule = (headerKey) => {
        if (this[headerKey]) {
            return { name: headerKey, value: this[headerKey] };
        }
    };
}
