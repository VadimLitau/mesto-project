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
            headers: {
                authorization: `${config.headers.authorization}`
            } /*если я пишу в этом месте config.headers, то вижу ошибку с указанием на точку, поэтому пришлось делать так*/
        })
        .then(checkResponse)
};
//обновление Аватара и Профиля пользователя
const udpdateAvatar = (newAvatar, linkrequest, nameIn, jobIn) => {
    return fetch(`${config.baseUrl}/users/me/` + linkrequest, {
            method: 'PATCH',
            headers: {
                authorization: `${config.headers.authorization}`,
                'Content-Type': 'application/json'
            },
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
            headers: {
                authorization: `${config.headers.authorization}`,
                'Content-Type': 'application/json'
            },
        })
        .then(checkResponse)
};
//Добавление пользовательской карточки
const userCard = (userLink, userText) => {
    return fetch(`${config.baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: `${config.headers.authorization}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userText,
                link: userLink,
            })
        })
        .then(checkResponse)
};
const servReq = () => {
    return fetch(`${config.baseUrl}/cards/`, {
            headers: {
                authorization: '69b55c42-ee88-4348-a639-420f0f40fb4f'
            }
        })
        .then(checkResponse)
};
//удаление карточки
const deleteServCard = (idCard) => {
    return fetch(`${config.baseUrl}/cards/` + idCard, {
        method: 'DELETE',
        headers: {
            authorization: '69b55c42-ee88-4348-a639-420f0f40fb4f',
        },
    }).then(checkResponse)
}
export { udpdateAvatar, likesServAdd, userCard, servReq, deleteServCard, getUpdateProfile }