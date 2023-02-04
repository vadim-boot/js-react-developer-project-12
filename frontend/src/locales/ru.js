const ru = {
    translation: {
        languages: {
            en: 'English',
            ru: 'Русский',
        },
        toast: {
            dataLoadError: 'Ошибка загрузки данных',
            channelAdded: 'Канал создан',
            channelRenamed: 'Канала переименован',
            channelDeleted: 'Канал удален'
        },
        chat: {
            logout: 'Выйти',
            msgList: {
                head_zero: '{{count}} сообщений',
                head_one: '{{count}} сообщение',
                head_few: '{{count}} сообщения',
                head_many: '{{count}} сообщений',
            },
            channelList: {
                manage: 'Управление каналом',
                delete: 'Удалить',
                rename: 'Переименовать',
                head: 'Каналы',
            }
        },
        loginForm: {
            reqField: 'Обязательное поле',
            yourName: 'Ваше имя пользователя',
            password: 'Пароль',
            enter: 'Войти',
            noAcc: 'Нет аккаунта?',
            regAcc: 'Регистрация',
            header: 'Войти',
            error: 'Неверные имя пользователя или пароль!'
        },
        signupForm: {
            reqField: 'Обязательное поле',
            usernameLength: 'От 3 до 20 символов',
            passLength: 'От 6 символов',
            passCheck: 'Пароли должны совпадать',
            header: 'Регистрация',
            yourName: 'Ваше имя пользователя',
            password: 'Пароль',
            passwordConfirm: 'Подтвердите пароль',
            signUp: 'Зарегистрироваться',
            error: 'Такой пользователь уже существует'
        },
        channelModal: {
            nameReq: 'Обязательное поле',
            nameLength: 'От 3 до 20 символов',
            nameTestName: 'Уникальный канал',
            nameTestMsg: 'Должно быть уникальным',
            addHead: 'Добавить канал',
            renameHead: 'Переименовать канал',
            btCancel: 'Отменить',
            btSubmit: 'Отправить',
            delHead: 'Удалить канал',
            delMsg: 'Уверены?',
        }
    },
};

export default ru;
