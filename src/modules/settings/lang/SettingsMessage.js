export const SettingsMessage = {
  en: {
    logout: {
      button: "Log out of account",
      title: "Sign out of account",
      text: "Do you really want to log out of your {email} account?",
      buttons: {
        cancel: "Cancel",
        leave: "Sign out"
      }
    },
    setting_key: 'Settings key',
    settings_list:{
      label: ['Subaccount', 'Interface', 'Personal Data', 'Security', 'Login History', 'Account', 'Support', 'Email'],
      title: 'Other',
      fac: {
        connect: "Connect",
        disconnect: "Disconnect",
      },
      li: [
        'Manage subaccounts',
        'Referral program',
        'Theme',
        'Language',
        'Change email',
        'Change password',
        'Change number',
        'SMS authentication',
        'Google authentication',
        'Account settings',
        'Currency of account',
        'FAQ',
        'Support service'
      ],
      interface: ['Dark', 'Light', "Same as system"]
    },
    account_settings: {
      title: 'Account settings',
      change:{
        title: ['Change email', 'Change password', 'Change number'],
        text: [
          'Indicate your real email and we will send a confirmation code to it',
          'To change your password, please enter your current password',
          'Your new number will receive an SMS with a confirmation code',
          'Sent code to number'
        ],
        label: [
          'New email',
          'Confirmation code',
          'Current Password',
          'New Password',
          'Repeat new password',
          'Account'
        ],
        placeholder: [
          'Enter new email',
          "We'll send it by mail",
          'Enter the current password',
          'Enter a new password',
          'Repeat new password'
        ],
        button: ['Change', 'Continue', 'Forgot your password?', 'Send code', 'Send new code'],
        validate: ['Text'],
        timer: 'Send new code via '
      },
      successful: {
        title: 'Successful',
        text: 'successfully changed',
        name: ['Email', 'Password', 'Number']
      }
    },
    sub_list:[
      'Connection',
      'Autopayments',
      'Notifications',
      'Watchers',
    ],
    sub_button: ['Add subaccount', 'Delete subaccount'],
    manage_account:{
      title: 'Manage subaccounts',
      delete:{
        title: 'Delete subaccount',
        text: 'Are you sure you want to delete the subaccount',
        button: ['Cancel', 'Delete']
      },
      connect:{
        text: [
          'Set up your device according to the information below:',
          'If everything is done correctly, the approximate connection time will be 10 minutes'
        ]
      }
    },
    add_sub:{
      text: 'The subaccount name must be unique and cannot be repeated',
      placeholder: 'Subaccount name',
      button: 'Add',
      validate:[ 'Length 3-15 characters consisting of A-Z, a-z, 0-9', 'Name taken'],
      successful: {
        title: 'Successful',
        text: ['Subaccount', 'added'],
        button: 'Switch to'
      }
    }
  },
  ru: {
    logout: {
      button: "Выйти из аккаунта",
      title: "Выйти из аккаунта",
      text: "Вы действительно хотите выйти из аккаунта {email}?",
      buttons: {
        cancel: "Отменить",
        leave: "Выйти",
      }
    },
    setting_key: 'Ключ настройки',
    settings_list:{
      title: 'Другое',
      label: ['Субаккаунт', 'Интерфейс', 'Персональные данные', 'Безопасность', 'История входа', 'Аккаунт', 'Поддержка', 'Email'],
      fac: {
        connect: "Подключить",
        disconnect: "Отключить",
      },
      li: [
        'Управление субаккаунтами', 
        'Реферальная программа', 
        'Тема', 
        'Язык',
        'Сменить email',
        'Изменить пароль',
        'Сменить номер',
        'SMS аутентификация',
        'Google аутентификация',
        'Настройка аккаунта',
        'Расчетная валюта',
        'FAQ',
        'Служба поддержки'
      ],
      interface: ['Тёмная', 'Светлая', 'Как в системе']
    },
    account_settings: {
      title: 'Настройки аккаунта',
      change:{
        title: ['Сменить email', 'Сменить пароль', 'Сменить номер'],
        text: [
          'Укажите реальную почту, на нее отправим код подтверждения', 
          'Для смены пароля укажите текущий пароль', 
          'На Ваш новый номер поступит SMS с кодом подтверждения',
          'Отправили код на номер '
        ],
        label: [
          'Новый email', 
          'Код подтверждения', 
          'Текущий пароль', 
          'Новый пароль', 
          'Повторите новый пароль'
        ],
        placeholder: [
          'Введите новый email', 
          'Отправим на почту', 
          'Введите текущий пароль', 
          'Введите новый пароль', 
          'Повторите новый пароль'
        ],
        button: ['Сменить', 'Продолжить', 'Забыли пароль?', 'Отправить код', 'Отправить новый код'],
        validate: ['Текст'],
        timer: 'Отправить новой код через ' 
      },
      successful: {
        title: 'Успешно',
        text: 'успешно изменен',
        name: ['Email', 'Пароль', 'Номер']
      }
    },
    sub_list:[
      'Подключение',
      'Автовыплаты',
      'Уведомления',
      'Режим наблюдателя',
    ],
    sub_button: ['Добавить cубаккаунт', 'Удалить субаккаунт'],
    manage_account:{
      title: 'Управление субаккаунтами',
      delete:{
        title: 'Удалить субаккаунт',
        text: 'Вы действительно хотите удалить субаккаунт',
        button: ['Отменить', 'Удалить']
      },
      connect:{
        text: [
          'Настройте ваше устройство согласно представленным ниже данным:', 
          'Если все сделано правильно, приблизительное время подключения составит 10 мин'
        ]
      }
    },
    add_sub:{
      text: 'Имя субаккаунта должно быть уникальным и не может повторяться',
      placeholder: 'Имя субаккаунта',
      button: 'Добавить',
      validate:[ 'Длина 3-15 символов, состоящих из A-Z, a-z, 0-9', 'Имя занято'],
      successful: {
        title: 'Успешно', 
        text: ['Субаккаунт', 'добавлен'],
        button: 'Переключиться на'
      }
    }
  }
}