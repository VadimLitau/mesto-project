import Popup from './Popup.js'
export default class PopupWithImage extends Popup {
    constructor(selector, image, text) {
        super(selector);
        this.image = image;
        this.text = text;
    }
    open() {
        super.open()
        this._selector.classList.add('popup_opened')
        document.querySelector('.popup__photo-image').src = this.image;
        document.querySelector('.popup__photo-name').textContent = this.text;
        document.querySelector('.popup__photo-image').alt = this.text;
    }
};