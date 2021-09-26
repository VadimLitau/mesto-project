//Начало - Заполнение полей форм popup
//получение элемента с именем профиля
const popup_name = document.querySelector('.profile__info-name');
//получение текста имени профиля
const popup_nameText = popup_name.textContent;
//получение инпута имени попап
const popup_nameId = document.getElementById('popup__idName');
//ниже аналогия имени но с профессией
const popup_profession = document.querySelector('.profile__info-profession');
let popup_professionText = popup_profession.textContent;
const popup_professionId = document.getElementById('popup__idProfession');
//Конец - Заполнение полей форм popup
//начало - открытие popup_opened
//нашли кнопку открытия popup
const popup_button = document.querySelector('.profile__info-button');
//нашли popup
const popup = document.querySelector('.popup');
//слушатель для popup
popup_button.addEventListener('click', function() {
    if (!popup.classList.contains('popup_opened')) {
        popup.classList.add('popup_opened');
        popup_nameId.value = popup_nameText;
        popup_professionId.value = popup_professionText;
    }
});
//Конец - открытие popup_opened
//начало - закрытие popup_opened
//нашли кнопку закрытия popup
const popup_closetButton = document.querySelector('.popup__cross');
//слушатель для popup
popup_closetButton.addEventListener('click', function() {
    if (popup.classList.contains('popup_opened')) {
        popup.classList.remove('popup_opened');

    }
});
//Конец - закрытие popup_opened
//Начало - ввод в попап и сохранение на странице
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('#popup__idName');
const jobInput = document.querySelector('#popup__idProfession');
formElement.addEventListener('submit', function(evt) {
    popup_name.textContent = nameInput.value;
    popup_profession.textContent = jobInput.value;
    popup.classList.remove('popup_opened');
    evt.preventDefault();
});
//Конец - ввод в попап и сохранение на странице
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
//Начало - добавление карточек галереи по умолчанию
//получение элемента родителя галереи
const gallery = document.querySelector('.gallery-element');
// добавление карточки галереи из объекта по умолчанию
initialCards.forEach(function(item) {
    //получение контента template
    const galleryElement = document.querySelector('#photo-gallery__element').content;
    //получение копии template элемента
    const newGalleryElement = galleryElement.querySelector('.gallery-element__item').cloneNode(true);
    //получение изображение из копии
    const galleryImage = newGalleryElement.querySelector('.gallery-element__photo');
    //получение текста из копии
    const galleryText = newGalleryElement.querySelector('.gallery-element__caption-name');
    //замена изображения из объекта по умолчанию
    galleryImage.src = item.link;
    //замена текста из объекта по умолчанию
    galleryText.textContent = item.name;
    //Начало - Анимация Лайка
    //получение элемента лайка из копии
    const galleryLike = newGalleryElement.querySelector('.gallery-element__caption-like');
    //реакиця на клик по лайку и замена стиля
    galleryLike.addEventListener('click', function() {
        galleryLike.classList.toggle('gallery-element__caption-like_active');
    });
    //Конец - Анимация Лайка
    //Начало - Удаление карточки
    //получение элемента удаления карточки из копии
    const galleryDeletCard = newGalleryElement.querySelector('.gallery-element__deletCard');
    //реакция на клик по кнопке удаления
    galleryDeletCard.addEventListener('click', function() {
        newGalleryElement.remove();
    });
    //Конец - Удаление карточки
    //Начало - popup показать фото
    //получение родителя для показа фотографии
    const popupPhoto = document.querySelector('.popup-photo');
    //получение изображения для показа фотографии
    const popupPhotoImage = document.querySelector('.popup-photo__photo');
    //получение текста для показа изображения
    const popupPhotoName = document.querySelector('.popup-photo__name');
    //реакция на нажатие на изображение и открытие попап
    galleryImage.addEventListener('click', function() {
        popupPhoto.classList.add('popup-photo_opened');
        popupPhotoImage.src = item.link;
        popupPhotoName.textContent = item.name;
    });
    //получение элемента для закрытие попап показа изображения
    const popupPhotoClose = document.querySelector('.popup-photo__cross');
    popupPhotoClose.addEventListener('click', function() {
        popupPhoto.classList.remove('popup-photo_opened');
    });
    gallery.append(newGalleryElement);
});
//Конец - добавление карточек галереи по умолчанию

