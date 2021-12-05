import { jobInput } from './modal.js';
import { nameInput, gallery, createServCard, myId } from './cards.js';
import { timePopupInterval } from './../index.js';
//запрос на заполнение форм при загрузке страницы
fetch('https://nomoreparties.co/v1/plus-cohort-4/users/me', {
        headers: {
            authorization: '69b55c42-ee88-4348-a639-420f0f40fb4f'
        }
    })
    .then((res) => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err);
    })
    .then((data) => {
        document.querySelector('.profile__info-name').textContent = data.name;
        document.querySelector('.profile__info-profession').textContent = data.about;
        document.querySelector('.profile__avatar').src = data.avatar;
    });
//обновление Аватара и Профиля пользователя
const udpdateAvatar = (newAvatar, linkrequest, nameIn, jobIn) => {
    fetch('https://nomoreparties.co/v1/plus-cohort-4/users/me/' + linkrequest, {
            method: 'PATCH',
            headers: {
                authorization: '69b55c42-ee88-4348-a639-420f0f40fb4f',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: newAvatar,
                name: nameIn.value,
                about: jobIn.value
            })

        }).then((res) => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        })
        .then((data) => {
            //console.log(data)
            document.querySelector('.profile__avatar').src = data.avatar;
        });
};
//Проверка наличия лайка при загрузке страницы и лайке фотографии
const likesServAdd = (item, meth, elem) => {
    fetch('https://nomoreparties.co/v1/plus-cohort-4/cards/likes/' + item, {
            method: meth, //PUT,DELETE
            headers: {
                authorization: '69b55c42-ee88-4348-a639-420f0f40fb4f',
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        })
        .then((data) => {
            elem.textContent = data.likes.length;
        });

};
//Добавление пользовательской карточки
const userCard = (userLink, userText, time) => {
    let elem;
    fetch('https://nomoreparties.co/v1/plus-cohort-4/cards', {
            method: 'POST',
            headers: {
                authorization: '69b55c42-ee88-4348-a639-420f0f40fb4f',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userText,
                link: userLink,
            })
        })
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }).then((data) => {
            return elem = data;
            //gallery.prepend(createServCard(data.link, data.name, '0', data.owner._id, data._id));
        })
        .finally(setTimeout(() => { gallery.prepend(createServCard(elem.link, elem.name, '0', elem.owner._id, elem._id)) }, time));
}

//Добавление карточек по умолчанию
const servReq = () => {
    fetch('https://nomoreparties.co/v1/plus-cohort-4/cards', {
            headers: {
                authorization: '69b55c42-ee88-4348-a639-420f0f40fb4f'
            }
        }).then((res) => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((data) => {
            data.reverse().forEach(function(item) {
                // console.log(item)
                let elem;
                item.likes.forEach(function(rrr) {
                        if (myId === rrr._id) {
                            return elem = 1;
                        }
                        return elem;
                    })
                    /* for (let i = 0; i < item.likes.length; i++) {}*/
                gallery.prepend(createServCard(item.link, item.name, item.likes.length, item.owner._id, item._id, elem));
            })
        })
};
//удаление карточки
const deleteServCard = (idCard) => {
    fetch('https://nomoreparties.co/v1/plus-cohort-4/cards/' + idCard, {
        method: 'DELETE',
        headers: {
            authorization: '69b55c42-ee88-4348-a639-420f0f40fb4f',
        },
    }).then((res) => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}
export { udpdateAvatar, likesServAdd, userCard, servReq, deleteServCard }