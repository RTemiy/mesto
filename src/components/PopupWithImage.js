import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor(selector) {
    super(selector);
    this.setEventListeners();
    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__caption');
  }

  open(src,text) {
    super.open();
    this._image.src = src;
    this._image.alt = text;
    this._caption.innerText = text;
  }
}