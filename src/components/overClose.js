import { showPopupProfile, closeAllPopup } from './utils.js';
import { popupPhoto } from './cards.js';
//закрытие попап по щелчку на оверлее или нажати на esc
let popups = document.querySelectorAll('.popup');
const overClose = () => {
    for (let i = 0; i < popups.length; i++) {
        document.addEventListener('keydown', (evt) => {
            if (evt.key === 'Escape' && popups[i].classList.contains('popup_opened')) {
                closeAllPopup(popups[i]);
                console.log(evt.key)
            }
        });
        popups[i].addEventListener('click', (evt) => {
            closeAllPopup(evt.target);
            if (evt.target === document.querySelector('.popup__photo_wrap')) {
                closeAllPopup(popupPhoto);
            };
        });
    };
};

export { popups, overClose };