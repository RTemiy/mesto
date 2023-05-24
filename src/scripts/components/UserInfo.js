export default class UserInfo {
  constructor(elName, elAbout) {
    this._name = elName;
    this._about = elAbout;
  }

  getUserInfo(){
    return {name:this._name.textContent, about: this._about.textContent}
  }

  setUserInfo({name,about}){
    this._name.textContent = name;
    this._about.textContent = about;
  }
}