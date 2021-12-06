import { escPopupClose } from "./overClose";
import { delCard } from "./cards";
//функция открытия попапов
const openPopup = (item) => {
    item.classList.add('popup_opened');
    document.addEventListener('keydown', escPopupClose);

    //document.addEventListener('click', escPopupClose);
};
//функция закрытия попапов

const closePopup = (item, time) => {
    if (time) {
        setTimeout(() => {
            item.classList.remove('popup_opened')
            return
        }, time);
    } else {
        item.classList.remove('popup_opened')
    }

    document.removeEventListener('keydown', escPopupClose);
    //document.removeEventListener('click', escPopupClose);  
    return
}

export { openPopup, closePopup };