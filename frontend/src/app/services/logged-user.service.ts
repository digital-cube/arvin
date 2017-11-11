import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import {environment} from '../../environments/environment';

@Injectable()
export class LoggedUserService {

  token: string;

  id: string;
  username: string;
  firstName: string;
  lastName: string;
  role: number;
  picture: string;
  hasPin = false;
  ssn: string;
  admin_pin: string;

  constructor(private http: Http) {
    this.token = localStorage.getItem('token');
  }

  getToken() {
    if (this.token) {
      return this.token;
    }

    this.token = localStorage.getItem('token');
    return this.token;
  }

  logout() {
    this.removeToken();
  }

  removeToken() {
    //noinspection JSAnnotator
    delete this.token;
    localStorage.removeItem('token');
  }

  login(response) {
    if (response.token){
      this.setToken(response.token);
    }
    this.id = response.id;
    this.username = response.username;
    this.firstName = response.first_name;
    this.lastName = response.last_name;
    this.role = response.role;
    this.picture = response.picture;
    this.hasPin = response.has_pin;
    this.ssn = response.ssn;
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  checkUser() {
    const _header = new RequestOptions( {headers: new Headers({Authorization: this.token})} );
    return this.http.get(environment.api_url + '/user/login', _header);
  }

}
