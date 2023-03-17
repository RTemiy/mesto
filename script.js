
let nameText= document.querySelector('.profile__name');

let aboutText= document.querySelector('.profile__about');

let editButton= document.querySelector('.profile__edit');

let addButton= document.querySelector('.profile__add');

let popupElement = document.querySelector('.popup');

let closeButton = document.querySelector('.popup__cross');

let formElement = document.querySelector('.popup__form');

let nameInput = document.querySelector('.popup__input-name');

let aboutInput = document.querySelector('.popup__input-about');

function showEditPopup () {
  popupElement.classList.add('popup_active');
  nameInput.value = nameText.textContent;
  aboutInput.value = aboutText.textContent;
}

editButton.addEventListener('click', showEditPopup);

function closePopup () {
  popupElement.classList.remove('popup_active');
}

closeButton.addEventListener('click', closePopup);

editButton.addEventListener('click', showEditPopup);

  function handleFormSubmit (evt) {
    evt.preventDefault();
    closePopup();
    nameText.textContent = nameInput.value;
    aboutText.textContent = aboutInput.value;
  }

formElement.addEventListener('submit', handleFormSubmit);