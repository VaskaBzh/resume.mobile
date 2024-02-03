import { dropUser } from "@/modules/user/UserService.js";

export async function PrivateRoutesMiddleware(route, router) {
    if (!!localStorage.getItem("token")) {
        return this;
    }

    router.push({ name: "login" });
    dropUser();
}
