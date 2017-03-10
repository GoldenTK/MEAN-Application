import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService, 
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLogin() {
    const user = {
      username: this.username,
      password: this.password
    }
    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.flashMessagesService.show('You are logged in', {cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['dashboard']);
      } else {
        this.flashMessagesService.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate(['login']);
      }
    });
  }

}
