import {settingsFormValidator} from '../scripts/utils/constants.js'
import Card from '../scripts/components/Card.js'
import FormValidator from '../scripts/components/FormValidator.js'
import Section from '../scripts/components/Section.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import PopupWithForm from '../scripts/components/PopupWithForm.js'
import UserInfo from '../scripts/components/UserInfo.js'
import './index.css'
import Api from "../scripts/components/Api.js";
import PopupWithAccept from '../scripts/components/PopupWithAccept.js'

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: 'b60faf18-093f-4cca-bf55-4f4ebd3dcaef',
    'Content-Type': 'application/json'
  }
});

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

function renderAllCards(){
  section.clean();
  api.getInitialCards().then( res => {
    section.init({items: res, renderer: renderCard});
    section.renderItems();
  });
}

function isOwner(data){
  if(infoUser.getUserInfo()._id === data.owner._id) return infoUser.getUserInfo()._id;
  else return false
}

function setUserInfo() {
  return api.getUserInfo().then(res => {
    infoUser.setUserInfo(res);
    infoUser.setUserAvatar(res)
  })
}

function renderCard(data) {
  const card = new Card(data, '#card-template', handleCardClick, handleDeleteCard, isOwner(data), infoUser.getUserInfo()._id, api).createCard();
  section.addItem(card);
}

function handleCardClick(src,text){
  popupZoom.open(src,text);
}

function handleFormEditSubmit (data) {
  return api.sendUserInfo(data).then(() =>{
        infoUser.setUserInfo(data);
  })
}

function handleFormAddSubmit (data) {
  return api.postCard(data).then(() =>{
    renderAllCards()
  })
}

function handleDeleteCard(id) {
  popupDeleteCard.open(id);
}

function deleteCard(id){
  api.deleteCard(id).then(()=>{renderAllCards()});
}

function handleFormAvatarEditSubmit(data) {
  return api.sendUserAvatar(data).then(() =>{
    infoUser.setUserAvatar(data);
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
  inputLink.value = document.querySelector('.profile__avatar').src;
  popupAvatarEdit.open()
})

setUserInfo().then(()=>{renderAllCards()});

validatorAddCard.enableValidation();
validatorEditProfile.enableValidation();
validatorAvatarEditProfile.enableValidation()