import {subList} from "@/modules/common/store/SubStore.js";
import router from "@/router/index.js";

export const HeaderDataEnum = {
    registration: {
        title: "registration",
        prev_page: "login",
    },
    statistic: {
        title: "sub",
    },
    income: {
        title: "sub",
        tabs: [
            {
                path: "income",
                name: "income"
            },
            {
                path: "wallets",
                name: "wallets"
            }
        ]
    },
    wallets: {
        title: "sub",
        tabs: [
            {
                path: "income",
                name: "income"
            },
            {
                path: "wallets",
                name: "wallets"
            }
        ]
    },
    wallets_sub: {
        title: "wallet",
        prev_page: "settings_sub",
        sub_title: "sub_name",
    },
    workers: {
        title: "sub",
        tabs: [
            {
                path: "workers",
                name: "workers"
            },
            {
                path: "connection",
                name: "connection"
            }
        ],
    },
    connection: {
        title: "sub",
        tabs: [
            {
                path: "workers",
                name: "workers"
            },
            {
                path: "connection",
                name: "connection"
            }
        ],
    },
    connection_sub: {
        title: "connection",
        prev_page: "settings_sub",
        sub_title: "sub_name",
    },
    worker: {
        title: "worker",
        prev_page: "workers",
    },
    watcher: {
        title: "watcher",
        sub_title: "sub",
        prev_page: "home",
    },
    watcher_sub: {
        title: "watcher",
        prev_page: "settings_sub",
        sub_title: "sub_name",
    },
    settings: {
        title: "settings",
    },
    settings_user: {
        title: "settings_user",
        prev_page: "settings",
    },
    settings_sub: {
        title: "settings_sub",
        prev_page: "settings_sublist",
        sub_title: "sub_name",
    },
    settings_sublist: {
        title: "settings_sub",
        prev_page: "settings",
    },
    referral_cabinet: {
        title: "referral",
        prev_page: "home",
        tabs: [
            {
                path: "referral_cabinet",
                name: "referral_cabinet"
            },
            {
                path: "referral_list",
                name: "referral_list"
            },
            {
                path: "referral_income",
                name: "referral_income"
            }
        ],
    },
    referral_list: {
        title: "referral",
        prev_page: "home",
        tabs: [
            {
                path: "referral_cabinet",
                name: "referral_cabinet"
            },
            {
                path: "referral_list",
                name: "referral_list"
            },
            {
                path: "referral_income",
                name: "referral_income"
            }
        ],
    },
    referral_income: {
        title: "referral",
        prev_page: "home",
        tabs: [
            {
                path: "referral_cabinet",
                name: "referral_cabinet"
            },
            {
                path: "referral_list",
                name: "referral_list"
            },
            {
                path: "referral_income",
                name: "referral_income"
            }
        ],
    },
    faq: {
        title: "faq",
        prev_page: "home",
    },
}