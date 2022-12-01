export default {
  title: 'Документы 2.0',

  // tokenError: 'Токен авторизации истек !',

  menu: {
    main: 'Главная',
    organizations: 'Юр. лица',

  },

  tab: {
    titles: {
      organization: 'Юр.лицо',
      settlement: 'Р/счет',
      document: 'Документ'
    }
  },

  buttons: {
    append: 'Добавить',
    back: 'Назад',
    save: 'Сохранить',
    cancel: 'Отмена',
    yes: 'Да',
    close: 'Закрыть',
    create: 'Создать'
  },

  dropdowns: {
    pipeline: 'Не менять этап'
  },

  confirm: {
    deleteQuestion: {
      organization: 'Вы действительно хотите удалить это юр.лицо?',
      type: 'Вы действительно хотите удалить этот тип документа?',
      template: 'Вы действительно хотите удалить этот шаблон?',
      settlement: 'Вы действительно хотите удалить этот счёт?'
    }
  },

  views: {
    adSettings: {
      descriptions: {
        template: 'Настройте шаблоны документов',
        type: 'Настройте типы документов',
        organizations: 'Добавьте новое юр.лицо',
        settlements: 'Добавьте или отредактируйте рассчетный счет'
      },
      headers: {
        template: 'Шаблоны документов',
        type: 'Типы документов',
        organizations: 'Юридические лица',
        settlement: 'Рассчетные счета'
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
        name: "Название",
        required_sign: "Подпись и печать",
        prefix: "Префикс",
        suffix: "Суффикс",
        next_number: "Номер след. документа",
        number_length: "Кол-во знаков в номере",
        url: "Ссылка на шаблон",
        is_active: "Документ активен",
        document_type: "Тип документа"
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
    documents: {
      header: 'Реестр документов',
      tables: {
        headers: {
          number: '№',
          name: 'Название',
          type: 'Тип',
          entity: 'Сущность',
          organization: 'Организация',
          responsible: 'Ответственный',
          created: 'Дата создания'
        }
      }
    },
    settlements: {
      inputs: {
        name: "Наименование р/счета",
        bank_name: "Банк",
        correspondent_account: "Корр. счет",
        bic: "БИК",
        settlement_account: "Расч. счет",
      },
      buttons: {
        remove: "Удалить счёт"
      }
    },
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