import {initialCards, settingsFormValidator} from '../scripts/utils/constants.js'
import Card from '../scripts/components/Card.js'
import FormValidator from '../scripts/components/FormValidator.js'
import Section from '../scripts/components/Section.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import PopupWithForm from '../scripts/components/PopupWithForm.js'
import UserInfo from '../scripts/components/UserInfo.js'
import './index.css'

const buttonOpenEditProfilePopup= document.querySelector('.profile__edit');
const buttonOpenAddCardPopup= document.querySelector('.profile__add');
const inputName = document.querySelector('#form_name');
const inputAbout = document.querySelector('#form_about');

const popupAddCard = new PopupWithForm('#popup_add-place', handleFormAddSubmit);
const popupFormEdit = new PopupWithForm('#popup_edit-profile', handleFormEditSubmit);
const popupZoom = new PopupWithImage('#popup_zoom-image');
const validatorAddCard = new FormValidator(settingsFormValidator,'#popup_add-place');
const validatorEditProfile = new FormValidator(settingsFormValidator,'#popup_edit-profile');
const section = new Section({items: initialCards, renderer: renderCard}, '.cards');
const infoUser = new UserInfo('.profile__name','.profile__about');

function renderCard({name, src}) {
    const card = new Card(name, src, '#card-template', handleCardClick).createCard();
    section.addItem(card);
}

function handleCardClick(src,text){
  popupZoom.open(src,text);
}

function handleFormEditSubmit (data) {
  infoUser.setUserInfo(data);
}

function handleFormAddSubmit (data) {
  renderCard(data);
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

validatorAddCard.enableValidation();
validatorEditProfile.enableValidation();

section.renderItems();