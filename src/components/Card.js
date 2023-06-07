export default class Card {
  constructor({name, link, _id, likes,owner}, template, openPopup, deletePopup, userId, likeCard, dislikeCard) {
    this._cardName = name;
    this._cardSrc = link;
    this._id = _id;
    this._likes = likes;
    this._ownerId = owner._id;
    this._template = document.querySelector(template).content;
    this._cardElement = this._getCardTemplate();
    this._likesElement = this._cardElement.querySelector('.card__like-amount');
    this._likeElement = this._cardElement.querySelector('.card__like');
    this._openPopup = openPopup;
    this._handleDeleteCardPopup = deletePopup;
    this._userId = userId;
    this._likeCard = likeCard;
    this._dislikeCard = dislikeCard;
  }

  createCard(){
    this._addContent();
    this._addHandler();
    return this._cardElement;
  }

  _getCardTemplate(){
    return this._template.querySelector('.card').cloneNode(true);
  }

  _isOwner(){
    return this._userId !== this._ownerId;
  }

  _updateLikes(){
    if(this._isLiked()) {
      this._likeCard(this._id).then(res => {
          this._likeElement.classList.remove('card__like_active');
          this._setLikesAmount(res);
        })
        .catch(err=>{
          console.log(err)
        })}
    else {
      this._dislikeCard(this._id).then(res => {
          this._likeElement.classList.add('card__like_active');
          this._setLikesAmount(res);
        })
        .catch(err=>{
          console.log(err)
        })}
  }

  _setLikesAmount(array){
    this._likes = array;
    this._likesElement.innerText = this._likes.length;
  }

  _isLiked(){
    return this._likes.some(like => like._id === this._userId)
  }

  _addContent(){
    const imageCard = this._cardElement.querySelector('.card__image');
    this._cardElement.querySelector('.card__title').textContent = this._cardName;
    imageCard.style = `background-image: url('${this._cardSrc}');`;
    if(this._isOwner(this._ownerId)) this._cardElement.querySelector('.card__delete').style.display = 'none';
    imageCard.title = this._cardName;
    this._likesElement.innerText = this._likes.length;
    if(this._isLiked()) this._likeElement.classList.add('card__like_active')
  }

  _addHandler(){
    this._cardElement.querySelector('.card__image').addEventListener('click', () => {
      this._openPopup(this._cardSrc, this._cardName);
    });

    this._cardElement.querySelector('.card__delete').addEventListener('click', () =>{
      this._handleDeleteCardPopup(this._id,this.remove.bind(this));
    });

    this._likeElement.addEventListener('click', () => {
      this._updateLikes();
    });
  }

  remove(){
    this._cardElement.remove();
  }

}