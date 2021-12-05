//импорт css файла для webpack
import './pages/index.css'
//общий импорт
import { showPopupProfile, closeAllPopup } from './components/utils.js';
//импорт валидации форм
import { validParams, showInputError, hideInputError, isValid, setEventListeners, enableValidation, hasInvalidInput, toggleButtonState } from './components/validate.js';
//импорт добавления карточек
import { delServCard, popupDeleteCard, deleteButton, popupPhotoImage, popupPhotoName, popupPhotoClose, popupPhoto, gallery, popupCreateNewCard, popupButtonCreateCard, popupAddCardClos, galleryElement, formElement, nameInput, newCardText, newCardLink, createServCard, createUserCard } from './components/cards.js';
//импорт закрытие попап по щелчку на оверлее или нажати на esc
import { escPopupClose } from './components/overClose.js';
//Заполнение полей форм popup
import { popupName, popupProfession, popupInfoButton, popupClosetButton, popupProfile, jobInput } from './components/modal.js';
//Импорт запросов
import { udpdateAvatar } from './components/api.js';
//Начало - открытие попап
const profAva = document.querySelector('.profile__avatar');
//Временной интервал попапов
const timePopupInterval = 2000;
//действие по клику на аватар
profAva.addEventListener('click', () => {
    showPopupProfile(document.querySelector('.popup_editAvatar'))
});
document.querySelector('.popup_editAvatar_btn').addEventListener('click', () => {
    const avatarUrl = document.querySelector('#popup_editAvatar').value;
    closeAllPopup(document.querySelector('.popup_editAvatar'), timePopupInterval, document.querySelector('.popup_editAvatar_btn'), 'Сохранение...')
    setTimeout(() => {
        console.log(avatarUrl);
        udpdateAvatar(avatarUrl, 'avatar', '', '')
    }, timePopupInterval)

});
//все элементы попап
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
    newCardLink.value = '';
    newCardText.value = '';
    document.querySelector('.popup_AddCard_form-button').classList.add('popup__form-button_disabled');
    document.querySelector('.popup_AddCard_form-button').type = 'button';
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
    /*
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
        });*/
    closeAllPopup(popupProfile, timePopupInterval, document.querySelector('.popup__form-button_profile'), 'Сохранение...');
    setTimeout(() => {
        udpdateAvatar('', '', nameInput, jobInput);
        popupName.textContent = nameInput.value;
        popupProfession.textContent = jobInput.value;
    }, timePopupInterval)
    evt.preventDefault();
});
//Конец - ввод в попап и сохранение на странице
//закрытие для попап Добавления карточки
popupAddCardClos.addEventListener('click', () => {
    closeAllPopup(popupCreateNewCard);
});
//добавление карточки и закрытие попап
popupCreateNewCard.addEventListener('submit', function(evt) {
    closeAllPopup(popupCreateNewCard, timePopupInterval, document.querySelector('.popup_AddCard_form-button'), 'Сохранение...');
    createUserCard(newCardLink.value, newCardText.value, timePopupInterval);

    evt.preventDefault();
});
//вызов валидации форм
enableValidation(validParams);

export { timePopupInterval };