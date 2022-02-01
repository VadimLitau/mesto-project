import { openPopup, closePopup } from './utils.js';
import Api from './api.js';
import { timePopupInterval, newUserCard, userId, api, myId } from './index.js';
import Section from './Section.js';

import PopupWithImage from './PopupWithImage.js';
//let usersId; если объявить эту переменную здесь и получать информацию из запроса о карточках, то все работает нормально. Если ее объявить в индексе, то передать сюда достаточно сложно, простого способа я не нашел, а то как делал, давало результат 50/50
const defCard = new Api({
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-4',
    headers: {
        authorization: '69b55c42-ee88-4348-a639-420f0f40fb4f',
        'Content-Type': 'application/json'
    },
});

//Вадим - врединка
export default class Card {
    constructor(selector) {
        this._selector = selector;
    }

    _getElement() {
        const cardElement = document
            .querySelector(this._selector)
            .content
            .querySelector('.gallery-element__item')
            .cloneNode(true);

        return cardElement;
    }
    handleCardClick() {
        this._element.querySelector('.gallery-element__photo').addEventListener('click', (evt) => {
            const cardPopup = new PopupWithImage('.popup__photo', this._image, this._title);
            cardPopup.open();
            cardPopup.setEventListeners();
        })
    }



}
class DefaultCard extends Card {
    constructor(data, selector, userId) {
        super(selector);
        //owner._id - автор карточки
        //_id - карточка
        this._title = data.name;
        this._likesLength = data.likes.length;
        this._image = data.link;
        this._likes = data.likes;
        this._cardId = data.owner._id;
        this._userId = userId;
        //this._myId = myId;
        //console.log(this._cardId)

    }
    generate() {
        this._element = super._getElement();
        this._element.querySelector('.gallery-element__photo').src = this._image;
        this._element.querySelector('.gallery-element__caption-name').textContent = this._title;
        this._element.querySelector('.gallery-element__like-counter').textContent = this._likesLength;
        this._element.id = this._cardId;

        return this._element;
    }

