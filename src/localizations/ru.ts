export default {
  title: 'Уведомления в Telegram',

  // tokenError: 'Токен авторизации истек !',

  buttons: {
    append: 'Добавить',
    back: 'Назад',
    save: 'Сохранить',
    cancel: 'Отмена',
    yes: 'Да',
  },

  dropdowns: {
    pipeline: 'Не менять этап'
  },

  confirm: {
    deleteQuestion: {
      bot: 'Вы действительно хотите удалить этот бот?',
      message: 'Вы действительно хотите удалить этот шаблон?'
    }
  },

  views: {
    adSettings: {
      descriptions: {
        template: 'Настройте шаблоны документов',
        type: 'Настройте типы документов'
      },
      headers: {
        template: 'Шаблоны документов',
        type: 'Типы документов'
      }
    },
    message: {
      description: 'Для подстановки данных по сущности вы можете использовать маркеры',
      headers: {
        text: 'Текст'
      }
    },
    newMessage: {
      description: 'description',
      headers: {
        text: 'Создание нового шаблона сообщения'
      }
    }
  },
  components: {
    bot: {
      buttons: {
        add: 'Добавить',
        isAdd: 'Добавление нового бота',
        cancel: 'Отмена',
        delete: 'Отключить'
      },
      descriptionInput: 'Укажите токен бота',
      description: '',
      exceptions: {
        notFound: 'Указанного токена не существует'
      }
    },
    newMessage: {
      descriptionInput: 'Название',
      headerName: 'Новый шаблон'
    },
    usersTable: {
      amo: 'Пользователь amoCRM',
      tg: 'Пользователь Telegram',
    },
    messageTemplate: {
      buttons: {
        message:{
          add: 'Добавить',
          delete: 'Удалить шаблон'
        },
        button: {
          add: 'Добавить кнопку'
        }
      },
      tables: {
        header: 'Кнопки',
        messages: {
          name: 'Название',
          type: 'Тип',
        },
        buttons: {
          name: 'Кнопка',
          type: 'Тип',
          data: 'Данные',
          delete: 'Удалить',
        },
        placeholders: {
          name: 'Название',
          url: 'url',
        },
        lists: {
          type: {
            url: 'Ссылка',
            bot: 'Запуск (Sales) бота',
            pipeline: 'Взять сделку',
          }
        }

      },
      markers: {
        name: 'Маркеры',
        placeholder: 'Поиск'
      },
      description: ''
    },
    typeTemplate: {
      buttons: {
        message:{
          add: 'Добавить',
          delete: 'Удалить'
        },
        button: {
          add: 'Добавить',
          cancel: 'Отмена'
        },
        descriptionInput: 'Укажите тип документа',
      },
      tables: {
        header: 'Кнопки',
        messages: {
          name: 'Название',
          type: 'Тип',
        },
        buttons: {
          name: 'Кнопка',
          type: 'Тип',
          data: 'Данные',
          delete: 'Удалить',
        },
        placeholders: {
          name: 'Название',
          url: 'url',
        },
        lists: {
          type: {
            url: 'Ссылка',
            bot: 'Запуск (Sales) бота',
            pipeline: 'Взять сделку',
          }
        }

      },
      markers: {
        name: 'Маркеры',
        placeholder: 'Поиск'
      },
      description: ''
    }
  }
}