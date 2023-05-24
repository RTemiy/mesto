export default class UserInfo {
  constructor(elName, elAbout) {
    this._name = document.querySelector(elName);
    this._about = document.querySelector(elAbout);
  }

  getUserInfo(){
    return {name:this._name.textContent, about: this._about.textContent}
  }

  setUserInfo({name,about}){
    this._name.textContent = name;
    this._about.textContent = about;
  }
}