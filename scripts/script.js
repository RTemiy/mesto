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

const fieldCards = document.querySelector('.cards');
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

function createCard(name,src){
  const Card = templateCard.cloneNode(true);
  const imageCard = Card.querySelector('.card__image');
  Card.querySelector('.card__title').textContent = name;
  imageCard.style = `background-image: url('${src}');`;
  imageCard.title = name;

  Card.querySelector('.card__image').addEventListener('click', function(){
    openPopup(fieldZoom);
    captionZoom.textContent = name;
    imageZoom.src = src;
    imageZoom.alt = name;
    document.addEventListener('keydown',handleCloseByEscape);
  });

  Card.querySelector('.card__delete').addEventListener('click',function () {
    this.closest('.card').remove();
  });

  Card.querySelector('.card__like').addEventListener('click',function () {
    this.classList.toggle('card__like_active');
  });

  return Card;
}

function addCard(card){
  fieldCards.prepend(card);
}

function closePopup(element) {
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown',handleCloseByEscape);
}

function openPopup (element) {
  element.classList.add('popup_opened');
}

function handleCloseByEscape(e) {
  if(e.key==='Escape') closePopup(document.querySelector('.popup_opened'));
}


function handleCloseByLayout(e) {
  if (e.target.classList.contains('popup_opened')) closePopup(this);
}

function handleFormEditSubmit (evt) {
  evt.preventDefault();
  closePopup(formEditProfile);
  textProfileName.textContent = inputName.value;
  textProfileAbout.textContent = inputAbout.value;
}

function handleFormAddSubmit (evt) {
  evt.preventDefault();
  closePopup(formAddCard);
  addCard(createCard(textPlaceName.value,linkPlace.value));
}

buttonOpenEditProfilePopup.addEventListener('click', function () {
  inputName.value= textProfileName.textContent;
  inputAbout.value = textProfileAbout.textContent;
  document.addEventListener('keydown',handleCloseByEscape);
  openPopup(formEditProfile);
});

buttonOpenAddCardPopup.addEventListener('click', function () {
  formAdd.reset();
  openPopup(formAddCard);
  document.addEventListener('keydown',handleCloseByEscape);
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

initialCards.forEach((el) => {
  addCard(createCard(el.name,el.src));
})