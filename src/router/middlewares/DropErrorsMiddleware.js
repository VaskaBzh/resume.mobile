import { clearErrors } from "@/modules/errors/controllers/ErrorController.js";

export async function DropErrorsMiddleware() {
    clearErrors();
}
