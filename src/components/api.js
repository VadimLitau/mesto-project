//деволтный конфиг - шаблон запроса к серверу
const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-4',
    headers: {
        authorization: '69b55c42-ee88-4348-a639-420f0f40fb4f',
        'Content-Type': 'application/json'
    }
};
//проверка ответа
function checkResponse(res) {
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
const getDefoultItems = () => {
    return Promise.all([getUpdateProfile(), getServCard()]);
}
export { udpdateAvatar, likesServAdd, addUserCard, getServCard, deleteServCard, getUpdateProfile, getDefoultItems }