//импорт css файла для webpack
import './../pages/index.css'
//общий импорт
import { showPopupProfile, closeAllPopup } from './utils.js';
//импорт валидации форм
import { validParams, showInputError, hideInputError, isValid, setEventListeners, enableValidation, hasInvalidInput, toggleButtonState } from './validate.js';
//импорт добавления карточек
import { delServCard, popupDeleteCard, deleteButton, popupPhotoImage, popupPhotoName, popupPhotoClose, popupPhoto, gallery, popupCreateNewCard, popupButtonCreateCard, popupAddCardClos, galleryElement, formElement, nameInput, newCardText, newCardLink, createServCard, createUserCard } from './cards.js';
//импорт закрытие попап по щелчку на оверлее или нажати на esc
import { escPopupClose } from './overClose.js';
//Заполнение полей форм popup
import { popupName, popupProfession, popupInfoButton, popupClosetButton, popupProfile, jobInput } from './modal.js';
//Импорт запросов
import { udpdateAvatar, getUpdateProfile } from './api.js';
//загрузка с сервера информации профиля(имя, провессия, аватар)
getUpdateProfile().then((data) => {
    document.querySelector('.profile__info-name').textContent = data.name;
    document.querySelector('.profile__info-profession').textContent = data.about;
    document.querySelector('.profile__avatar').src = data.avatar;
});;
//Начало - открытие попап
const profAva = document.querySelector('.profile__avatar-wrap-edit');
//Временной интервал попапов
const timePopupInterval = 2000;
//действие по клику на аватар
profAva.addEventListener('click', () => {
    showPopupProfile(document.querySelector('.popup_editAvatar'));
    document.querySelector('.popup_editAvatar_btn').textContent = 'Сохранить';
    document.querySelector('.popup_editAvatar_btn').type = 'button';
    document.querySelector('.popup_editAvatar_btn').classList.add('popup__form-button_disabled');
    document.querySelector('#popup_editAvatar').value = '';
});
document.querySelector('.popup_editAvatar_btn').addEventListener('click', () => {
    const avatarUrl = document.querySelector('#popup_editAvatar').value;
    closeAllPopup(document.querySelector('.popup_editAvatar'), timePopupInterval, document.querySelector('.popup_editAvatar_btn'), 'Сохранение...')
    setTimeout(() => {
        //console.log(avatarUrl);
        udpdateAvatar(avatarUrl, 'avatar', '', '').then((data) => {
            document.querySelector('.profile__avatar').src = data.avatar;
        });
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
    document.querySelector('.popup__form-button_profile').textContent = 'Сохранить';
});

//открытиу попап для добавления карточки
popupButtonCreateCard.addEventListener('click', () => {
    showPopupProfile(popupCreateNewCard);
    newCardLink.value = '';
    newCardText.value = '';
    document.querySelector('.popup_AddCard_form-button').textContent = 'Создать';
    document.querySelector('.popup_AddCard_form-button').classList.add('popup__form-button_disabled');
    document.querySelector('.popup_AddCard_form-button').type = 'button';
});

//Начало - ввод в попап и сохранение на странице
formElement.addEventListener('submit', function(evt) {
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
const allDelButn = document.querySelectorAll('.gallery-element__deletCard');
console.log(allDelButn)
export { timePopupInterval };