//импорт css файла для webpack
import './pages/index.css'
//общий импорт
import { showPopupProfile, closeAllPopup } from './components/utils.js';
//импорт валидации форм
import { validParams, showInputError, hideInputError, isValid, setEventListeners, enableValidation, hasInvalidInput, toggleButtonState } from './components/validate.js';
//импорт добавления карточек
import { popupPhotoImage, popupPhotoName, popupPhotoClose, popupPhoto, gallery, popupCreateNewCard, popupButtonCreateCard, popupAddCardClos, galleryElement, formElement, nameInput, newCardText, newCardLink, createServCard, createUserCard, userCard } from './components/cards.js';
//импорт закрытие попап по щелчку на оверлее или нажати на esc
import { escPopupClose } from './components/overClose.js';
//Заполнение полей форм popup
import { popupName, popupProfession, popupInfoButton, popupClosetButton, popupProfile, jobInput } from './components/modal.js';
//Начало - открытие попап
const popups = document.querySelectorAll('.popup')
popups.forEach((popup) => {
        popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup__cross') || evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__photo_wrap')) {
                closeAllPopup(popup)
            }
        })
    })
    //открытие popup для профиля
popupInfoButton.addEventListener('click', () => {
    showPopupProfile(popupProfile);
    nameInput.value = popupName.textContent;
    jobInput.value = popupProfession.textContent;
});

//открытиу попап для добавления карточки
popupButtonCreateCard.addEventListener('click', () => {
    showPopupProfile(popupCreateNewCard);
});
/*
//закрытие для попап профиля
popupClosetButton.addEventListener('click', () => {

    closeAllPopup(popupProfile);
});
//закрытие попап показа изображения
popupPhotoClose.addEventListener('click', function() {
    popupPhoto.classList.remove('popup_opened');
});*/
//Начало - ввод в попап и сохранение на странице
formElement.addEventListener('submit', function(evt) {
    fetch('https://nomoreparties.co/v1/plus-cohort-4/users/me', {
        method: 'PATCH',
        headers: {
            authorization: '69b55c42-ee88-4348-a639-420f0f40fb4f',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nameInput.value,
            about: jobInput.value
        })
    });
    popupName.textContent = nameInput.value;
    popupProfession.textContent = jobInput.value;
    closeAllPopup(popupProfile);
    evt.preventDefault();
});
//Конец - ввод в попап и сохранение на странице
//закрытие для попап Добавления карточки
popupAddCardClos.addEventListener('click', () => {
    closeAllPopup(popupCreateNewCard);
});
//добавление карточки и закрытие попап
popupCreateNewCard.addEventListener('submit', function(evt) {
    closeAllPopup(popupCreateNewCard);
    createUserCard(newCardLink.value, newCardText.value);
    newCardLink.value = '';
    newCardText.value = '';
    document.querySelector('.popup_AddCard_form-button').classList.add('popup__form-button_disabled');
    document.querySelector('.popup_AddCard_form-button').type = 'button';
    evt.preventDefault();
});
//вызов валидации форм
enableValidation(validParams);

//запросы к серверу
fetch('https://nomoreparties.co/v1/plus-cohort-4/users/me', {
        headers: {
            authorization: '69b55c42-ee88-4348-a639-420f0f40fb4f'
        }
    })
    .then((res) => {
        return res = res.json();
    })
    .then((data) => {
        document.querySelector('.profile__info-name').textContent = data.name;
        document.querySelector('.profile__info-profession').textContent = data.about;
        document.querySelector('.profile__avatar').src = data.avatar;
    });

/*проба пера
const myPromise =
    fetch('https://nomoreparties.co/v1/plus-cohort-4/cards', {
        headers: {
            authorization: '69b55c42-ee88-4348-a639-420f0f40fb4f'
        }
    });

let hoba = '';

myPromise.then((res) => { return res.json(); })
    .then((data) => {
        data.forEach(function(item) {
            console.log(item.name);
        })
    });
    */