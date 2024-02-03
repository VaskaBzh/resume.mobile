import { ApiController } from "@/api/controllers/ApiController.js";

const createApiController = () => {
    return new ApiController();
};

const apiController = createApiController();

apiController.apiProcess();

export const api = apiController.instance;
export { apiController };
