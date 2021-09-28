//Начало - Заполнение полей форм popup
//получение элемента с именем профиля
const popupName = document.querySelector('.profile__info-name');
//получение инпута имени попап
const popupNameId = document.getElementById('popup__idName');
//ниже аналогия имени но с профессией
const popupProfession = document.querySelector('.profile__info-profession');
const popupProfessionId = document.getElementById('popup__idProfession');
//Конец - Заполнение полей форм popup
//кнопка для открытия попап профиля
const popupInfoButton = document.querySelector('.profile__info-button');
//кнопка для закрытия попап профиля
const popupClosetButton = document.querySelector('.popup__cross');
//сам попап профиля
const popupProfile = document.querySelector('.popup');
//попап добавления карточки
const popupCreateNewCard = document.querySelector('.popupAddCard');
//нашли кнопку открытия popup добавления карточки
const popupButtonCreateCard = document.querySelector('.profile__button');
//нашли кнопку закрытия popup добавления карточки
const popupAddCardClos = document.querySelector('.popupAddCard__cross');
//получение элемента родителя галереи
const gallery = document.querySelector('.gallery-element');
//получение контента template
const galleryElement = document.querySelector('#photo-gallery__element').content;
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('#popup__idName');
const jobInput = document.querySelector('#popup__idProfession');
//получение элемента лайка из копии
const galleryLike = document.querySelector('.gallery-element__caption-like');
//получение кнопки для добавления карточки
const addNewCard = document.querySelector('.popupAddCard__form-button');
//получение текста из попап для названия карточки
const newCardText = document.querySelector('#popupAddCard__firstInput');
//получение ссылки на изображение из попап для карточки
const newCardLink = document.querySelector('#popupAddCard__secondInput');
//получение родителя для показа фотографии
const popupPhoto = document.querySelector('.popup-photo');
//получение изображения для показа фотографии
const popupPhotoImage = document.querySelector('.popup-photo__photo');
//получение текста для показа изображения
const popupPhotoName = document.querySelector('.popup-photo__name');
//получение элемента для закрытие попап показа изображения
const popupPhotoClose = document.querySelector('.popup-photo__cross');

//объект попап профиля
const popupInfo = {
    source: popupProfile,
    class: 'popup_opened',
    firstInput: popupNameId.value = popupName.textContent,
    secondInput: popupProfessionId.value = popupProfession.textContent
};
//объект попап добавления карточки
const popupCreateCard = {
    source: popupCreateNewCard,
    class: 'popupAddCard_opened'
};
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
//Начало - открытие попапПрофиля
//функция открытия попапов
function showPopupProfile(item) {
    item.source.classList.add(item.class);
    item.firstInput;
    item.secondInput;
};
//функция закрытия попапов
function closeAllPopup(item) {
    item.source.classList.remove(item.class);
}
//Переменная для хранения шаблона карточки
let copyCard;
//Создание шаблона карточки
function createCard(link, name) {
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
        popupPhoto.classList.add('popup-photo_opened');
        popupPhotoImage.alt = name;
        popupPhotoImage.src = link;
        popupPhotoName.textContent = name;
    });
    //закрытие попап показа изображения
    popupPhotoClose.addEventListener('click', function() {
        popupPhoto.classList.remove('popup-photo_opened');
    });
    copyCard = newGalleryElement;
    return copyCard;
};
//Начало - добавление карточек галереи по умолчанию
initialCards.forEach(function(item) {
    createCard(item.link, item.name);
    gallery.append(copyCard);
});
//Конец - добавление карточек галереи по умолчанию
//Начало - Добавление карточки пользователем
function createUserCard(userLink, userText) {
    createCard(userLink, userText);
    gallery.prepend(copyCard);
}
//Конец - Добавление карточки пользователем
//открытие popup для профиля
popupInfoButton.addEventListener('click', () => {
    showPopupProfile(popupInfo);
});
//открытиу попап для добавления карточки
popupButtonCreateCard.addEventListener('click', () => {
    showPopupProfile(popupCreateCard);
});
//закрытие для попап профиля
popupClosetButton.addEventListener('click', () => {
    closeAllPopup(popupInfo);
});
//закрытие для попап Добавления карточки
popupAddCardClos.addEventListener('click', () => {
    closeAllPopup(popupCreateCard);
});
//Начало - ввод в попап и сохранение на странице
formElement.addEventListener('submit', function(evt) {
    popupName.textContent = nameInput.value;
    popupProfession.textContent = jobInput.value;
    popupProfile.classList.remove('popup_opened');
    evt.preventDefault();
});
//Конец - ввод в попап и сохранение на странице

//добавление карточки и закрытие попап
addNewCard.addEventListener('click', function(evt) {
    evt.preventDefault();
    popupCreateNewCard.classList.remove('popupAddCard_opened');
    createUserCard(newCardLink.value, newCardText.value)
});