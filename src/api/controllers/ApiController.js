import { ApiService } from "@/api/services/ApiService.js";

export class ApiController {
    constructor() {
        this.apiService = this.createApiService();
    }

    createApiService() {
        return new ApiService();
    }

    apiProcess() {
        this.apiService
            .setInstance()
            .setHeaders()
            .authorizationControl()
            .waitStateProcess()
            .preloaderProcess()
            // .initNotifications()
            .setAbortController();

        return this;
    }

    get instance() {
        return this.apiService.instance;
    }

    async abortRequest() {
        await this.apiService.abortRequest();
    }
}
