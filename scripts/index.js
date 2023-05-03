import Card from './Card.js'
import FormValidator from  './FormValidator.js'

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
const formAdd = document.querySelector('#form_add');
const textProfileName= document.querySelector('.profile__name');
const textProfileAbout= document.querySelector('.profile__about');
const textPlaceName= document.querySelector('#form_place-name');
const linkPlace= document.querySelector('#form_place-link');
const buttonOpenEditProfilePopup= document.querySelector('.profile__edit');
const buttonOpenAddCardPopup= document.querySelector('.profile__add');
const buttonCloseZoomPopup= document.querySelector('#popup-zoom_close');
const buttonCloseEditProfilePopup= document.querySelector('#popup-edit_close');
const buttonCloseAddCardProfilePopup= document.querySelector('#popup-add_close');
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

function addCard(card){
  cardContainer.prepend(card);
}

function createCard(name, src, template,fieldZoom,captionZoom,imageZoom,openPopup) {
    return new Card(name, src, template,fieldZoom,captionZoom,imageZoom,openPopup).createCard();
}

function closePopup(element) {
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown',handleCloseByEscape);
}

function openPopup (element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown',handleCloseByEscape);
}

function handleCloseByEscape(e) {
  if(e.key==='Escape') closePopup(document.querySelector('.popup_opened'));
}

function handleCloseByLayout(e) {
  if (e.target.classList.contains('popup_opened')) closePopup(e.target);
}

function handleFormEditSubmit (evt) {
  evt.preventDefault();
  closePopup(formEditProfile);
  textProfileName.textContent = inputName.value;
  textProfileAbout.textContent = inputAbout.value;
}

function handleFormAddSubmit (evt) {
  evt.preventDefault();
  validatorAddCard.disableSubmitButton();
  closePopup(formAddCard);
  addCard(createCard(textPlaceName.value,linkPlace.value,templateCard,fieldZoom,captionZoom,imageZoom,openPopup));
  formAdd.reset();
}

buttonOpenEditProfilePopup.addEventListener('click', function () {
  inputName.value= textProfileName.textContent;
  inputAbout.value = textProfileAbout.textContent;
  openPopup(formEditProfile);
});

buttonOpenAddCardPopup.addEventListener('click', function () {
  openPopup(formAddCard);
});

buttonCloseZoomPopup.addEventListener('click', function () {
  closePopup(fieldZoom);
});

buttonCloseEditProfilePopup.addEventListener('click', function () {
  closePopup(formEditProfile);
});

buttonCloseAddCardProfilePopup.addEventListener('click', function () {
  closePopup(formAddCard);
});

formAddCard.addEventListener('submit', handleFormAddSubmit);
formAddCard.addEventListener('click', handleCloseByLayout);
formEditProfile.addEventListener('submit', handleFormEditSubmit);
formEditProfile.addEventListener('click', handleCloseByLayout);
fieldZoom.addEventListener('click', handleCloseByLayout);

const validatorAddCard = new FormValidator(settingsFormValidator,formAddCard);
const validatorEditProfile = new FormValidator(settingsFormValidator,formEditProfile);

validatorAddCard.enableValidation();
validatorEditProfile.enableValidation();

initialCards.forEach((el) => {
  addCard(createCard(el.name,el.src,templateCard,fieldZoom,captionZoom,imageZoom,openPopup));
})