//получение id пользователя
let userId;
//импорт css файла для webpack
import './../pages/index.css'
//общий импорт
import { openPopup, closePopup } from './utils.js';
//импорт валидации форм
import { validParams, showInputError, hideInputError, isValid, setEventListeners, enableValidation, hasInvalidInput, toggleButtonState } from './validate.js';
//импорт добавления карточек
import { DefaultCard, delServCard, popupDeleteCard, deleteButton, popupPhotoImage, popupPhotoName, popupPhotoClose, popupPhoto, gallery, popupCreateNewCard, popupButtonCreateCard, popupAddCardClos, galleryElement, formElement, nameInput, newCardText, newCardLink, createServCard, createUserCard } from './cards.js';
//импорт закрытие попап по щелчку на оверлее или нажати на esc
import { escPopupClose } from './overClose.js';
//Заполнение полей форм popup
import { popupName, popupProfession, popupInfoButton, popupClosetButton, popupProfile, jobInput, popupAvatar, profAva } from './modal.js';
//Импорт запросов
import Card from './cards.js'
import Section from './Section.js'
//import { udpdateAvatar } from './api.js';
import Api from './api.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
//

const test = new Popup('.popup_AddCard')
    //test.open();
    //test.setEventListeners();
    //Дефолтный запрос к серверу
const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-4',
    headers: {
        authorization: '69b55c42-ee88-4348-a639-420f0f40fb4f',
        'Content-Type': 'application/json'
    }
});
//const myId = api.getUpdateProfile().then((data) => { return userId = data._id });
//console.log(userId)
//Находим кнопку редактирования Аватара
const editAvatar = document.querySelector('.popup_editAvatar_btn');
//Находим кнопку добавления карточки
const newUserCard = document.querySelector('.popup_AddCard_form-button');
//Находим кнопку сохранения данных профиля
const editProfileInfo = document.querySelector('.popup__form-button_profile');
//Находим элемент именем профиля
const profileName = document.querySelector('.profile__info-name');
//находим элемент с профессией профиля
const profileProfession = document.querySelector('.profile__info-profession');
//Находим элемент с аватаром профиля
const profileAvatar = document.querySelector('.profile__avatar');
//загрузка с сервера информации профиля(имя, провессия, аватар, карточки)
api.getDefaultItems().then(([data, cards]) => {
    profileName.textContent = data.name;
    profileProfession.textContent = data.about;
    profileAvatar.src = data.avatar;

    const defaultCardList = new Section({
        data: cards,
        renderer: (items) => {
            const cards = new DefaultCard(items, '#photo-gallery__element', data._id);
            const cardElement = cards.generate();
            defaultCardList.setItem(cardElement);
            cards.addDefaultLike();
            cards.addDeleteButton();
            cards.handleCardClick();
        }
    }, '.gallery-element');
    defaultCardList.addItems();

}).catch((err) => { console.log(err) });

//Временной интервал попапов
const timePopupInterval = 2000;
//действие по клику на аватар
profAva.addEventListener('click', () => {
    openPopup(popupAvatar);
    editAvatar.type = 'button';
    document.querySelector('#popup_editAvatar').value = '';
    editAvatar.classList.add('popup__form-button_disabled');

});
//загрузка нового аватара
editAvatar.addEventListener('click', () => {
    const avatarUrl = document.querySelector('#popup_editAvatar').value;
    editAvatar.textContent = 'Сохранение...'
    api.udpdateAvatar(avatarUrl, 'avatar', '', '').then((data) => {
            document.querySelector('.profile__avatar').src = data.avatar;
            closePopup(popupAvatar)
        })
        .catch((err) => { console.log(err) })
        .finally(() => editAvatar.textContent = 'Сохранить'); //Спасибо за вашу работу и подсказки =)
});

//все элементы попап
const popups = document.querySelectorAll('.popup')
popups.forEach((popup) => {
        popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup__cross') || evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__photo_wrap')) {
                closePopup(popup)
            }
        })
    })
    //открытие popup для профиля
popupInfoButton.addEventListener('click', () => {
    openPopup(popupProfile);
    nameInput.value = popupName.textContent;
    jobInput.value = popupProfession.textContent;
});

//открытиу попап для добавления карточки
popupButtonCreateCard.addEventListener('click', () => {
    openPopup(popupCreateNewCard);
    newCardLink.value = '';
    newCardText.value = '';
    newUserCard.classList.add('popup__form-button_disabled');
    newUserCard.type = 'button';
});

//Начало - ввод в попап и сохранение на странице
formElement.addEventListener('submit', function(evt) {
    editProfileInfo.textContent = 'Сохранение...' // можно устраивать конкурс на самого внимательного человека)
    api.udpdateAvatar('', '', nameInput, jobInput).then((data) => {
            popupName.textContent = nameInput.value
            popupProfession.textContent = jobInput.value
            closePopup(popupProfile)
        })
        .catch((err) => { console.log(err) })
        .finally(() => editProfileInfo.textContent = 'Сохранить'); //моя "внимательность" поражает меня самого
    evt.preventDefault();
});
//Конец - ввод в попап и сохранение на странице
/*
//закрытие для попап Добавления карточки
popupAddCardClos.addEventListener('click', () => {
    closePopup(popupCreateNewCard);
});
*/
//добавление карточки и закрытие попап
popupCreateNewCard.addEventListener('submit', function(evt) {
    createUserCard(newCardLink.value, newCardText.value, timePopupInterval)

    evt.preventDefault();
});
enableValidation(validParams);

//console.log(userId)
export { timePopupInterval, newUserCard, userId, api };