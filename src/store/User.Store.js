import { makeAutoObservable } from 'mobx';
import { refresh } from '../http/userAPI';

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    this._timer = -1;
    this._intervalId = null;
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }

  setTimer(time) {
    this._timer = time;
    this.startTimer();
  }

  setUser(user) {
    this._user = user;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }

  startTimer() {
    if (this._intervalId !== null) {
      clearInterval(this._intervalId);
    }

    this._intervalId = setInterval(() => {
      if (this._timer > 30) {
        this._timer -= 1;
      } else {
        console.log('reload');
        clearInterval(this._intervalId);
        refresh()
          .then((data) => {
            this.setTimer(data.exp - Math.floor(Date.now() / 1000));
          })
          .catch((e) => {
            alert(e.response.data.message);
          });
      }
    }, 1000);
  }
}
