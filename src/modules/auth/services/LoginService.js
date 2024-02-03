import { LoginFormData } from "@/modules/auth/DTO/LoginFormData";
import { api } from "@/api/api";
import { Form } from "@/modules/form/models/Form.js";
import {userProcess, userStore} from "@/modules/user/UserService.js";
import { setErrors } from "@/modules/errors/controllers/ErrorController.js";
import { errorsLength } from "@/modules/errors/store/ErrorStore.js";
import { ResponseTrait } from "@/traits/ResponseTrait.js";
import { ref } from "vue";
import { ForgotFormData } from "@/modules/auth/DTO/ForgotFormData.js";

import router from "@/router/index.js";
import {setActiveSub, setSubList} from "@/modules/common/SubService.js";

export class LoginService {
    isForgotPopupOpen = ref(false);
    isFacPopupOpen = ref(false);
    isOpenVerify = ref(false);
    constructor() {
        this.form = ref(this.createFormModel());
        this.formForgot = ref(this.createFormModel());
        this.responseTrait = new ResponseTrait();
    }

    createFormModel() {
        return new Form();
    }

    setLoginForm() {
        this.form.value.setFormData(LoginFormData).setClearForm();
    }

    setForgotForm() {
        this.formForgot.value.setFormData(ForgotFormData).setClearForm();
    }

    async login(code) {
        this.form.value.validate({
            password: "required",
            email: "required|email",
        })

        if (errorsLength.value > 0) {
            return;
        }

        if (code) {
            this.form.value.form.google2fa_code = code;
        }

        try {
            const response = await api.post("/login", this.form.value.form);

            this.isFacPopupOpen.value = false;
            const user = this.responseTrait.getResponseData(response).user;
            const token = this.responseTrait.getResponseData(response).token;
            userStore(user, token);
            userProcess();

            await router.push({name: "home",});
            await setSubList();
            await setActiveSub();
        } catch (err) {
            console.error(err);

            if (err.response.status === 403) {
                if (
                    err?.response?.data?.errors?.messages &&
                    (err?.response?.data?.errors?.messages[0] === "Pass 2fa code!" ||
                        err?.response?.data?.errors?.messages[0] === "Введите код")
                ) {
                    this.isFacPopupOpen.value = true;

                    return this;
                }

                this.isOpenVerify.value = true;

                return this;
            }

            if (
                err?.response?.data?.errors?.google2fa_code ||
                (
                    err?.response?.data?.errors?.messages &&
                    (
                        err?.response?.data?.errors?.messages[0] === "Wrong code" ||
                        err?.response?.data?.errors?.messages[0] === "Неверный код"
                    )
                )
            ) {
                if (
                    err?.response?.data?.errors?.messages &&
                    (
                        err?.response?.data?.errors?.messages[0] === "Wrong code" ||
                        err?.response?.data?.errors?.messages[0] === "Неверный код"
                    )
                ) {
                    setErrors(
                        {
                            code: err.response.data.errors.messages,
                        }
                    )

                    return this;
                }
                setErrors(
                    {
                        code: err.response.data.errors.google2fa_code,
                    }
                )

                return this;
            }

            setErrors(
                {
                    email: err.response.data.errors.messages,
                    password: err.response.data.errors.messages
                }
            )
        }
    }

    async sendForgotPassword(email, swiperData) {
        this.formForgot.value.validate({
            forgot_email: "required|email",
        });

        if (errorsLength.value > 0) {
            return this;
        }

        try {
            await api.post('/password/forgot', { email: this.formForgot.value.form.forgot_email });

            swiperData.slideNext();
        } catch (err) {
            console.error(err)

            if (err.response) {
                setErrors(
                    {
                        forgot_email: err.response.data.errors.email,
                    }
                )
            }
        }
    }
}
