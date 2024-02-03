import { api } from "@/api/api";

export class Client {
    async income(group_id, page = 1, per_page = 1000) {
        return await api.get(
            `/incomes/${group_id}?page=${page}&per_page=${per_page}&type=mining`
        );
    }

    async workers(group_id, page = 1, per_page = 1000, status = 'all') {
        return await api.get(
            `/workers/${group_id}?page=${page}&per_page=${per_page}&status=${status}`
        );
    }
}
