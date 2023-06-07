export default class Card {
  constructor({name, link, _id, likes}, template, openPopup, deletePopup, isOwner, userId, api) {
    this._cardName = name;
    this._cardSrc = link;
    this._id = _id;
    this._likes = likes;
    this._template = document.querySelector(template).content;
    this._cardElement = this._getCardTemplate();
    this._likesElement = this._cardElement.querySelector('.card__like-amount');
    this._likeElement = this._cardElement.querySelector('.card__like');
    this._openPopup = openPopup;
    this._handleDeleteCardPopup = deletePopup;
    this._isOwner = isOwner;
    this._userId = userId;
    this._api = api;
  }

  createCard(){
    this._addContent();
    this._addHandler();
    return this._cardElement;
  }

  _getCardTemplate(){
    return this._template.cloneNode(true);
  }

  _updateLikes(){
    if(this._isLiked()) {
      this._api.deleteCardLike(this._id).then(res => {
          this._likeElement.classList.remove('card__like_active');
          this._likes = res.likes;
          this._likesElement.innerText = this._likes.length;

        })}
    else {
      this._api.addCardLike(this._id).then(res => {
          this._likeElement.classList.add('card__like_active');
          this._likes = res.likes;
          this._likesElement.innerText = this._likes.length;
        })}
  }

  _isLiked(){
    let returnValue = false;
    this._likes.forEach(el=>{
      if(el._id === this._userId) {
        returnValue = true;
      }
    })
    return returnValue !== false;
  }

  _addContent(){
    const imageCard = this._cardElement.querySelector('.card__image');
    this._cardElement.querySelector('.card__title').textContent = this._cardName;
    imageCard.style = `background-image: url('${this._cardSrc}');`;
    if(this._isOwner === false) this._cardElement.querySelector('.card__delete').style.display = 'none';
    imageCard.title = this._cardName;
    this._likesElement.innerText = this._likes.length;
    if(this._isLiked()) this._likeElement.classList.add('card__like_active')
  }

  _addHandler(){
    this._cardElement.querySelector('.card__image').addEventListener('click', () => {
      this._openPopup(this._cardSrc, this._cardName);
    });

    this._cardElement.querySelector('.card__delete').addEventListener('click', () =>{
      this._handleDeleteCardPopup(this._id);
    });

    this._likeElement.addEventListener('click', () => {
      this._updateLikes();
    });
  }

}