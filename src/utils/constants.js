import Api from "../components/Api";

export const settingsFormValidator = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  activeButtonClass: 'popup__button-submit_activated',
  inputErrorClass: 'popup__input_type_error',
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: 'b60faf18-093f-4cca-bf55-4f4ebd3dcaef',
    'Content-Type': 'application/json'
  }
});