//добавление карточки и закрытие попап
//получение кнопки для добавления карточки
const addNewCard = document.querySelector('.popupAddCard__form-button');
//получение текста из попап для названия карточки
const newCardText = document.querySelector('#popupAddCard__firstInput');
//получение ссылки на изображение из попап для карточки
const newCardLink = document.querySelector('#popupAddCard__secondInput');
//добавления карточки пользвателем и закрытие попап
addNewCard.addEventListener('click', function(evt) {
    evt.preventDefault();
    //получение контента template
    const galleryElement = document.querySelector('#photo-gallery__element').content;
    //получение копии template элемента
    const newGalleryElement = galleryElement.querySelector('.gallery-element__item').cloneNode(true);
    //получение изображение из копии
    const galleryImage = newGalleryElement.querySelector('.gallery-element__photo');
    //получение текста из копии
    const galleryText = newGalleryElement.querySelector('.gallery-element__caption-name');
    //замена изображения на введенное пользователем
    galleryImage.src = newCardLink.value;
    //замена текста на введенный пользователем
    galleryText.textContent = newCardText.value;
    //Начало - Анимация Лайка
    //Получение лайка в новой карточке
    const galleryLike = newGalleryElement.querySelector('.gallery-element__caption-like');
    //реакция и замена вида лайка при клике
    galleryLike.addEventListener('click', function() {
        galleryLike.classList.toggle('gallery-element__caption-like_active');
    });
    //Конец - Анимация Лайка
    //Начало - Удаление карточки
    //получение элемента корзины новой карточки
    const galleryDeletCard = newGalleryElement.querySelector('.gallery-element__deletCard');
    //реакция на щелчек по корзине - удаление карточки   
    galleryDeletCard.addEventListener('click', function() {
        newGalleryElement.remove();
    });
    //Конец - Удаление карточки
    //Начало - popup показать фото
    //получение родителя для показа фотографии
    const popupPhoto = document.querySelector('.popup-photo');
    //получение изображения для показа фотографии
    const popupPhotoImage = document.querySelector('.popup-photo__photo');
    //получение текста для показа изображения
    const popupPhotoName = document.querySelector('.popup-photo__name');
    //реакция на нажатие на изображение и открытие попап
    galleryImage.addEventListener('click', function() {
        popupPhoto.classList.add('popup-photo_opened');
        popupPhotoImage.src = newCardLink.value;
        popupPhotoName.textContent = newCardText.value;
    });
    //получение элемента для закрытие попап показа изображения
    const popupPhotoClose = document.querySelector('.popup-photo__cross');
    popupPhotoClose.addEventListener('click', function() {
        popupPhoto.classList.remove('popup-photo_opened');
    });
    gallery.append(newGalleryElement);
    //закрытие попап
    popupAddCard.classList.remove('popupAddCard_opened');
    //добавление карточки в начало галереи
    gallery.prepend(newGalleryElement);

});
//Конец - добавление элемента галлереи
//Начало - Форма добавление карточки
//нашли попап popupAddCard
const popupAddCard = document.querySelector('.popupAddCard');
//нашли кнопку открытия popup
const popup_buttonAddCard = document.querySelector('.profile__button');
//кнопка закрытия popup
const popupAddCardClos = document.querySelector('.popupAddCard__cross');
//слушатель на открытие popupAddCard
popup_buttonAddCard.addEventListener('click', function() {
    if (!popupAddCard.classList.contains('popupAddCard_opened')) {
        popupAddCard.classList.add('popupAddCard_opened');
    }
});
//слушатель на закрытие popupAddCard
popupAddCardClos.addEventListener('click', function() {
    popupAddCard.classList.remove('popupAddCard_opened');
});