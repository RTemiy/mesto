export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _waitResponse(prom){
    if(prom.ok) return prom.json()
    else return Promise.reject('Ошибка: ' + prom.status)
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {headers : this._headers})
      .then(res => this._waitResponse(res))

  }

  getUserInfo(){
    return fetch(this._baseUrl + '/users/me', {headers : this._headers})
      .then(res => this._waitResponse(res))
  }

  sendUserInfo({name, about}){
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      })
    }).then(res => this._waitResponse(res))
  }

  sendUserAvatar({avatar}){
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar : avatar,
      })
    })
  }

  postCard({name,link}){
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      })
    }).then(res => this._waitResponse(res))
  }

  deleteCard(id){
    return fetch(this._baseUrl + '/cards/' + id, {
      method: 'DELETE',
      headers: this._headers,
    }).then(res => this._waitResponse(res))
      .catch(err=>{
        console.log(err)
      })
  }

  deleteCardLike(id){
    return fetch(this._baseUrl + '/cards/' + id + '/likes', {
      method: 'DELETE',
      headers: this._headers,
    }).then(res => this._waitResponse(res))
  }

  addCardLike(id){
    return fetch(this._baseUrl + '/cards/' + id + '/likes', {
      method: 'PUT',
      headers: this._headers,
    }).then(res => this._waitResponse(res))
  }

}