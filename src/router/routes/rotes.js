import {RouteMainData} from "@/router/DTO/RouteMainData.js";
import {RouteNamesMap} from "@/router/map/RouteNamesMap.js";

import MainFooter from "@/modules/common/Components/MainFooter.vue";

export const routes = [
    {
        path: '/',
        redirect: 'login',
    },
    new RouteMainData("login", "login", false),
    new RouteMainData("registration", "registration", false),
    {
        path: '/tabs',
        component: MainFooter,
        meta: {
            middleware: [
                "DropErrorsMiddleware",
                "PrivateRoutesMiddleware",
            ],
        },
        children: [
            new RouteMainData("home"),
            new RouteMainData("statistic"),
            new RouteMainData("watcher"),
            new RouteMainData("faq"),
            new RouteMainData("settings"),
            new RouteMainData("settings_user"),
            new RouteMainData("settings_sublist"),
            new RouteMainData("settings_sub", "settings_sub", true, [], { group_id: Number }),
            new RouteMainData("watcher_sub", "watcher_sub", true, [], { group_id: Number }),
            new RouteMainData("connection_sub", "connection_sub", true, [], { group_id: Number }),
            new RouteMainData("wallets_sub", "wallets_sub", true, [], { group_id: Number }),
            new RouteMainData("referral_cabinet"),
            new RouteMainData("referral_list"),
            new RouteMainData("referral_income"),
            new RouteMainData("workers"),
            new RouteMainData("connection"),
            new RouteMainData("income"),
            new RouteMainData("wallets"),
            new RouteMainData("worker"),
            new RouteMainData("disconnect"),
        ]
    },
]