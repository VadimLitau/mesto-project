//проба Api класса
export default class Api {
    constructor(options) {
            this._url = options.baseUrl;
            this._headers = options.headers;
        }
        //проверка ответа
    checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    //загрузка с сервера информации профиля(имя, провессия, аватар)
    getUpdateProfile() {
        return fetch(`${this._url}/users/me`, {
                method: 'GET',
                headers: this._headers
            })
            .then(this.checkResponse)
    };
    getServCard() {
        return fetch(`${this._url}/cards/`, {
                headers: this._headers
            })
            .then(this.checkResponse)
    };
    //объединение загрузки карточек и информации профила
    getDefaultItems() {
            return Promise.all([this.getUpdateProfile(), this.getServCard()]);
        }
        //обновление Аватара и Профиля пользователя
    udpdateAvatar(newAvatar, linkrequest, nameIn, jobIn) {
        return fetch(`${this._url}/users/me/` + linkrequest, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: newAvatar,
                    name: nameIn.value,
                    about: jobIn.value
                })
            })
            .then(this.checkResponse)
    };
    //Проверка наличия лайка при загрузке страницы и лайке фотографии
    likesServAdd(item, meth) {
        return fetch(`${this._url}/cards/likes/` + item, {
                method: meth, //PUT,DELETE
                headers: this._headers,
            })
            .then(this.checkResponse)
    };

    //Добавление пользовательской карточки
    addUserCard(userLink, userText) {
        return fetch(`${this._url}/cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: userText,
                    link: userLink,
                })
            })
            .then(this.checkResponse)
    };

    //удаление карточки
    deleteServCard(idCard) {
        return fetch(`${this._url}/cards/` + idCard, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this.checkResponse)
    }
};
/** 
//проба Api класса
export default class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
    }
    show() {
        console.log(this._url);
    }

    //деволтный конфиг - шаблон запроса к серверу
    /*
    const config = {
        baseUrl: 'https://nomoreparties.co/v1/plus-cohort-4',
        headers: {
            authorization: '69b55c42-ee88-4348-a639-420f0f40fb4f',
            'Content-Type': 'application/json'
        }
    };
    //проверка ответа
    checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

//загрузка с сервера информации профиля(имя, провессия, аватар)
const getUpdateProfile = () => {
    return fetch(`${config.baseUrl}/users/me`, {
            headers: config.headers
        })
        .then(checkResponse)
};

//обновление Аватара и Профиля пользователя
const udpdateAvatar = (newAvatar, linkrequest, nameIn, jobIn) => {
    return fetch(`${config.baseUrl}/users/me/` + linkrequest, {
            method: 'PATCH',
            headers: config.headers,
            body: JSON.stringify({
                avatar: newAvatar,
                name: nameIn.value,
                about: jobIn.value
            })
        })
        .then(checkResponse)
};
//Проверка наличия лайка при загрузке страницы и лайке фотографии
const likesServAdd = (item, meth) => {
    return fetch(`${config.baseUrl}/cards/likes/` + item, {
            method: meth, //PUT,DELETE
            headers: config.headers,
        })
        .then(checkResponse)
};
//Добавление пользовательской карточки
const addUserCard = (userLink, userText) => {
    return fetch(`${config.baseUrl}/cards`, {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify({
                name: userText,
                link: userLink,
            })
        })
        .then(checkResponse)
};
const getServCard = () => {
    return fetch(`${config.baseUrl}/cards/`, {
            headers: config.headers
        })
        .then(checkResponse)
};
//удаление карточки
const deleteServCard = (idCard) => {
    return fetch(`${config.baseUrl}/cards/` + idCard, {
        method: 'DELETE',
        headers: config.headers,
    }).then(checkResponse)
}

//объединение загрузки карточек и информации профила
const getDefaultItems = () => {
    return Promise.all([getUpdateProfile(), getServCard()]);
}
export { udpdateAvatar, likesServAdd, addUserCard, getServCard, deleteServCard, getUpdateProfile, getDefaultItems } 

*/