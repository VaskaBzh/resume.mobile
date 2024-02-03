import { api } from "@/api/api";
import { Form } from "@/modules/form/models/Form.js";
import {errors, errorsLength} from "@/modules/errors/store/ErrorStore.js";
import { setErrors } from "@/modules/errors/controllers/ErrorController.js";
import { ref } from "vue";
import { RegistrationFormData } from "@/modules/auth/DTO/RegistrationFormData.js";

import router from "@/router/index.js";

export class RegistrationService {
    validateEnums = {
        strokeLetters: /[a-z]/,
        highLetters: /[A-Z]/,
        numbers: /[0-9]/,
        symbols: /[!@#\$%\^&\*,.?]/,
    };

    isPasswordValid = ref(true);
    isSendVerification = ref(true);
    isSendFirstVerification = ref(true);

    passwordValidateItems = ref([
        {
            text: 'registration.validate.length',
            isValid: false,
        },
        {
            text: 'registration.validate.lowercase_letter',
            isValid: false
        },
        {
            text: 'registration.validate.uppercase_letter',
            isValid: false
        },
        {
            text: 'registration.validate.characters',
            isValid: false
        },
        {
            text: 'registration.validate.number',
            isValid: false
        },
    ]);

    constructor() {
        this.form = ref(this.createFormModel());
        this.setForm();
    }

    createFormModel() {
        return new Form();
    }

    sendFirstVerification() {
        this.isSendFirstVerification = true;
        this.isSendVerification = true;
    }

    setForm() {
        this.form.value.setFormData(RegistrationFormData).setClearForm();
    }

    isPasswordItemValid() {
        this.passwordValidateItems.value[0].isValid = Boolean(this.form.value.form.password.length > 8);
        this.passwordValidateItems.value[1].isValid = this.validateEnums.strokeLetters.test(this.form.value.form.password);
        this.passwordValidateItems.value[2].isValid = this.validateEnums.highLetters.test(this.form.value.form.password);
        this.passwordValidateItems.value[3].isValid = this.validateEnums.symbols.test(this.form.value.form.password);
        this.passwordValidateItems.value[4].isValid = this.validateEnums.numbers.test(this.form.value.form.password);

        this.checkPasswordValid();
    }

    checkPasswordValid() {
        if (this.form.value.form.password.length === 0) {
            this.isPasswordValid.value = true;

            return;
        }

        this.isPasswordValid.value = this.passwordValidateItems.value.map((item) => item.isValid).every((item) => item === true)
    }

    async nextStep(step, swiper) {
        if (step === 1) {
            this.form.value.validate({
                name: "required|name",
                email: "required|email",
            });

            if (errorsLength.value > 0) {
                return;
            }

            swiper.slideNext();
        }
        if (step === 2) {
            this.form.value.validate({
                password: "required",
                password_confirmation: `required`,
            });

            if (errorsLength.value > 0) {
                return;
            }

            if (!this.isPasswordValid.value) {
                return;
            }

            if (this.form.value.form.password !== this.form.value.form.password_confirmation) {
                const errorList = {
                    ...errors.value,
                    password: [
                        {
                            path: "match",
                        }
                    ],
                    password_confirmation: [
                        {
                            path: "match",
                        }
                    ],
                }

                setErrors(errorList);

                return;
            }

            try {
                const response = await api.post("/register", this.form.value.form);

                swiper.slideNext();

                if (this.isSendFirstVerification) {
                    this.sendFirstVerification();
                }
            } catch(err) {
                const errorList = err.response.data.errors;

                setErrors(errorList)

                if (errorList.name || errorList.email) {
                    this.prevStep(swiper);
                }
            }
        }
    }

    prevStep(swiper) {
        swiper.slidePrev();
    }
}
