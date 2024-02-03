import { RouteNamesMap } from "@/router/map/RouteNamesMap";

export class RouteMainData {
    constructor(
        name,
        component = name,
        isPrivate = true,
        middlewares = [],
        query = {}
    ) {
        this.path = `/${name}`;
        this.name = name;
        this.component = () =>
            import(`../../Pages/${RouteNamesMap.findRouteComponent(isPrivate, component)}.vue`);
        this.query = {
            ...query
        }
        this.meta = {
            middleware: [
                "DropErrorsMiddleware",
                isPrivate ? "PrivateRoutesMiddleware" : "AuthMiddleware",
                ...middlewares
            ],
        };
    }
}