export default class Popup {
    constructor(selector) {
        this._selector = document.querySelector(selector)
        this.handleEscClose = this.handleEscClose.bind(this);
    }
    open() {
        this._selector.classList.add('popup_opened')
        document.addEventListener('keydown', this.handleEscClose);
    };
    close() {
        this._selector.classList.remove('popup_opened')
        document.removeEventListener('keydown', this.handleEscClose);
    };
    handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close()
        }
    }
    closeOverlay(evt) {
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__photo_wrap')) {
            this.close()
        }
    }
    setEventListeners() {
        this._selector.querySelector('.popup__cross').addEventListener('click', () => {
            this.close()
        })
        this._selector.addEventListener('click', (evt) => {
            this.closeOverlay(evt)
        })
    }
}