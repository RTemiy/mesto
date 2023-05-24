import Card from '../scripts/components/Card.js'
import FormValidator from '../scripts/components/FormValidator.js'
import Section from '../scripts/components/Section.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import PopupWithForm from '../scripts/components/PopupWithForm.js'
import UserInfo from '../scripts/components/UserInfo.js'
import './index.css'

const initialCards = [
  {
    name : 'İslam Sanatı Müzesi, Doha, Qatar',
    src : 'https://images.unsplash.com/photo-1679948905560-2c06b21d43c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    name : 'Braşov, Roumanie',
    src : 'https://images.unsplash.com/photo-1680003935289-0c8d65e1ae30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    name : 'Antwerp, Belgium',
    src : 'https://images.unsplash.com/photo-1679918873565-2f33f6e0debe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    name : 'Szczecin, Poland',
    src : 'https://images.unsplash.com/photo-1679940573633-6eb737c8b7f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80',
  },
  {
    name : 'Andaz Mayakoba Resort Riviera Maya',
    src : 'https://images.unsplash.com/photo-1679939099392-efa3c55c2b71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
  },
  {
    name : 'Boston, United States',
    src : 'https://images.unsplash.com/photo-1679957537204-6723a5afe5dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
  },
];

const cardContainer = document.querySelector('.cards');
const templateCard = document.querySelector('#card-template').content;
const formEditProfile = document.querySelector('#popup_edit-profile');
const formAddCard = document.querySelector('#popup_add-place');
const textProfileName= document.querySelector('.profile__name');
const textProfileAbout= document.querySelector('.profile__about');
const textPlaceName= document.querySelector('#form_place-name');
const linkPlace= document.querySelector('#form_place-link');
const buttonOpenEditProfilePopup= document.querySelector('.profile__edit');
const buttonOpenAddCardPopup= document.querySelector('.profile__add');
const fieldZoom = document.querySelector('#popup_zoom-image');
const imageZoom = fieldZoom.querySelector('.popup__image');
const captionZoom = fieldZoom.querySelector('.popup__caption');
const inputName = document.querySelector('#form_name');
const inputAbout = document.querySelector('#form_about');
const settingsFormValidator = {

  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  activeButtonClass: 'popup__button-submit_activated',
  inputErrorClass: 'popup__input_type_error',

}

const popupAddCard = new PopupWithForm(formAddCard, handleFormAddSubmit);
const popupFormEdit = new PopupWithForm(formEditProfile, handleFormEditSubmit);
const popupZoom = new PopupWithImage(fieldZoom);
const validatorAddCard = new FormValidator(settingsFormValidator,formAddCard);
const validatorEditProfile = new FormValidator(settingsFormValidator,formEditProfile);
const section = new Section({items: initialCards, renderer: renderCard}, cardContainer);
const infoUser = new UserInfo(textProfileName,textProfileAbout);

function renderCard({name, src}) {
    const card = new Card(name, src, templateCard, fieldZoom, captionZoom, imageZoom, handleCardClick).createCard();
    cardContainer.prepend(card);
}

function handleCardClick(src,text){
  popupZoom.open(src,text);
}

function handleFormEditSubmit (evt) {
  evt.preventDefault();
  infoUser.setUserInfo({name: inputName.value, about : inputAbout.value})
  popupFormEdit.close();
}

function handleFormAddSubmit (evt) {
  evt.preventDefault();
  validatorAddCard.disableSubmitButton();
  renderCard({name : textPlaceName.value, src : linkPlace.value});
  popupAddCard.close();
}

buttonOpenEditProfilePopup.addEventListener('click', function () {
  inputName.value= infoUser.getUserInfo().name;
  inputAbout.value = infoUser.getUserInfo().about;
  popupFormEdit.open();
});

buttonOpenAddCardPopup.addEventListener('click', function () {
  popupAddCard.open();
});

validatorAddCard.enableValidation();
validatorEditProfile.enableValidation();

section.renderItems();