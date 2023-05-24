import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor(selector,callback) {
    super(selector);
    this._callback = callback;
    this._form = this._popup.querySelector('.popup__form');
    this.setEventListeners();
  }

  _getInputValues(){
    const values = {};
    this._form.querySelectorAll('input').forEach(el =>{
      values[el.name] = el.value;
    });
    return values;
  }

  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', evt=>{
      evt.preventDefault();
      this._callback(this._getInputValues());
      this.close();
    });
  }

  close(){
    super.close();
    this._form.reset();
  }
}