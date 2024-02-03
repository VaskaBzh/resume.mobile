import { dropUser } from "@/modules/user/UserService.js";

export async function AuthMiddleware(_, router) {
    if (!localStorage.getItem("token")) {
        dropUser();

        return this;
    }

    router.push({ name: "statistic" });
}
