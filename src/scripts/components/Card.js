export default class Card {
  constructor(name, src, template, openPopup) {
    this._cardName = name;
    this._cardSrc = src;
    this._template = document.querySelector(template).content;
    this._cardElement = this._getCardTemplate();
    this._openPopup = openPopup;
  }

  createCard(){
    this._addContent();
    this._addHandler();
    return this._cardElement;
  }

  _getCardTemplate(){
    return this._template.cloneNode(true);
  }

  _addContent(){
    const imageCard = this._cardElement.querySelector('.card__image');
    this._cardElement.querySelector('.card__title').textContent = this._cardName;
    imageCard.style = `background-image: url('${this._cardSrc}');`;
    imageCard.title = this._cardName;
  }

  _addHandler(){
    this._cardElement.querySelector('.card__image').addEventListener('click', () => {
      this._openPopup(this._cardSrc, this._cardName);
    });

    this._cardElement.querySelector('.card__delete').addEventListener('click',function () {
      this.closest('.card').remove();
    });

    this._cardElement.querySelector('.card__like').addEventListener('click',function () {
      this.classList.toggle('card__like_active');
    });
  }

}