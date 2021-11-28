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
const popupProfile = document.querySelector('.popup_profile');
//попап добавления карточки
const popupCreateNewCard = document.querySelector('.popup_AddCard');
//нашли кнопку открытия popup добавления карточки
const popupButtonCreateCard = document.querySelector('.profile__button');
//нашли кнопку закрытия popup добавления карточки
const popupAddCardClos = document.querySelector('.popup_AddCard_cross');
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
const addNewCard = document.querySelector('.popup_AddCard_form-button');
//получение текста из попап для названия карточки
const newCardText = document.querySelector('#popupAddCard__firstInput');
//получение ссылки на изображение из попап для карточки
const newCardLink = document.querySelector('#popupAddCard__secondInput');
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
//Начало - открытие попапПрофиля
//функция открытия попапов
function showPopupProfile(item) {
    item.classList.add('popup_opened');
};
//функция закрытия попапов
function closeAllPopup(item) {
    item.classList.remove('popup_opened');
}
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
function createUserCard(userLink, userText) {
    gallery.prepend(createCard(userLink, userText));
}
//Конец - Добавление карточки пользователем
//открытие popup для профиля
popupInfoButton.addEventListener('click', () => {
    enableValidation();
    showPopupProfile(popupProfile);
    nameInput.value = '';
    jobInput.value = '';
});
//открытиу попап для добавления карточки
popupButtonCreateCard.addEventListener('click', () => {
    showPopupProfile(popupCreateNewCard);
});
//закрытие для попап профиля
popupClosetButton.addEventListener('click', () => {
    closeAllPopup(popupProfile);

});
//закрытие для попап Добавления карточки
popupAddCardClos.addEventListener('click', () => {
    closeAllPopup(popupCreateNewCard);
});
//закрытие попап показа изображения
popupPhotoClose.addEventListener('click', function() {
    popupPhoto.classList.remove('popup_opened');
});
//Начало - ввод в попап и сохранение на странице
formElement.addEventListener('submit', function(evt) {
    popupName.textContent = nameInput.value;
    popupProfession.textContent = jobInput.value;
    closeAllPopup(popupProfile);
    evt.preventDefault();
});
//Конец - ввод в попап и сохранение на странице

//добавление карточки и закрытие попап
popupCreateNewCard.addEventListener('submit', function(evt) {
    closeAllPopup(popupCreateNewCard);
    createUserCard(newCardLink.value, newCardText.value);
    evt.preventDefault();
});

//закрытие попап по щелчку на оверлее или нажати на esc
let popups = document.querySelectorAll('.popup');
for (let i = 0; i < popups.length; i++) {
    document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape' && popups[i].classList.contains('popup_opened')) {
            closeAllPopup(popups[i]);
            console.log(evt.key)
        }
    });
    popups[i].addEventListener('click', (evt) => {
        closeAllPopup(evt.target);
        if (evt.target === document.querySelector('.popup__photo_wrap')) {
            closeAllPopup(popupPhoto);
        };
    });
};

// Валидация инпутов
// const formElement = document.querySelector('.popup__form'); - formElement-.form

// выведите validity в консоль
formElement.querySelector('.popup__form-input').addEventListener('input', function(evt) {
    console.log(evt.target.validity.valid)
});

//добавление класса с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__form-input_type_error'); //form__input_type_error
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__form-input-error_active'); //form__input-error_active
};

//удаление класса с ошибкой
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__form-input_type_error'); //form__input_type_error
    errorElement.textContent = '';
    errorElement.classList.remove('popup__form-input-error_active'); //form__input-error_active
}

//проверка валидности поля
const isValid = (formElement, inputElement) => {
        if (!inputElement.validity.valid) {
            showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            hideInputError(formElement, inputElement);
        }
    }
    //добавим слушатель для всех полей в форме
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__form-input'));
    const buttonElement = formElement.querySelector('.popup__form-button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

//найдем все формы и добавим им обработчики
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
};


//настройка проверки валидации полей для изменения действия кнопки
const hasInvalidInput = (inputlist) => {
    return inputlist.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

//изменение состояния кнопки

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__form-button_disabled');
    } else {
        buttonElement.classList.remove('popup__form-button_disabled');
    }
}

enableValidation();