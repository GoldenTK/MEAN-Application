import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {tokenNotExpired} from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', {headers: headers})
      .map(res => res.json());
  }
  
  getUsers() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users', {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user) {
     localStorage.setItem('id_token',token);
     localStorage.setItem('user', JSON.stringify(user));

     this.authToken = token;
     this.user = user;
  }

  loggedIn() {
    return tokenNotExpired();
  }

  checkAdmin() {
    if(localStorage.getItem('user')) {
      let check = JSON.parse(localStorage.getItem('user')).userGroup;
      if (check == "58cd622aa45721323b7e796e"){
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  loadToken() {
    this.authToken = localStorage.getItem('id_token');
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  changeUserPassword(id, newPassword){
    let data = {
      id: id,
      password: newPassword
    }
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/changeUserPassword', data, {headers: headers})
      .map(res => res.json());
  }

  getUserGroup() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/usersGroups', {headers: headers})
        .map(res => res.json());
  }

}
