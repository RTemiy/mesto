export default class Card {
  constructor(name, src, template,fieldZoom, captionZoom,imageZoom,openPopup) {
    this._cardName = name;
    this._cardSrc = src;
    this._cardElement = template.cloneNode(true);
    this._fieldZoom = fieldZoom;
    this._captionZoom = captionZoom;
    this._imageZoom = imageZoom;
    this._openPopup = openPopup;
  }

  createCard(){
    this._addContent();
    this._addHandlers();
    return this._cardElement;
  }

  _addContent(){
    const imageCard = this._cardElement.querySelector('.card__image');
    this._cardElement.querySelector('.card__title').textContent = this._cardName;
    imageCard.style = `background-image: url('${this._cardSrc}');`;
    imageCard.title = this._cardName;
  }

  _addHandlers(){
    this._cardElement.querySelector('.card__image').addEventListener('click', () => {
      this._openPopup(this._fieldZoom);
      this._captionZoom.textContent = this._cardName;
      this._imageZoom.src = this._cardSrc;
      this._imageZoom.alt = this._cardName;
    });

    this._cardElement.querySelector('.card__delete').addEventListener('click',function () {
      this.closest('.card').remove();
    });

    this._cardElement.querySelector('.card__like').addEventListener('click',function () {
      this.classList.toggle('card__like_active');
    });
  }

}