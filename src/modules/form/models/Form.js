import { Validator } from "@/modules/validate/models/Validator";
import {clearErrors, setErrors} from "@/modules/errors/controllers/ErrorController.js";

export class Form {
    formData = {};
    form = {};

    constructor() {
        this.validator = this.createValidatorModel();
    }

    createValidatorModel() {
        return new Validator();
    }

    setFormData(newFormData) {
        this.formData = newFormData;

        return this;
    }

    setClearForm() {
        this.form = new this.formData;
    }

    // setForm(newForm) {
    //     this.form = { ...this.form, ...newForm };
    // }

    validate(validationConfig) {
        clearErrors();

        let errorsList = {};

        for (const formKey in validationConfig) {
            const errorData = this.validator.validate(
                this.form[formKey],
                formKey,
                validationConfig[formKey]
            );

            if (errorData[formKey].length > 0) {
                errorsList = {
                    ...errorsList,
                    ...errorData
                };
            }
        }

        setErrors(errorsList);
    }
}
