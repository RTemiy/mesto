import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor(selector,callback) {
    super(selector);
    this._callback = callback;
    this._form = this._popup.querySelector('.popup__form');
    this.setEventListeners();
  }

  _getInputValues(){
    let values = {};
    Array.of(this._form.querySelectorAll('input')).forEach(el =>{
      values[el.name] = el.value;
    });
    return values;
  }

  setEventListeners(){
    super.setEventListeners();
    this._popup.addEventListener('submit', this._callback);
  }

  close(){
    super.close();
    this._form.reset();
  }
}