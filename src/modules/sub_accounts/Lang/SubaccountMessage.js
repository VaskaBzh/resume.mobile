export const SubaccountMessage = {
  en: {
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
    },
    sub_select: { 
      header: "Subaccount for earning" 
    },
  },
  ru: {
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
    },
    sub_select: { 
      header: "Субаккаунт для начисления" 
    },
  }
}