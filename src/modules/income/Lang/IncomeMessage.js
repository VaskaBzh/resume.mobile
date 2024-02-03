export const IncomeMessage = {
  en: {
    titles: {
      income: [
        "Accrual date",
        "Accrued",
        "Hashrate",
        "Payment date",
        "Wallet",
        "Paid",
        "TxID",
        "Status",
      ],
    },
    tooltip: {
      title: "Current balance",
      messages: "Now the balance is {amount} BTC. Automatic payment occurs if the balance reaches 0.005 BTC.",
      button: "Got it",
    },
    rows: {
      complete: "Paid",
      pending: "Pending",
      reject: "Error",
      checking: "Checking",
      no_wallet: "Wallet needed",
    },
    alert: {
      hashrate: {
        title: "Hashrate",
        message: "Average hashrate of all your workers over 24 hours (calculating tme 11:00 AM GMT+4)",
        button: "Got it",
      },
      txid: {
        title: "TxID",
        message: "Unique transaction identifier in the Bitcoin blockchain. With TxID you can track the status of your transaction online",
        button: "Got it",
      },
      status: {
        title: "Status",
        message: `<div class="alert__block">
            <div class="alert_elem">
              <span class='alert_status alert_status-complete'>Paid</span>
              <span class="alert_text alert_text-list">accrual paid to your wallet</span>
            </div>
            <div class="alert_elem">
              <span class='alert_status alert_status-pending'>Pending</span>
              <span class="alert_text alert_text-list">balance amount has not reached min threshold 0.005 BTC</span>
            </div>
            <div class="alert_elem">
              <span class='alert_status alert_status-checking'>Checking</span>
              <span class="alert_text alert_text-list">your wallet is being verified, it takes 48 hours in common</span>
            </div>
            <div class="alert_elem">
              <span class='alert_status alert_status-reject'>Error</span>
              <span class="alert_text alert_text-list">payment or system error</span>
            </div>
            <div class="alert_elem">
              <span class='alert_status alert_status-no_wallet'>Wallet needed</span>
              <span class="alert_text alert_text-list">you need to add a wallet to receive payment</span>
            </div>
        </div>`,
        button: "Got it",
      },
    },
    income_tab: ['Income', 'Wallets', 'Accruals', 'Payments'],
    subaccount: 'Subaccounts',
    progress_bar: 'Accrued',
    income_title: 'Payments',
    accrual_card:{
      label: ['Amount', 'Hashrate', 'Payment date', 'Wallet', 'Wallet address'],
    },
    income_cards: ['Accrued for all time', 'Current balance', "Yesterday's income", 'Monthly income', 'Income graph for the month'],
    auto_payout:{
      title: ['Setting up auto-payout', 'Wallet'],
      tooltip: 'As soon as the accrued amount exceeds the specified value, an automatic payment will occur to your wallet.',
      label: 'Min. threshold for automatic payment',
      wallet:{
         button: ['Change wallet label', 'Delete wallet', ],
        placeholder: 'Enter address wallet',
        warning_text: 'The added/modified wallet will be verified within 48 hours. During this period, auto payments will not be available.',
         successful: {
           title: 'Successful',
           text: ['Wallet successfully changed', 'Wallet successfully added'],
           button: 'Close'
         },
         validate: ['Length 3-15 characters consisting of A-Z, a-z, 0-9', 'Text'],
         change:{
           change_button: 'Change',
           title: 'Changing wallet address',
           code_text: 'To confirm update a wallet, enter the code sent by email',
           label: 'Wallet label',
           button: 'Save',
           prev_button: 'Back',
           close_button: 'Close',
           send: ['Send the letter again', 'Send a new code through'],
         },
         delete:{
           title: 'Delete wallet',
           text: 'Are you sure you want to delete your wallet',
           button: ['Cancel', 'Delete']
         },
         add:{
           title: 'Add wallet',
           code_text: 'To confirm adding a wallet, enter the code sent by email',
           empty_text: 'For automatic payment of accruals, add your wallet address',
           label: ['Wallet Label', 'Wallet Address'],
           placeholder: 'Hold to paste',
           button: 'Add'
         },
        alert: {
          button: 'Close',
          text: 'As soon as the amount of accruals reaches the minimum threshold of 0.005 BTC, an automatic payment to the wallet will occur',
          title: 'Data for automatic payment'
        }
       }
     }
  },
  ru: {
    titles: {
      income: [
          "Дата начисления",
          "Начислено",
          "Хешрейт",
          "Дата выплаты",
          "Кошелек",
          "Выплачено",
          "TxID",
          "Статус",
      ],
    },
    tooltip: {
      title: "Текущий баланс",
      messages: "На вашем субаккаунте {amount} BTC. Автовыплата происходит при достижении 0.005 BTC.",
      button: "Понятно",
    },
    rows: {
      complete: "Выплачено",
      pending: "В ожидании",
      reject: "Ошибка",
      checking: "Проверка",
      no_wallet: "Нет кошелька",
    },
    alert: {
      hashrate: {
        title: "Хешрейт",
        message: "Среднее значение мощности всех ваших устройств за 24 часа (время расчета 11: 00 AM GMT+4)",
        button: "Понятно",
      },
      txid: {
        title: "TxID",
        message: "Уникальный идентификатор транзакции в блокчейне Bitcoin. С его помощью вы можете отследить статус вашей транзакции в сети.",
        button: "Понятно",
      },
      status: {
        title: "Статус",
        message: `<div class="alert__block">
            <div class="alert_elem">
              <span class='alert_status alert_status-complete'>Выплачено</span>
              <span class="alert_text alert_text-list">начисление выплачено на ваш кошелек</span>
            </div>
            <div class="alert_elem">
              <span class='alert_status alert_status-pending'>В ожидании</span>
              <span class="alert_text alert_text-list">сумма на балансе не достигла мин. порога для выплаты</span>
            </div>
            <div class="alert_elem">
              <span class='alert_status alert_status-checking'>Проверка</span>
              <span class="alert_text alert_text-list">ваш кошелек находится на проверке, которая занимает 48 часов</span>
            </div>
            <div class="alert_elem">
              <span class='alert_status alert_status-reject'>Ошибка</span>
              <span class="alert_text alert_text-list">ошибка во время выплаты или системная ошибка</span>
            </div>
            <div class="alert_elem">
              <span class='alert_status alert_status-no_wallet'>Нет кошелька</span>
              <span class="alert_text alert_text-list">чтобы получить выплату, нужно добавить кошелек</span>
            </div>
        </div>`,
        button: "Понятно",
      },
    },
    income_tab: ['Доход', 'Кошелек', 'Начисления', 'Выплаты'],
    subaccount: 'Субаккаунты',
    progress_bar: 'Начислено',
    income_title: 'Платежи',
    accrual_card:{
      label: ['Сумма', 'Хешрейт', 'Дата выплаты', 'Кошелек', 'Адрес кошелька'],
    },
    income_cards: ['Начислено за все время', 'Начислено', 'Вчерашний доход', 'Доход за месяц', 'График дохода за месяц'],
    auto_payout:{
      title: ['Настройка автовыплаты', 'Кошелек'],
      tooltip: 'Как только сумма начислений станет больше указанного значения произойдет автовыплата на ваш кошелек.',
      label: 'Мин. порог для автовыплаты',
      wallet:{
        warning_text: 'Добавленный/измененный кошелек будет проходить проверку в течение 48 часов. В этот период автовыплаты будут недоступны.',
        placeholder: 'Введите адрес кошелька',
        button: ['Изменить  кошелька', 'Удалить кошелек', ],
        successful: {
          title: 'Успешно',
          text: ['Кошельк успешно изменен', 'Кошелек успешо добавлен'],
          button: 'Закрыть'
        },
        validate: ['Длина 3-15 символов, состоящих из A-Z, a-z, 0-9', 'Текст'],
        change:{
          change_button: 'Изменить',
          title: 'Измение адреса кошелька',
          code_text: 'Для подтверждения изменения кошелька введите код, отправленный на почту',
          label: 'Метка кошелька',
          button: 'Сохранить',
          prev_button: 'Назад',
          close_button: 'Закрыть',
          send: ['Отправить письмо повторно', 'Отправить новый код через'],
        },
        delete:{
          title: 'Удалить кошелек',
          text: 'Вы точно хотите удалить кошелек',
          button: ['Отменить', 'Удалить']
        },
        add:{
          title: 'Добавить кошелек',
          code_title: 'Добавление кошелька',
          code_text: 'Для подтверждения добавления кошелька введите код, отправленный на почту',
          empty_text: 'Для автовыплаты начислений добавьте адрес вашего кошелька ',
          label: ['Метка кошелька', 'Адрес кошелька'],
          placeholder: 'Удерживайте, чтобы вставить',
          button: 'Добавить'
        },
        alert: {
          button: 'Понятно',
          text: 'Как только сумма начислений достигнет минимального порога в 0,005 BTC, произойдет автовыплата на кошелек',
          title: 'Данные для автовыплаты'
        }
      }
    }
  }
}