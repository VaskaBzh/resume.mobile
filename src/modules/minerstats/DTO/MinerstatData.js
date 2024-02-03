export class MinerstatData {
    constructor(minerstatRecord) {
        this.fppsRate = minerstatRecord.fpps_rate;
        this.networkDifficulty = minerstatRecord.network_difficulty;
        this.networkHashRate = minerstatRecord.network_hashrate;
        this.networkHashRateUnit = minerstatRecord.network_unit;
        this.priceUsd = minerstatRecord.price_USD;
        this.blockReward = minerstatRecord.reward_block;
    }
}