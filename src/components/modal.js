//Начало - Заполнение полей форм popup
//получение элемента с именем профиля
const popupName = document.querySelector('.profile__info-name');
//ниже аналогия имени но с профессией
const popupProfession = document.querySelector('.profile__info-profession');
//Конец - Заполнение полей форм popup
//кнопка для открытия попап профиля
const popupInfoButton = document.querySelector('.profile__info-button');
//кнопка для закрытия попап профиля
const popupClosetButton = document.querySelector('.popup__cross');
//сам попап профиля
const popupProfile = document.querySelector('.popup_profile');
const jobInput = document.querySelector('#popup__idProfession');
//попап редактирования аватара
const popupAvatar = document.querySelector('.popup_editAvatar');
//Начало - открытие попап
const profAva = document.querySelector('.profile__avatar-wrap-edit');

export { popupName, popupProfession, popupInfoButton, popupClosetButton, popupProfile, jobInput, popupAvatar, profAva };