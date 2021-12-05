import { showPopupProfile, closeAllPopup } from './utils.js';

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
        })
        .then((data) => {
            elem.textContent = data.likes.length;
        });

};
const likesServDelete = (item) => {
    fetch('https://nomoreparties.co/v1/plus-cohort-4/cards/likes/' + item, {
        method: 'DELETE',
        headers: {
            authorization: '69b55c42-ee88-4348-a639-420f0f40fb4f',
            'Content-Type': 'application/json'
        }
    })
};
const likesServ = (item) => {
    fetch('https://nomoreparties.co/v1/plus-cohort-4/cards/' + item, {
        headers: {
            authorization: '69b55c42-ee88-4348-a639-420f0f40fb4f'
        }
    });
}
const servReq =
    fetch('https://nomoreparties.co/v1/plus-cohort-4/cards', {
        headers: {
            authorization: '69b55c42-ee88-4348-a639-420f0f40fb4f'
        }
    });
//попап добавления карточки
const popupCreateNewCard = document.querySelector('.popup_AddCard');
//нашли кнопку открытия popup добавления карточки
const popupButtonCreateCard = document.querySelector('.profile__button');
//нашли кнопку закрытия popup добавления карточки 
const popupAddCardClos = document.querySelector('.popup_AddCard_cross');
//получение контента template
const galleryElement = document.querySelector('#photo-gallery__element').content;
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('#popup__idName');
//получение текста из попап для названия карточки
const newCardText = document.querySelector('#popupAddCard__firstInput');
//получение ссылки на изображение из попап для карточки
const newCardLink = document.querySelector('#popupAddCard__secondInput');
//получение элемента родителя галереи
const gallery = document.querySelector('.gallery-element');
//получение родителя для показа фотографии
const popupPhoto = document.querySelector('.popup__photo');
//получение изображения для показа фотографии
const popupPhotoImage = document.querySelector('.popup__photo-image');
//получение текста для показа изображения
const popupPhotoName = document.querySelector('.popup__photo-name');
//получение элемента для закрытие попап показа изображения
const popupPhotoClose = document.querySelector('.popup_photo_cross');
//мой id
const myId = '3382b6ac0c72abf176e18b90';
//попап удаления карточки
const popupDeleteCard = document.querySelector('.popup_deleteCard');
//Начало - добавление элемента галлереи
const deleteButton = document.querySelector('.popup__deleteCard_btn');
//Создание шаблона карточки
const createServCard = (servLink, servName, serLike, servId, servPhotoId, likeStatus) => {

    //получение копии template элемента 
    const newGalleryElement = galleryElement.querySelector('.gallery-element__item').cloneNode(true);
    //получение изображение из копии
    const galleryImage = newGalleryElement.querySelector('.gallery-element__photo');
    //получение текста из копии
    const galleryText = newGalleryElement.querySelector('.gallery-element__caption-name');
    //Получение лайка в новой карточке
    const galleryLike = newGalleryElement.querySelector('.gallery-element__caption-like');
    //получение элемента корзины новой карточки
    const galleryDeletCard = newGalleryElement.querySelector('.gallery-element__deletCard');
    //получение элемента счетчика лайков
    const galleryCounterLikes = newGalleryElement.querySelector('.gallery-element__like-counter');

    //получение массива с карточками от сервера  
    galleryImage.alt = servName;
    galleryImage.src = servLink;
    galleryText.textContent = servName;
    galleryCounterLikes.textContent = serLike;
    newGalleryElement.id = servPhotoId;
    if (likeStatus) { galleryLike.classList.add('gallery-element__caption-like_active') }



    //реакция и замена вида лайка при клике
    galleryLike.addEventListener('click', function() {
        if (galleryLike.classList.contains('gallery-element__caption-like_active')) {
            likesServAdd(servPhotoId, 'DELETE', galleryCounterLikes)

            galleryLike.classList.remove('gallery-element__caption-like_active')
        } else {
            likesServAdd(servPhotoId, 'PUT', galleryCounterLikes)
            galleryLike.classList.add('gallery-element__caption-like_active')
        }
        //galleryLike.classList.toggle('gallery-element__caption-like_active');
    });

    //добавлять или нет элемент корзины на карточку
    if (servId === myId) {
        galleryDeletCard.classList.remove('gallery-element__deletCard_notDelete');
    } else {
        galleryDeletCard.classList.add('gallery-element__deletCard_notDelete');
    }
    //удаление элемента галереи
    function deletTemCard() {
        delCard(newGalleryElement);
        showPopupProfile(popupDeleteCard);
        galleryDeletCard.removeEventListener('click', deletTemCard);
    };
    galleryDeletCard.addEventListener('click', deletTemCard);

    //реакция на нажатие на изображение и открытие попап
    galleryImage.addEventListener('click', function() {
        showPopupProfile(popupPhoto);
        popupPhotoImage.alt = galleryImage.alt;
        popupPhotoImage.src = galleryImage.src;
        popupPhotoName.textContent = galleryText.textContent;
    });
    return newGalleryElement;
};

