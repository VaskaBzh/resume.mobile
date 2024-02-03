import { computed, reactive, ref, toRef } from "vue";
import { api } from "@/api/api";
import { activeId } from "@/modules/common/store/SubStore.js";
import { codeInput } from "@/modules/common/CodeInputService.js";
import { user } from "@/modules/user/UserService.js";
import { Form } from "@/modules/form/models/Form.js";
import { WalletFormData } from "@/modules/wallets/DTO/WalletFormData.js";
import { setErrors } from "@/modules/errors/controllers/ErrorController.js";
import { errorsLength } from "@/modules/errors/store/ErrorStore.js";
import router from "@/router/index.js";


export let currentWallet = ref({})
export let isWallet = ref(false)
export let newNameWallet = reactive({
    group_id: null,
    name: currentWallet.value.name
})

export let sucsess = ref(false)

function createFormModel() {
    return new Form();
}
export let newWalletUser = ref(createFormModel());
formProcess();
export function formProcess() {
    newWalletUser.value.setFormData(WalletFormData).setClearForm();
}

export let stepCreateWallet = ref(0)

const confirmationCode = toRef(newWalletUser.value.form, 'confirmation_code')
confirmationCode.value = codeInput.value

const newWalletUserId = toRef(newWalletUser.value.form, 'group_id')
newWalletUserId.value = computed(() => router.currentRoute.value.query.group_id ?? activeId.value)

const newWalletId = toRef(newNameWallet, 'group_id')
newWalletId.value = computed(() => router.currentRoute.value.query.group_id ?? activeId.value)




export async function getSubWallet() {
    if (!router.currentRoute.value.query.group_id && !activeId.value) {
        return this;
    }
    isWallet.value = false;

    try {

        let response = await api.get(`/wallets/${router.currentRoute.value.query.group_id ?? activeId.value}`)

        if(!response.data.data.length) {
            isWallet.value = false;

            return this;
        }

        currentWallet.value = response.data.data[0];
        isWallet.value = true;
    } catch(error) {
        isWallet.value = false
        
        console.error(error)

    }
}

export async function changeWalletAddress(swiperData) {
    newWalletUser.value.validate({
        confirmation_code: "required",
    })

    try {
        await api.put(`/wallets/change/address/${currentWallet.value.wallet}`, {
            "wallet_address": newWalletUser.value.form.wallet_address,
            "confirmation_code": newWalletUser.value.form.confirmation_code
        })
        swiperData.slideNext();
        await getSubWallet()
        sucsess.value = true

    } catch(error) {
        setErrors(error.response.data.errors)
        console.error(error)
    }
}

export async function sendLetterForWallet(swiperData) {
    newWalletUser.value.validate({
        wallet_address: "wallet|required",
    })

    if (errorsLength.value > 0) {
        return this;
    }

    if (swiperData.activeIndex === 0) {
        try {
            await api.post(
                `/send/code/${user.value.id}`,
                user.value.id
            );

            swiperData.slideNext();
        } catch (err) {
            console.error("Error with: " + err);
        }

        return this;
    }

    if (isWallet.value) {
        return this;
    }

    newWalletUser.value.validate({
        confirmation_code: "required",
    })

    if (errorsLength.value > 0) {
        return this;
    }

    try {
        await api.post(
            "/wallets/create",
            {
                "wallet_address": newWalletUser.value.form.wallet_address,
                "confirmation_code": newWalletUser.value.form.confirmation_code,
                "name": newWalletUser.value.form.name,
                "group_id": router.currentRoute.value.query.group_id ?? activeId.value
            }
        );

        swiperData.slideNext();
        await getSubWallet();
        sucsess.value = true;
        isWallet.value = true;
    } catch (err) {
        setErrors(err.response.data.errors)
        console.error("Error with: " + err);
        isWallet.value = false;
    }
}










