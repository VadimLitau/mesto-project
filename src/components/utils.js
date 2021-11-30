//функция открытия попапов
const showPopupProfile = (item) => {
    item.classList.add('popup_opened');
};
//функция закрытия попапов
const closeAllPopup = (item) => {
    item.classList.remove('popup_opened');
}

export { showPopupProfile, closeAllPopup };