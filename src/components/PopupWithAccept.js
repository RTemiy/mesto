import Popup from "./Popup";

export default class PopupWithAccept extends Popup{
  constructor(selector, apiDeleteCard) {
    super(selector);
    this._form = this._popup.querySelector('.popup__form');
    this._apiDeleteCard = apiDeleteCard;
    this.setEventListeners()
  }

  open(id,el) {
    super.open();
    this._setAccept(id);
    this._removeElement = el;
  }

  _setAccept(id){
    this._form.onsubmit = evt =>{
      evt.preventDefault();
      this._apiDeleteCard(id).then(()=>{
        this._removeElement();
        this.close();
      })
    }
  }
}