import { escPopupClose } from "./overClose";
//функция открытия попапов
const openPopup = (item) => {
    // item.classList.add('popup_opened');
    //document.addEventListener('keydown', escPopupClose);
    //document.addEventListener('click', escPopupClose);
};
//функция закрытия попапов

const closePopup = (item) => {
    // item.classList.remove('popup_opened')
    //document.removeEventListener('keydown', escPopupClose);
    //document.removeEventListener('click', escPopupClose);  
    return
}

export { openPopup, closePopup };