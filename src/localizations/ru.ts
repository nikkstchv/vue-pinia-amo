export default {
  title: 'Документы 2.0',

  // tokenError: 'Токен авторизации истек !',

  menu: {
    main: 'Главная',
    organizations: 'Юр. лица',

  },

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
      organization: 'Вы действительно хотите удалить эту организацию?',
      type: 'Вы действительно хотите удалить этот тип документа?',
      template: 'Вы действительно хотите удалить этот шаблон?'
    }
  },

  views: {
    adSettings: {
      descriptions: {
        template: 'Настройте шаблоны документов',
        type: 'Настройте типы документов',
        organizations: 'Добавьте новое юр.лицо'
      },
      headers: {
        template: 'Шаблоны документов',
        type: 'Типы документов',
        organizations: 'Юридические лица'
      }
    },
    template: {
      description: 'Настройте шаблон',
      headers: {
        text: 'Настройки'
      },
      buttons: {
        delete: "Удалить шаблон"
      }
    },
    newTemplate: {
      headers: {
        text: 'Новый шаблон'
      },
      description: 'Заполните данные шаблона',
      section: {
        numbering: "Нумерация документов",
        lead_data: "Заполнение данных в сделке"
      },
      inputs: {
        name: "Название шаблона",
        required_sign: "Подпись и печать",
        prefix: "Префикс",
        suffix: "Суффикс",
        next_number: "Номер следующего документа",
        doc_number: "Номер документа",
        doc_date: "Дата документа"
      }
    },
    organization: {
      description: 'Введите данные о юр. лице',
      headers: {
        text: 'Настройки'
      },
      buttons: {
        delete: "Удалить юр.лицо"
      }
    },
    newOrganization: {
      headers: {
        text: 'Новое юр. лицо'
      },
      description: 'Заполните данные о юр. лице',
      inputs: {
        name: "Наименование",
        inn: "ИНН",
        kpp: "КПП",
        ogrn: "ОГРН",
        signatory_position: "Должность подписанта",
        signatory_name: "ФИО подписанта",
        signatory_short_name: "ФИО подписанта сокращенно",
        accountant_fio: "ФИО главного бухгалтера",
        based_on: "На основании",
        signatory_fio: "В лице",
        power_of_attorney: "Доверенность",
        power_of_attorney_date: "Дата доверенности",
        legal_address: "Юр. адрес",
        postal_address: "Почтовый адрес",
        other_address: "Другой адрес",
        certificate_number: " Номер свидетельства ИП",
        certificate_date: "Дата свидетельства ИП",
        phone_number: "Номер телефона",
        email: "E-mail",
        web: "Сайт",
      }
    }
  },
  components: {
    organizations: {
      tables: {
        headers: {
          name: 'Название',
          settlement_accounts: 'Рассчетные счета'
        }
      },
      buttons: {
        add: 'Добавить'
      }
    },
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
        message: {
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
        message: {
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