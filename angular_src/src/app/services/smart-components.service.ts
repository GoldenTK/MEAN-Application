import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SmartComponentsService {
  
  toogleSwitch: any;

  constructor(private http: Http) { }
  
  //ToogleSwitches
  
  addToogleSwitch(toogleSwitch){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/smartDevices/toogleSwitches/add', toogleSwitch, {headers: headers})
      .map(res => res.json());
  }
  
  changeStateToogleSwitch(id, newState){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/smartDevices/toogleSwitches/changeState', {id: id, state: newState}, {headers: headers})
      .map(res => res.json());
  }

  getToogleSwitches() {
    return this.http.get('http://localhost:3000/smartDevices/toogleSwitches/').map(res => res.json());
  }
  deleteToogleSwitch(toogleSwitch) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/smartDevices/toogleSwitches/delete', toogleSwitch, {headers: headers})
      .map(res => res.json());
  }
}
