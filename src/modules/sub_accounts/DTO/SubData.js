export class SubData {
    constructor(subRecord) {
        this.group_id = subRecord.group_id;
        this.hash_per_day = subRecord.hash_per_day;
        this.hash_per_day_unit = subRecord.hash_per_day_unit;
        this.hash_per_min = subRecord.hash_per_min;
        this.hash_per_min_unit = subRecord.hash_per_min_unit;
        this.last_month_amount = subRecord.last_month_amount;
        this.name = subRecord.name;
        this.pending_amount = subRecord.pending_amount;
        this.today_forecast = subRecord.today_forecast;
        this.total_amount = subRecord.total_amount;
        this.total_payout = subRecord.total_payout;
        this.workers_count_active = subRecord.workers_count_active;
        this.workers_count_dead = subRecord.workers_count_dead;
        this.workers_count_inactive = subRecord.workers_count_inactive;
        this.workers_count = this.workers_count_active + this.workers_count_inactive;
        this.yesterday_amount = subRecord.yesterday_amount;
    }
}