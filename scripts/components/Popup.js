export  default class Popup {
  constructor(selector) {
    this._popup = selector;
    this.setEventListeners();
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = e => {
    if (e.key === 'Escape') this.close.bind(this);
  }

  setEventListeners() {
    this._popup.addEventListener('click', e => {
      if (e.target.classList.contains('popup_opened')) this.close();
    });
    this._popup.querySelector('.popup__cross').addEventListener('click', () => {
      this.close();
    });
  }

}