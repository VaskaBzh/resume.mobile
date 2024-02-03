import { api } from '@/api/api.js';
import {sub, subList} from "./SubStore.js";

import {SubData} from "@/modules/sub_accounts/DTO/SubData.js";
import {user} from "@/modules/user/UserService.js";

export async function getSubsList() {
    try {
        const response = await api.get(`/subs/${user.value.id}`);

        subList.value = response.data.list.map(sub => new SubData(sub));

        setCurrentSub('', subList.value[0].group_id);
    } catch (error) {
        console.error(error)
    }
}

export function setCurrentSub(subName, subId) {
    sub.value = subList.value.find(sub => {
        if (subId && sub.group_id === subId) {
            return sub;
        }
        if (subName && sub.name === subName) {
            return sub;
        }
    });
}