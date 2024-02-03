export class WorkerData {
    constructor(workerRecord) {
        this.id = workerRecord.worker_id;
        this.name = workerRecord.worker_name.split(".")[1];
        this.status = workerRecord.status;

        this.hashPerDay = workerRecord.shares_1d;
        this.hashPerDayUnit = workerRecord.shares_1d_unit;
        this.hashPerMin = workerRecord.shares_1m;
        this.hashPerMinUnit = workerRecord?.shares_1m_unit ?? "T";

        this.hashPerDayRender = `${this.hashPerDay} ${this.hashPerDayUnit}h/s`
        this.hashPerMinRender = `${this.hashPerMin} ${this.hashPerMinUnit}h/s`

        this.rejectRate = "0.0"
    }
}