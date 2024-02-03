import { StatusEnum } from "@/modules/income/enums/StatusEnum.js";

export class IncomeData {
    constructor(incomeRecord) {
        this.incomeAt = incomeRecord.income_at;
        this.amount = `${incomeRecord.amount} BTC`;
        this.hashrate = `${incomeRecord.hash} ${incomeRecord.unit}h/s`;
        this.payoutAt = incomeRecord.payout_at ?? "-";
        this.wallet = incomeRecord.wallet ?? "-";
        this.payout = incomeRecord.payout ? `${incomeRecord.payout} BTC` : "-";
        this.txid = incomeRecord.tx_id ?? "-";
        this.status = StatusEnum[incomeRecord.status];
    }
}