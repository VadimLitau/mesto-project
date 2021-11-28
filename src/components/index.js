//общий импорт
import { showPopupProfile, closeAllPopup } from './utils.js';
//импорт валидации форм
import { validParams, showInputError, hideInputError, isValid, setEventListeners, enableValidation, hasInvalidInput, toggleButtonState } from './validate.js';
//импорт добавления карточек
import { popupPhotoImage, popupPhotoName, popupPhotoClose, popupPhoto, gallery, popupCreateNewCard, popupButtonCreateCard, popupAddCardClos, galleryElement, formElement, nameInput, newCardText, newCardLink, initialCards, createCard, createUserCard } from './cards.js';
//импорт закрытие попап по щелчку на оверлее или нажати на esc
import { popups, overClose } from './overClose.js';
//Заполнение полей форм popup
import { popupName, popupProfession, popupInfoButton, popupClosetButton, popupProfile, jobInput } from './modal.js';
//Начало - открытие попапПрофиля
//открытие popup для профиля
popupInfoButton.addEventListener('click', () => {
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
//закрытие для попап Добавления карточки
popupAddCardClos.addEventListener('click', () => {
    closeAllPopup(popupCreateNewCard);
});
//добавление карточки и закрытие попап
popupCreateNewCard.addEventListener('submit', function(evt) {
    closeAllPopup(popupCreateNewCard);
    createUserCard(newCardLink.value, newCardText.value);
    evt.preventDefault();
});
//вызов закрытия через оверлей
overClose();
//вызов валидации форм
enableValidation(validParams);