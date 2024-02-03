import router from "@/router/index.js";
import { Api } from "@/api/models/Api.js";
import { StatusEnum } from "@/api/enums/StatusEnum.js";
import { WaitMethodsEnum } from "@/api/rules/enums/WaitMethodsEnum.js";
import { ObjectTrait } from "@/traits/ObjectTrait.js";
import { dropUser } from "@/modules/user/UserService.js";
import { isLoadingPost } from "@/modules/common/commonService.js";
import {isGetEmpty, isLoadingGet} from "@/modules/preloader/store/PreloaderStore.js";

export class ApiService {
    constructor() {
        this.api = this.createApiModel();
        this.objectTrait = this.createObjectTrait();
    }

    createApiModel() {
        return new Api();
    }

    createObjectTrait() {
        return new ObjectTrait();
    }

    get instance() {
        return this.api.instance;
    }

    // Logout functions

    async homeRedirect() {
        await router.push({ name: "login" });

        return this;
    }

    // Instance creator

    setInstance() {
        this.api.createInstance();

        return this;
    }

    // Authorize controller

    checkAuthorization = async (error) => {
        if (
            error.response &&
            error.response.status === StatusEnum["unAuthorized"]
        ) {
            dropUser();
            
            await this.homeRedirect();
        }
    };

    authorizationControl() {
        this.api.interceptResponse(null, this.checkAuthorization);

        return this;
    }

    // Abort controller functions

    setAbortController() {
        this.api.setController();

        return this;
    }

    async abortRequest() {
        await this.api.abortRequest();

        return this;
    }

    // Api dynamically headers

    setHeaders() {
        this.api.interceptRequest(this.api.setHeaders);

        return this;
    }
    checkWaitMethods(fetchData) {
        const method = this.objectTrait.findValueByKey(fetchData, "method");

        return WaitMethodsEnum[method];
    }

    waitListenerProcess = (fetchData, listenerStatus = false) => {
        if (this.checkWaitMethods(fetchData)) {
            isLoadingPost.value = listenerStatus;
        }
    };

    waitStateProcess() {
        this.api.interceptRequest(this.waitListenerProcess);
        this.api.interceptResponse(
            this.waitListenerProcess,
            this.waitListenerProcess
        );

        return this;
    }

    checkNeedPreloaderMethods(fetchData) {
        const method = this.objectTrait.findValueByKey(fetchData, "method");

        return method === "get";
    }

    preloaderStateProcess = (fetchData, listenerStatus = false) => {
        if (fetchData.url?.startsWith("/subs") || fetchData.url?.startsWith("/user")) {
            return this;
        }

        if (fetchData.response) {
            isGetEmpty.value = true;
        }
        if (this.checkNeedPreloaderMethods(fetchData)) {
            isGetEmpty.value = false;
            isLoadingGet.value = listenerStatus;
        }
    };

    preloaderProcess() {
        this.api.interceptRequest(this.preloaderStateProcess);
        this.api.interceptResponse(
            this.preloaderStateProcess,
            this.preloaderStateProcess
        );

        return this;
    }

    // notificationProcess = (fetchData) => {
    //     if (this.checkWaitMethods(fetchData)) {
    //         console.log(fetchData);
    //     }
    // };
    //
    // initNotifications() {
    //     this.api.interceptResponse(
    //         this.notificationProcess,
    //         this.notificationProcess
    //     );
    //
    //     // this.instance.interceptors.response.use(
    //     //     (response) => {
    //     //         const fulfilledMessage = response.data.message;
    //     //
    //     //         return response;
    //     //     },
    //     //     async (error) => {
    //     //         const errorMessage =
    //     //             error.response.data.message ?? error.response.data.error;
    //     //
    //     //         openNotification(
    //     //             false,
    //     //             this.translate("validate_messages.error"),
    //     //             errorMessage
    //     //         );
    //     //
    //     //         return Promise.reject(error);
    //     //     }
    //     // );
    //
    //     return this;
    // }
}
