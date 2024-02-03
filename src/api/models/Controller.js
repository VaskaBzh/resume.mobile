export class Controller {
    constructor() {
        this.controller = null;
    }

    createAbortController() {
        return new AbortController();
    }

    get signal() {
        return this.controller.signal;
    }

    setController() {
        this.controller = this.createAbortController();

        return this;
    }

    async abortRequest() {
        await this.controller.abort();

        return this;
    }
}
