import axios from "axios";
import { HeadersEnum } from "@/api/enums/HeadersEnum.js";
import { HeadersDataEnum } from "@/api/enums/HeadersDataEnum.js";
import { DynamicallyHeaderRules } from "@/api/rules/DynamicallyHeaderRules.js";
import { Controller } from "@/api/models/Controller.js";

export class Api {
    baseUrl = "http://127.0.0.1/v1";
    instance = null;
    config = null;

    constructor() {
        this.controller = this.createControllerModel();
        this.dynamicallyHeaderRules = this.createDynamicallyHeaderRules();
    }

    createDynamicallyHeaderRules() {
        return new DynamicallyHeaderRules();
    }

    createControllerModel() {
        return new Controller();
    }

    get request() {
        return this.instance.interceptors.request;
    }

    get response() {
        return this.instance.interceptors.response;
    }

    // Intercept fetch process

    interceptRequest(successCallback = null, rejectCallback = null) {
        this.request.use(
            (config) => {
                this.config = config;

                if (successCallback) {
                    successCallback.bind(this, config)(true);
                }

                return this.config;
            },
            (error) => {
                if (rejectCallback) {
                    rejectCallback.bind(this, error)(false);
                }

                return Promise.reject(error);
            }
        );

        return this;
    }

    interceptResponse(successCallback = null, rejectCallback = null) {
        this.response.use(
            (response) => {
                if (successCallback) {
                    successCallback.bind(this, response)();
                }

                return response;
            },
            (error) => {
                if (rejectCallback) {
                    rejectCallback.bind(this, error)();
                }

                return Promise.reject(error);
            }
        );

        return this;
    }

    // Instance creator

    createInstance() {
        this.instance = axios.create({
            baseURL: this.baseUrl,
            headers: {
                [HeadersEnum["content_type"]]: HeadersDataEnum.getHeader(
                    HeadersEnum["content_type"]
                ),
                [HeadersEnum["requested_with"]]: HeadersDataEnum.getHeader(
                    HeadersEnum["requested_with"]
                ),
                [HeadersEnum["accept"]]: HeadersDataEnum.getHeader(
                    HeadersEnum["accept"]
                ),
            },
        });

        return this;
    }

    // Dynamically headers setter

    setHeaders() {
        const headers = [];

        for (let rule in HeadersEnum) {
            const checkResult = this.dynamicallyHeaderRules.checkRule(
                HeadersEnum[rule]
            );

            if (checkResult) {
                headers.push(checkResult);
            }
        }

        headers.forEach((header) => {
            this.config.headers[header.name] = HeadersDataEnum.getHeader(
                header.name,
                header.value
            );
        });
    }

    // Abort Controller logic

    setSignal() {
        this.interceptRequest(() => {
            if (!this.config) {
                return this;
            }
            if (this.config.url.startsWith("/subs") || this.config.url.startsWith("/user") || this.config.url.startsWith("/minerstats")) {
                return this;
            }

            this.config["signal"] = this.controller.signal;
        });

        return this;
    }

    setController() {
        this.controller.setController();

        this.setSignal();

        return this;
    }

    async abortRequest() {
        await this.controller.abortRequest();

        this.setController();

        return this;
    }
}
