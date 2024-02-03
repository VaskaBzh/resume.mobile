export const WatcherMessage = {
  en: {
    title_watcher: 'Watcher mode',
    tab_watcher: ['Statistics', 'Workers', 'Income'],
     blank_text_watcher: 'Share access to your data via a watcher link',
     info_watcher:{
       title: ['Add Watcher', 'Watcher', 'Watchers'],
       label: ['Watcher name', 'Available sections for observation'],
       placeholder: 'Enter a name',
       text: 'The watcher gets the opportunity to watch content without the ability to edit',
       button: {
         change: "Edit",
         delete: "Delete",
         add: "Add",
         close: "Close",
         save: "Save",
       },
       validate: 'Text',
       delete:{
         title: 'Delete Watcher',
         text: 'Are you sure you want to delete watcher {watcher}?',
         button: ['Cancel', 'Delete']
       },
       successful: {
         title: 'Successful',
         text: 'Watcher {watcher} added',
         button: 'Close',
       }
     }
  },
  ru: {
    title_watcher: 'Режим наблюдателя',
    tab_watcher: ['Статистика', 'Воркеры', 'Доход'],
    blank_text_watcher: 'Создайте ссылку наблюдателя, чтобы поделиться доступом к своему аккаунту в режиме чтения',
    info_watcher:{
      title: ['Добавить наблюдателя', 'Наблюдатель', 'Наблюдатели'],
      label: ['Имя наблюдателя', 'Доступные разделы для наблюдения'],
      placeholder: 'Введите имя',
      text: 'Наблюдатель получает возможность смотреть контент без возможности редактировать',
      button: {
        change: "Изменить",
        delete: "Удалить",
        add: "Добавить",
        close: "Закрыть",
        save: "Сохранить",
      },
      validate: 'Текст', 
      delete:{
        title: 'Удалить Наблюдателя', 
        text: 'Вы действительно хотите удалить наблюдателя Misha?',
        button: ['Отменить', 'Удалить']
      },
      successful: {
        title: 'Успешно', 
        text: 'Наблюдатель {watcher} добавлен',
        button: 'Закрыть',
      }
    }
  }
}