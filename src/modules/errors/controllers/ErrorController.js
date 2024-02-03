import { errors } from "@/modules/errors/store/ErrorStore.js";

export function setErrors(errorList) {
    errors.value = errorList;

}

export function clearErrors() {
    errors.value = {};
}

