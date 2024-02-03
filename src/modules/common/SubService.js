import { Form } from "@/modules/form/models/Form.js";
import { AddSubData } from "@/modules/common/DTO/AddSubData.js";
import {api, apiController} from "@/api/api.js";
import { user } from "@/modules/user/UserService.js";
import { errorsLength } from "@/modules/errors/store/ErrorStore.js";
import {setErrors} from "@/modules/errors/controllers/ErrorController.js";
import {ResponseTrait} from "@/traits/ResponseTrait.js";
import {activeId, activeSub, subList} from "@/modules/common/store/SubStore.js";
import {SubData} from "@/modules/common/DTO/SubData.js";
import {isLoadingPost} from "@/modules/common/commonService.js";
import {ref, watch} from "vue";

function createFormModal() {
    return new Form();
}
export const addSubForm = ref(createFormModal());

export function formProcess() {
    addSubForm.value.setFormData(AddSubData).setClearForm();
}

formProcess();
export const isSubsLoading = ref(false);

export const isOpenSubModal = ref(false);

export function openSubModal(pageData = {}) {
    if (pageData?.sub_title || pageData?.title === 'sub') {
        isOpenSubModal.value = true;
    }
}
export function closeSubModal() {
    isOpenSubModal.value = false;
}
export async function addSub(continueAction){
    addSubForm.value.validate({
        name: "required|name",
    })

    if (errorsLength.value > 0) {
        return;
    }

    try {
        const response = await api.post(`/subs/create/${user.value?.id}`, addSubForm.value.form);

        isLoadingPost.value = true;
        await setSubList();
        isLoadingPost.value = false;

        if (continueAction) {
            continueAction();
        }
    } catch(err) {
        console.error(err)

        setErrors(err.response.data.errors);
    }
}

export async function setSubList() {
    try {
        isSubsLoading.value = true;
        const response = await api.get(`/subs/${user.value?.id}`);

        const newSubList = new ResponseTrait().getResponseData(response);

        subList.value = newSubList.list.map(sub => new SubData(sub))
        isSubsLoading.value = false;
    } catch(err) {
        isSubsLoading.value = false;
        console.error(err);
    }
}

export async function setActiveByName(name = subList.value[0].name) {
    if (activeId.value) {
        await apiController.abortRequest();
    }
    activeSub.value = subList.value.find(sub => sub.name === name);
    activeId.value = activeSub.value.id;
    localStorage.setItem("activeId", JSON.stringify(activeId.value));
}

export async function setActiveSub(id = subList.value[0].id) {
    if (activeId.value) {
        await apiController.abortRequest();
    }
    activeSub.value = subList.value.find(sub => sub.id === id);
    activeId.value = id;
    localStorage.setItem("activeId", JSON.stringify(activeId.value));
}

watch(() => activeId.value, () => {
    const groupIdEvent = new CustomEvent("changeGroupId", {
        detail: { group_id: activeId.value },
    });

    document.dispatchEvent(groupIdEvent);
})