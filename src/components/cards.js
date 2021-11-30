import { showPopupProfile, closeAllPopup } from './utils.js';
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
];
//Создание шаблона карточки
const createCard = (link, name) => {
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
    galleryImage.alt = name;
    galleryImage.src = link;
    galleryText.textContent = name;
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
        popupPhotoImage.alt = name;
        popupPhotoImage.src = link;
        popupPhotoName.textContent = name;
    });
    return newGalleryElement;
};
//Начало - добавление карточек галереи по умолчанию
initialCards.forEach(function(item) {
    gallery.append(createCard(item.link, item.name));
});
//Конец - добавление карточек галереи по умолчанию
//Начало - Добавление карточки пользователем
const createUserCard = (userLink, userText) => {
        gallery.prepend(createCard(userLink, userText));
    }
    //Конец - Добавление карточки пользователем
export { popupPhotoImage, popupPhotoName, popupPhotoClose, popupPhoto, gallery, popupCreateNewCard, popupButtonCreateCard, popupAddCardClos, galleryElement, formElement, nameInput, newCardText, newCardLink, createCard, createUserCard };