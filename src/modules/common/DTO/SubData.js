export class SubData {
    constructor(subResponse) {
        this.name = subResponse.name;
        this.id = subResponse.group_id;
        
        this.hashPerDay = subResponse.hash_per_day;
        this.hashPerDayUnit = subResponse.hash_per_day_unit;
        this.hashPerMinute = subResponse.hash_per_min;
        this.hashPerMinuteUnit = subResponse.hash_per_min_unit;
        this.hashPerMinuteRender = `${this.hashPerMinute} ${this.hashPerMinuteUnit}`
        this.hashPerDayRender = `${this.hashPerDay} ${this.hashPerDayUnit}`
        
        this.monthAmount = subResponse.last_month_amount;
        this.pendingAmount = subResponse.pending_amount;
        this.todayAmount = subResponse.today_forecast;
        this.totalAmount = subResponse.total_amount;
        this.totalPayout = subResponse.total_payout;
        this.yesterdayAmount = subResponse.yesterday_amount;
        
        this.workersActive = subResponse.workers_count_active;
        this.workersInactive = subResponse.workers_count_inactive;
        this.workersDead = subResponse.workers_count_dead;
        this.workersCount = this.workersActive + this.workersInactive;
    }
}