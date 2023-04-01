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

function addCard(name,src){
  const Card = cardTemplate.cloneNode(true);
  Card.querySelector('.card__title').textContent = name;
  Card.querySelector('.card__image').style = `background-image: url('${src}');`;

  Card.querySelector('.card__image').addEventListener('click', function(){
    zoomField.classList.add('zoom_opened');
    zoomCaption.textContent = name;
    zoomImage.src = src;
  });

  Card.querySelector('.card__delete').addEventListener('click',function () {
    this.closest('.card').remove();
  });

  Card.querySelector('.card__like').addEventListener('click',function () {
    this.classList.toggle('card__like_active');
  });

  zoomClose.addEventListener('click', function () {
    zoomField.classList.remove('zoom_opened');
  });

  cardsField.prepend(Card);
  return Card;
}

const cardsField = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;
const formEdit = document.querySelector('#form_edit');
const formAdd = document.querySelector('#form_add');
const nameText= document.querySelector('.profile__name');
const aboutText= document.querySelector('.profile__about');
const placeName= document.querySelector('#form_place-name');
const placeLink= document.querySelector('#form_place-link');
const editButton= document.querySelector('.profile__edit');
const addButton= document.querySelector('.profile__add');
const popupElement = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__cross');
const zoomField = document.querySelector('.zoom');
const zoomImage = zoomField.querySelector('.zoom__image');
const zoomCaption = zoomField.querySelector('.zoom__caption');
const zoomClose = zoomField.querySelector('.zoom__close');
const nameInput = document.querySelector('#form_name');
const aboutInput = document.querySelector('#form_about');

function showPopup (type) {
  popupElement.classList.add('popup_opened');
  switch (type) {
    case 'edit':
      popupElement.querySelector('#form_add').classList.remove('popup__form_active');
      popupElement.querySelector('#form_edit').classList.add('popup__form_active');
      nameInput.value = nameText.textContent;
      aboutInput.value = aboutText.textContent;
      break;

    case 'add':
      popupElement.querySelector('#form_add').classList.add('popup__form_active');
      popupElement.querySelector('#form_edit').classList.remove('popup__form_active');
      placeName.value = '';
      placeLink.value = '';
      break;
  }
}

editButton.addEventListener('click', function (){showPopup('edit')});
addButton.addEventListener('click', function (){showPopup('add')});

function closePopup () {
  popupElement.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopup);

function handleFormEditSubmit (evt) {
    evt.preventDefault();
    closePopup();
    nameText.textContent = nameInput.value;
    aboutText.textContent = aboutInput.value;
}

function handleFormAddSubmit (evt) {
  evt.preventDefault();
  closePopup();
  addCard(placeName.value,placeLink.value);
}

formAdd.addEventListener('submit', handleFormAddSubmit);
formEdit.addEventListener('submit', handleFormEditSubmit);


Cards.forEach((el) => {
  el.element = addCard(el.name,el.src);
})