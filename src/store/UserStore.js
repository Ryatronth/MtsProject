import { makeAutoObservable } from 'mobx';
import { refresh } from '../http/userAPI';

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    this._token = '';
    this._timer = -1;
    this._intervalId = null;
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }

  setTimer(time) {
    this._timer = time;
    if (time !== -1) {
      this.startTimer();
    } else {
      clearInterval(this._intervalId);
    }
  }

  setUser(user) {
    this._user = user;
  }

  setToken(token) {
    this._token = token;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }

  get token() {
    return this._token;
  }

  startTimer() {
    if (this._intervalId !== null) {
      clearInterval(this._intervalId);
    }

    this._intervalId = setInterval(async () => {
      if (this._timer > 30) {
        this._timer -= 10;
      } else {
        console.log('reload');
        console.log(localStorage.getItem('token'));
        clearInterval(this._intervalId);
        await refresh()
          .then(({ data }) => {
            this.setTimer(data.exp - Math.floor(Date.now() / 1000));
          })
          .catch((e) => {
            alert(e.response.data.message);
          });
        console.log(localStorage.getItem('token'));
      }
    }, 10000);
  }
}
