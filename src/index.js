//импорт css файла для webpack
import './pages/index.css'
//общий импорт
import { showPopupProfile, closeAllPopup } from './components/utils.js';
//импорт валидации форм
import { validParams, showInputError, hideInputError, isValid, setEventListeners, enableValidation, hasInvalidInput, toggleButtonState } from './components/validate.js';
//импорт добавления карточек
import { popupPhotoImage, popupPhotoName, popupPhotoClose, popupPhoto, gallery, popupCreateNewCard, popupButtonCreateCard, popupAddCardClos, galleryElement, formElement, nameInput, newCardText, newCardLink, createCard, createUserCard } from './components/cards.js';
//импорт закрытие попап по щелчку на оверлее или нажати на esc
import { popups, overClose } from './components/overClose.js';
//Заполнение полей форм popup
import { popupName, popupProfession, popupInfoButton, popupClosetButton, popupProfile, jobInput } from './components/modal.js';
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