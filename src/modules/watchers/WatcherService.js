import { reactive, ref } from "vue";
import { api } from "@/api/api.js";
import { activeId, activeSub } from '@/modules/common/store/SubStore.js'
import { id } from "@/modules/user/UserService.js";
import { Form } from "@/modules/form/models/Form.js";
import { WatcherFormData } from "@/modules/watchers/DTO/WatcherFormData.js";
import { errorsLength } from "@/modules/errors/store/ErrorStore.js";
import  {isLoadingPost } from "@/modules/common/commonService.js";
import router from "@/router/index.js";

export const isAddWatcherOpen = ref(false);
export const isChangeWatcherOpen = ref(false);
export const isWatcherListEmpty = ref(false);

function createFormModel() {
    return new Form();
}
export let watcherForm = ref(createFormModel());
formProcess();
export function formProcess() {
    watcherForm.value.setFormData(WatcherFormData).setClearForm();
}

export const defaultAllowedRoutes = [
    {
        name: 'tab_watcher[0]',
        disabled: true,
        checked: true,
        routes: [
            "v1.sub.show",
            "v1.statistic.show",
            "v1.allowed-routes",
        ],
    },
    {
        name: 'tab_watcher[1]',
        disabled: false,
        checked: false,
        routes: [
            "v1.worker.show",
            "v1.worker.list",
            "v1.worker_hashrate.list",
        ],
    },
    {
        name: 'tab_watcher[2]',
        disabled: false,
        checked: false,
        routes: ["v1.income.list", "v1.payout.list"],
    },
];
export let allowedRoutes = reactive([...defaultAllowedRoutes]);

export const watcherList = ref([]);
export const watcher = ref({});

export function freshAllowedRoutes() {
    allowedRoutes = [...defaultAllowedRoutes];
}

export function clearWatcherForm() {
    watcherForm.value.setClearForm();
}

export function setWatcher(watcherObject) {
    watcher.value.name = watcherObject.name;
    watcher.value.allowed_routes = watcherObject.route;
    watcher.value.url = watcherObject.url;
    watcher.value.id = watcherObject.id;
}

export function setWatcherForm(watcherObject) {
    setWatcher(watcherObject);
    watcherForm.value.form.name = watcherObject.name;
    watcherForm.value.form.allowed_routes = watcherObject.route;
    watcherForm.value.form.url = watcherObject.url;
    watcherForm.value.form.id = watcherObject.id;

    freshAllowedRoutes();

    allowedRoutes.forEach((routeObject) => {
        if (watcherObject.allowed_routes.includes(routeObject.routes[0])) {
            routeObject.checked = true;

            return this;
        }

        routeObject.checked = false;
    });

    fillWatcherAllowedRoutes();
}

export function changeAllowedRoutesTab(routes, checkEvent) {
    allowedRoutes.map(routeObject => {
        if (routeObject.routes === routes) {
            routeObject.checked = checkEvent.detail.checked;
        }

        return routeObject
    })
}

function fillWatcherAllowedRoutes() {
    watcher.value.allowed_routes = allowedRoutes.map(routeObject => {
        if (routeObject.checked) {
            return routeObject.routes;
        }
    }).filter(Boolean).join(",").split(",");
}

function fillWatcherFormAllowedRoutes() {
    watcherForm.value.form.allowed_routes = allowedRoutes.map(routeObject => {
        if (routeObject.checked) {
            return routeObject.routes;
        }
    }).filter(Boolean).join(",").split(",");
}

export async function getWatcherList() {
    isWatcherListEmpty.value = false;
    if (!router.currentRoute.value.query.group_id && !activeId.value) {
        return this;
    }

    try {
        const response = await api.get(`/watchers/${id.value}/${router.currentRoute.value.query.group_id ?? activeId.value}`);

        watcherList.value = response.data.data;

        if (watcherList.value.length <= 0) {
            isWatcherListEmpty.value = true;
        }
    } catch (err) {
        console.error(err);
    }
}

// export async function getWatcher(watcherId) {
//     try {
//         const response = await api.get(`/watchers/${watcherId}`);
//
//         watcher.value = response.data.data;
//     } catch (err) {
//         console.error(err);
//     }
// }

export async function createWatcher(swiperElem) {
    fillWatcherFormAllowedRoutes();

    watcherForm.value.validate({
        name: "watcher|required",
    })

    if (errorsLength.value > 0) {
        return this;
    }

    try {
        const response = await api.post(`/watchers/create/${router.currentRoute.value.query.group_id ?? activeId.value}`, watcherForm.value.form);

        swiperElem.slideNext()
        await getWatcherList();
    } catch (err) {
        console.error(err);
    }
}

export async function changeWatcher(isEditableChanger, swiperElem) {
    fillWatcherFormAllowedRoutes();

    watcherForm.value.validate({
        name: "watcher|required",
    })

    if (errorsLength.value > 0) {
        return this;
    }

    isEditableChanger();

    if (
        watcherForm.value.form.name === watcher.value.name &&
        watcherForm.value.form.allowed_routes.join(".") === watcher.value.allowed_routes.join(".")
    ) {
        return this;
    }

    try {
        const response = await api.put(`/watchers/update/${watcherForm.value.form.id}`, {
            name: watcherForm.value.form.name,
            allowed_routes: watcherForm.value.form.allowed_routes,
        });

        swiperElem.slideNext()
        await getWatcherList();
    } catch (err) {
        console.error(err);
    }
}

export async function deleteWatcher(watcherId) {
    try {
        isLoadingPost.value = true;
        const response = await api.delete(`/watchers/delete/${watcherId}`);
        isLoadingPost.value = false;
        isChangeWatcherOpen.value = false;

        await getWatcherList();
    } catch (err) {
        console.error(err);
    }
}