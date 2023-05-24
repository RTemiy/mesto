export default class FormValidator {
  constructor(settings,form) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._activeButtonClass = settings.activeButtonClass;
    this._inputErrorClass = settings.inputErrorClass
    this._form = document.querySelector(form);
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
  }
  enableValidation (){
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState();
      });
    });
  }

  _toggleButtonState(){
    if (this._hasInvalidInput(this._inputList)) {
      this.disableSubmitButton();
    } else {
      this._buttonElement.classList.add(this._activeButtonClass);
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _checkInputValidity(inputElement){
    if (!inputElement.validity.valid) {
      this.
      _showInputError(inputElement, inputElement.validationMessage);
    }
    else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, message){
    this._form.querySelector(`#${inputElement.id}-error`).textContent = message;
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideInputError(inputElement){
    this._form.querySelector(`#${inputElement.id}-error`).textContent = '';
    inputElement.classList.remove(this._inputErrorClass);
  }

  _hasInvalidInput(){
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  disableSubmitButton(){
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.classList.remove(this._activeButtonClass);
    this._buttonElement.disabled = true;
  }

}