    addDefaultLike() {
        this._likes.forEach((item) => {
            if (this._userId === item._id) {
                this._element.querySelector('.gallery-element__caption-like').classList.add('gallery-element__caption-like_active');
            }
        })
    }
    addDeleteButton() {
        if (this._userId === this._cardId) {
            this._element.querySelector('.gallery-element__deletCard').classList.remove('gallery-element__deletCard_notDelete');
        } else {
            this._element.querySelector('.gallery-element__deletCard').classList.add('gallery-element__deletCard_notDelete');
        }
    }


}
/*
const item = [{
        title: 'FotoPrimer1',
        likes: '1',
        image: 'https://img3.goodfon.ru/original/1440x900/0/bb/korol-charodei-angmara-vlastelin-kolets-nazgul-art.jpg'
    },
    {
        title: 'FotoPrimer2',
        likes: '2',
        image: 'https://img3.goodfon.ru/original/1440x900/0/bb/korol-charodei-angmara-vlastelin-kolets-nazgul-art.jpg'
    },
    {
        title: 'FotoPrimer3',
        likes: '3',
        image: 'https://img3.goodfon.ru/original/1440x900/0/bb/korol-charodei-angmara-vlastelin-kolets-nazgul-art.jpg'
    }
];

defCard.getServCard().then((card) => {



});
*/
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
            api.likesServAdd(servPhotoId, 'DELETE').then((data) => {
                galleryCounterLikes.textContent = data.likes.length;
                galleryLike.classList.remove('gallery-element__caption-like_active')
            }).catch((err) => { console.log(err) });
        } else {
            api.likesServAdd(servPhotoId, 'PUT').then((data) => {
                galleryCounterLikes.textContent = data.likes.length;
                galleryLike.classList.add('gallery-element__caption-like_active')
            }).catch((err) => { console.log(err) }); //очень полезно, я ведь изначально ставил их, а потом зачем-то убрал о_О
        }
    });

    //добавлять или нет элемент корзины на карточку
    //console.log('servif ' + servId);
    //console.log('userId ' + userId);
    if (servId === userId) {
        galleryDeletCard.classList.remove('gallery-element__deletCard_notDelete');
    } else {
        galleryDeletCard.classList.add('gallery-element__deletCard_notDelete');
    }
    //удаление элемента галереи

    //function deletTemCard() {
    //openPopup(popupDeleteCard);
    // delCard(newGalleryElement);
    // galleryDeletCard.removeEventListener('click', deletTemCard);
    //};
    galleryDeletCard.addEventListener('click', () => {
        //openPopup(popupDeleteCard);
        delCard(newGalleryElement);
    });

    //реакция на нажатие на изображение и открытие попап
    galleryImage.addEventListener('click', function() {
        openPopup(popupPhoto);
        popupPhotoImage.alt = galleryImage.alt;
        popupPhotoImage.src = galleryImage.src;
        popupPhotoName.textContent = galleryText.textContent;
    });
    return newGalleryElement;
};
//удаление карточки с сервера
function delCard(item) {
    //const ji = document.getElementById(item.id);
    // console.log(ji);

    api.deleteServCard(item.id).then((data) => {
            //closePopup(popupDeleteCard);
            item.remove();
        }).catch((err) => { console.log(err) })
        //пусть пока это останется, попробую завтра на свежую голову еще поколдовать
        //const hoba = item; //эта переменная прекрасна
        //я потратил 12 часов чтобы эта херня заработала, завтра же распечатаю этот кусок кода и сожгу к чертям, гори в аду >< 

    //console.log(hoba.id)
    //item.remove();
    // console.log('kurwa')
    //closePopup(popupDeleteCard);
    // deleteServCard(item.id);
    //document.querySelector('.popup__deleteCard_btn').removeEventListener('click', gtg);

    //function gtg() { document.querySelector('.popup__deleteCard_btn').addEventListener('click', gtg); }
}
//Начало - добавление карточек галереи по умолчанию

//getDefoultItems().then((data) => {
//    userId = data[0]._id;
//    data[1].reverse().forEach(function(item) {
//        let elem;
//        item.likes.forEach(function(rrr) {
//            if (userId === rrr._id) {
//                return elem = 1;
//            }
//            return elem;
//        })
//        gallery.prepend(createServCard(item.link, item.name, item.likes.length, item.owner._id, item._id, elem));
//    });
//}).catch((err) => { console.log(err) });

//Конец - добавление карточек галереи по умолчанию
//Начало - Добавление карточки пользователем
const createUserCard = (userLink, userText) => {
        newUserCard.textContent = 'Сохранить...'
        api.addUserCard(userLink, userText, timePopupInterval).then((data) => {
                gallery.prepend(createServCard(data.link, data.name, '0', data.owner._id, data._id));
                closePopup(popupCreateNewCard);
            }).catch((err) => { console.log(err) })
            .finally(() => newUserCard.textContent = 'Создать');
    }
    //Конец - Добавление карточки пользователем
    //gallery.prepend(card)
    /*
    gallery.prepend(createServCard(
        'https://sun2.beeline-kz.userapi.com/impg/ktklgmhvQuYLaGwZhU76QSolHFmnjiReF03q2A/o39UZYHk_H0.jpg?size=1280x701&quality=95&sign=1c252aa8cc6975b23197a61dac4f4c2a&type=album',
        'мащина',
        '2',
        'servId',
        'servPhotoId',
        true));
    */
export { DefaultCard, delCard, popupDeleteCard, deleteButton, popupPhotoImage, popupPhotoName, popupPhotoClose, popupPhoto, gallery, popupCreateNewCard, popupButtonCreateCard, popupAddCardClos, galleryElement, formElement, nameInput, newCardText, newCardLink, createServCard, createUserCard };