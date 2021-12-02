import { escPopupClose } from "./overClose";
import { delCard } from "./cards";
//функция открытия попапов
const showPopupProfile = (item) => {
    item.classList.add('popup_opened');
    document.addEventListener('keydown', escPopupClose);

    //document.addEventListener('click', escPopupClose);
};
//функция закрытия попапов
const closeAllPopup = (item) => {
    item.classList.remove('popup_opened');
    document.removeEventListener('keydown', escPopupClose);
    //document.removeEventListener('click', escPopupClose);
}

export { showPopupProfile, closeAllPopup };