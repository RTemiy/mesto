import {settingsFormValidator, api} from '../utils/constants.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import './index.css'
import PopupWithAccept from '../components/PopupWithAccept.js'



const buttonOpenEditProfilePopup= document.querySelector('.profile__edit');
const buttonOpenAddCardPopup= document.querySelector('.profile__add');
const buttonOpenEditAvatarPopup = document.querySelector('.profile__avatar-container');
const inputName = document.querySelector('#form_name');
const inputAbout = document.querySelector('#form_about');
const inputLink = document.querySelector('#form_avatar-link');
const popupAddCard = new PopupWithForm('#popup_add-place', handleFormAddSubmit);
const popupFormEdit = new PopupWithForm('#popup_edit-profile', handleFormEditSubmit);
const popupDeleteCard = new PopupWithAccept('#popup_delete-place', deleteCard);
const popupZoom = new PopupWithImage('#popup_zoom-image');
const popupAvatarEdit = new PopupWithForm('#popup_edit-avatar', handleFormAvatarEditSubmit);
const validatorAddCard = new FormValidator(settingsFormValidator,'#popup_add-place');
const validatorEditProfile = new FormValidator(settingsFormValidator,'#popup_edit-profile');
const validatorAvatarEditProfile = new FormValidator(settingsFormValidator,'#popup_edit-avatar');
const section = new Section('.cards');
const infoUser = new UserInfo('.profile__name','.profile__about', '.profile__avatar');

function renderAllCards(res){
    section.init({items: res, renderer: renderCard});
    section.renderItems();
}

function setUserInfo(res) {
    infoUser.setUserInfo(res);
    infoUser.setUserAvatar(res)
}

function renderCard(data) {
  const card = new Card(data, '#card-template', handleCardClick, handleDeleteCard, infoUser.getUserInfo()._id, likeCard, dislikeCard).createCard();
  section.addItem(card);
}

function handleCardClick(src,text){
  popupZoom.open(src,text);
}

function handleFormEditSubmit (data) {
  return api.sendUserInfo(data).then(() =>{
    infoUser.setUserInfo(data);
  }).catch(err=>{
    console.log(err)
  })
}

function handleFormAddSubmit (data) {
  return api.postCard(data).then(res =>{
    renderCard(res)
  }).catch(err=>{
      console.log(err)
    })
}

function handleDeleteCard(id,el) {
  popupDeleteCard.open(id,el);
}

function deleteCard(id){
  return api.deleteCard(id)
    .catch(err=>{
    console.log(err)
  })
}

function handleFormAvatarEditSubmit(data) {
  return api.sendUserAvatar(data).then(() =>{
    infoUser.setUserAvatar(data);
  })
    .catch(err=>{
    console.log(err)
  })
}

function likeCard(id) {
  return api.deleteCardLike(id).then(res=>{
    return res.likes;
  }).catch(err=>{
    console.log(err)
  })
}

function dislikeCard(id) {
  return api.addCardLike(id).then(res=>{
    return res.likes;
  }).catch(err=>{
    console.log(err)
  })
}

buttonOpenEditProfilePopup.addEventListener('click', function () {
  const values = infoUser.getUserInfo()
  inputName.value= values.name;
  inputAbout.value = values.about;
  popupFormEdit.open();
});

buttonOpenAddCardPopup.addEventListener('click', function () {
  validatorAddCard.disableSubmitButton();
  popupAddCard.open();
});

buttonOpenEditAvatarPopup.addEventListener('click', function (){
  inputLink.value = '';
  popupAvatarEdit.open()
})

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then( res => {
    setUserInfo(res[1])
    renderAllCards(res[0]);
  })
  .catch(err => { console.log(err)})

validatorAddCard.enableValidation();
validatorEditProfile.enableValidation();
validatorAvatarEditProfile.enableValidation()