export const TableMessages = {
    en: {
        worker: {
            table: {
                titles: [
                    "Worker name",
                    "Hashrate",
                    "Reject",
                ],
            }
        },
        income: {
            table: {
                titles: [
                    "Accrrual date",
                    "Accrued",
                    "Hashrate",
                    "Payment Date",
                    "Wallet",
                    "Paid",
                    "TxID",
                    "Status",
                ],
                hints: {
                    hashrate:
                        "Average power value of all your devices <br> for 24 hours (calculation time 11:00 AM GMT+4)",
                    txid: "Unique transaction identifier in the <br> Bitcoin blockchain. You can use it to track the status <br> of your transaction in the network.",
                    statuses: `<div class="tooltip__list">
                            <span class="tooltip_row"><span class="tooltip_status tooltip_status-complete">Paid</span> — accrual paid to your wallet</span>
                            <span class="tooltip_row"><span class="tooltip_status tooltip_status-checking">Checking</span> — your wallet is under verification, which takes 48 hours</span>
                            <span class="tooltip_row"><span class="tooltip_status tooltip_status-pending">Pending</span> — not enough balance for the minimum payout threshold</span>
                            <span class="tooltip_row"><span class="tooltip_status tooltip_status-reject">Error</span> — error during payout</span>
                            <span class="tooltip_row"><span class="tooltip_status tooltip_status-no_wallet">Wallet needed</span> — you need to add a wallet to get the payout</span>
                        </div>`,
                },
            },
        },
        sub_table: {
            titles: [
                "Subaccount name",
                "Workers",
                "Current hashrate",
                "Hashrate / 24h",
                "Total paid out",
            ],
        },
    },
    ru: {
        worker: {
            table: {
                titles: [
                    "Имя",
                    "Хешрейт",
                    "Реджект",
                ],
            }
        },
        income: {
            table: {
                titles: [
                    "Дата добычи",
                    "Заработок",
                    "Хешрейт",
                    "Дата выплаты",
                    "Кошелек",
                    "Выплата",
                    "TxID",
                    "Статус",
                ],
                hints: {
                    hashrate:
                        "Среднее значение мощности всех <br> ваших устройств за 24 часа <br> (время расчета 11:00 AM GMT+4)",
                    txid: "Уникальный идентификатор транзакции в <br> блокчейне Bitcoin. С его помощью вы можете <br> отследить статус вашей транзакции в сети.",
                    statuses: `<div class="tooltip__list">
                            <span class="tooltip_row"><span class="tooltip_status tooltip_status-complete">Выплачено</span> — начисление выплачено на ваш кошелек</span>
                            <span class="tooltip_row"><span class="tooltip_status tooltip_status-checking">Проверка</span> — ваш кошелек находится на проверке, которая занимает 48 часов</span>
                            <span class="tooltip_row"><span class="tooltip_status tooltip_status-pending">В ожидании</span> — сумма на балансе не достигла минимального порога для выплаты</span>
                            <span class="tooltip_row"><span class="tooltip_status tooltip_status-reject">Ошибка</span> — ошибка во время выплаты</span>
                            <span class="tooltip_row"><span class="tooltip_status tooltip_status-no_wallet">Нет кошелька</span> — чтобы получить выплату, нужно добавить кошелек</span>
                        </div>`,
                },
            },
        },
        sub_table: {
            titles: [
                "Имя субаккаунта",
                "Воркеры",
                "Текущий хешрейт",
                "Хешрейт / 24ч",
                "Выплачено всего",
            ],
        },
    },
};
