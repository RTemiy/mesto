export default class FormValidator {
  constructor(settings,form) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._activeButtonClass = settings.activeButtonClass;
    this._inputErrorClass = settings.inputErrorClass
    this._form = form;
  }
  enableValidation (){
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    const buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  _toggleButtonState(inputList, buttonElement){
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.classList.remove(this._activeButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.add(this._activeButtonClass);
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
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

  _hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

}