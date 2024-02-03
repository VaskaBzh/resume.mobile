import { activeId } from "@/modules/common/store/SubStore.js";

export class WalletFormData {
    constructor() {
        this.wallet_address = "";
        this.group_id = activeId.value;
        this.name = "Wallet";
        this.confirmation_code ='';
    }
}