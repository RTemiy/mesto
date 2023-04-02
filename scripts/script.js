const Cards = [
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
const formEdit = document.querySelector('#popup_edit-profile');
const formAdd = document.querySelector('#popup_add-place');
const textProfileName= document.querySelector('.profile__name');
const textProfileAbout= document.querySelector('.profile__about');
const textPlaceName= document.querySelector('#form_place-name');
const linkPlace= document.querySelector('#form_place-link');
const buttonEdit= document.querySelector('.profile__edit');
const buttonAdd= document.querySelector('.profile__add');
const elementsPopupAll = Array.from(document.querySelectorAll('.popup'));
const buttonsPopupClose = Array.from(document.querySelectorAll('.popup__cross'));
const fieldZoom = document.querySelector('#popup_zoom-image');
const imageZoom = fieldZoom.querySelector('.popup__image');
const captionZoom = fieldZoom.querySelector('.popup__caption');
const inputName = document.querySelector('#form_name');
const inputAbout = document.querySelector('#form_about');

function createCard(name,src){
  const Card = templateCard.cloneNode(true);
  Card.querySelector('.card__title').textContent = name;
  Card.querySelector('.card__image').style = `background-image: url('${src}');`;
  Card.querySelector('.card__image').title = name;

  Card.querySelector('.card__image').addEventListener('click', function(){
    openPopup(fieldZoom);
    captionZoom.textContent = name;
    imageZoom.src = src;
    imageZoom.alt = name;
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

function closePopups() {
  elementsPopupAll.forEach(el => {el.classList.remove('popup_opened');})
}

function openPopup (element) {
  closePopups();
  element.classList.add('popup_opened');
}

function handleFormEditSubmit (evt) {
  evt.preventDefault();
  closePopups()
  textProfileName.textContent = inputName.value;
  textProfileAbout.textContent = inputAbout.value;
}

function handleFormAddSubmit (evt) {
  evt.preventDefault();
  closePopups()
  addCard(createCard(textPlaceName.value,linkPlace.value));
}

buttonEdit.addEventListener('click', function (){
  inputName.value= textProfileName.textContent;
  inputAbout.value = textProfileAbout.textContent;
  openPopup(formEdit);
});

buttonAdd.addEventListener('click', function (){
  document.querySelector('#form_add').reset();
  openPopup(formAdd);
});

buttonsPopupClose.forEach(el => {
  el.addEventListener('click', () => {closePopups()});
});

formAdd.addEventListener('submit', handleFormAddSubmit);
formEdit.addEventListener('submit', handleFormEditSubmit);

Cards.forEach((el) => {
  addCard(createCard(el.name,el.src));
})