//удаление карточки с сервера
function delCard(item) {
    const hoba = item;
    /*я потратил 12 часов чтобы эта херня заработала, завтра же распечатаю этот кусок кода и сожгу к чертям, гори в аду >< */
    function gtg() {
        console.log(hoba.id)
        hoba.remove();
        console.log('kurwa')
        closeAllPopup(popupDeleteCard);
        fetch('https://nomoreparties.co/v1/plus-cohort-4/cards/' + hoba.id, {
            method: 'DELETE',
            headers: {
                authorization: '69b55c42-ee88-4348-a639-420f0f40fb4f',
            },
        });
        document.querySelector('.popup__deleteCard_btn').removeEventListener('click', gtg);
    }
    document.querySelector('.popup__deleteCard_btn').addEventListener('click', gtg);
}
//Начало - добавление карточек галереи по умолчанию
servReq.then((res) => { return res.json(); })
    .then((data) => {
        data.reverse().forEach(function(item) {
            // console.log(item)
            let bz;
            item.likes.forEach(function(rrr) {
                    if (myId === rrr._id) {
                        return bz = 1;
                    }
                    return bz;
                })
                /* for (let i = 0; i < item.likes.length; i++) {}*/
            gallery.prepend(createServCard(item.link, item.name, item.likes.length, item.owner._id, item._id, bz));
        })
    });
//Конец - добавление карточек галереи по умолчанию
//Начало - Добавление карточки пользователем
const createUserCard = (userLink, userText, time) => {
        const userCard = fetch('https://nomoreparties.co/v1/plus-cohort-4/cards', {
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
        let mn;
        userCard.then((res) => {
                if (res.ok) {
                    return res.json()
                };
            }).then((data) => {
                return mn = data;
                //gallery.prepend(createServCard(data.link, data.name, '0', data.owner._id, data._id));
            })
            .finally(setTimeout(() => { gallery.prepend(createServCard(mn.link, mn.name, '0', mn.owner._id, mn._id)) }, time));
    }
    //Конец - Добавление карточки пользователем
export { delCard, popupDeleteCard, deleteButton, popupPhotoImage, popupPhotoName, popupPhotoClose, popupPhoto, gallery, popupCreateNewCard, popupButtonCreateCard, popupAddCardClos, galleryElement, formElement, nameInput, newCardText, newCardLink, createServCard, createUserCard };

/*
fetch('https://nomoreparties.co/v1/plus-cohort-4/cards/', {
        headers: {
            authorization: '69b55c42-ee88-4348-a639-420f0f40fb4f',
            'Content-Type': 'application/json'
        }
    })
    .then((res) => {
        if (res.ok) {
            return res.json()
        }
    })
    .then((data) => {
        data.forEach((item) => {
            console.log(item._id)
        })
    });


for (let i = 0; i < item.likes.length; i++) {
            if (myId === item.likes[i]._id) {
                addLik(item.likes._id);
            }
        }
        let element = item._id;
        // console.log(item._id)
        item.likes.forEach((idLike) => {
            if (myId === idLike._id) {
                //console.log(element)
                addDefoulLike(element)
                document.getElementById(elem).classList.add('gallery-element__caption-like_active')
            }
        })


*/