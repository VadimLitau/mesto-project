import { showPopupProfile, closeAllPopup } from './utils.js';

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
//Начало - добавление элемента галлереи
/*
const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];*/

//Создание шаблона карточки
const createServCard = (servLink, servName, serLike, servId) => {
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
    galleryImage.alt = servName,
        galleryImage.src = servLink,
        galleryText.textContent = servName,
        galleryCounterLikes.textContent = serLike;
    //реакция и замена вида лайка при клике
    galleryLike.addEventListener('click', function() {
        galleryLike.classList.toggle('gallery-element__caption-like_active');
    });
    if (servId != '3382b6ac0c72abf176e18b90') {
        galleryDeletCard.classList.add('gallery-element__deletCard_notDelete');
    } else {
        galleryDeletCard.classList.remove('gallery-element__deletCard_notDelete');
    }
    //реакция на щелчек по корзине - удаление карточки       
    galleryDeletCard.addEventListener('click', function() {
        newGalleryElement.remove();
    });
    /*
    //удалим элемент корзины из копии карточки
    galleryDeletCard.classList.add('gallery-element__deletCard_notDelete');
    */
    //реакция на нажатие на изображение и открытие попап
    galleryImage.addEventListener('click', function() {
        showPopupProfile(popupPhoto);
        popupPhotoImage.alt = galleryImage.alt;
        popupPhotoImage.src = galleryImage.src;
        popupPhotoName.textContent = galleryText.textContent
    });
    return newGalleryElement;
};

//Создание шаблона карточки
const userCard = (userLink, userText) => {
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

    //получение массива с карточками от сервера 
    galleryImage.alt = userText;
    galleryImage.src = userLink;
    galleryText.textContent = userText;
    //реакция и замена вида лайка при клике
    galleryLike.addEventListener('click', function() {
        galleryLike.classList.toggle('gallery-element__caption-like_active');
    });
    //реакция на щелчек по корзине - удаление карточки   
    galleryDeletCard.addEventListener('click', function() {
        newGalleryElement.remove();
    });
    //реакция на нажатие на изображение и открытие попап
    galleryImage.addEventListener('click', function() {
        showPopupProfile(popupPhoto);
        popupPhotoImage.alt = galleryImage.alt;
        popupPhotoImage.src = galleryImage.src;
        popupPhotoName.textContent = galleryText.textContent
    });
    return newGalleryElement;
};
//Начало - добавление карточек галереи по умолчанию
servReq.then((res) => { return res.json(); })
    .then((data) => {
        console.log(data[0].owner._id);
        console.log(data);
        data.forEach(function(item) {
            gallery.prepend(createServCard(item.link, item.name, item.likes.length, item.owner._id));
        })
    });
//Конец - добавление карточек галереи по умолчанию
//Начало - Добавление карточки пользователем
const createUserCard = (userLink, userText) => {
        fetch('https://nomoreparties.co/v1/plus-cohort-4/cards', {
            method: 'POST',
            headers: {
                authorization: '69b55c42-ee88-4348-a639-420f0f40fb4f',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userText,
                link: userLink
            })
        });
        gallery.prepend(userCard(userLink, userText));
    }
    //Конец - Добавление карточки пользователем
export { popupPhotoImage, popupPhotoName, popupPhotoClose, popupPhoto, gallery, popupCreateNewCard, popupButtonCreateCard, popupAddCardClos, galleryElement, formElement, nameInput, newCardText, newCardLink, createServCard, createUserCard, userCard };