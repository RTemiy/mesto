import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  open(src,text) {
    super.open();
    this._popup.querySelector('.popup__image').src = src;
    this._popup.querySelector('.popup__image').alt = text;
    this._popup.querySelector('.popup__caption').innerText = text;
  }
}