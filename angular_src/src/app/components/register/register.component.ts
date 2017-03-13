import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  subscription: any;

  constructor(
    private  validateService: ValidateService, 
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegister() {
      const user = {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password
      }

      //Validate requied input fields
      if(!this.validateService.validateRegister(user)){
        this.flashMessagesService.show('Please fill all fields', {cssClass: 'alert-danger', timeout: 3000});
        return false;
      }

      //Validate email
      if(!this.validateService.validateEmail(user.email)){
        this.flashMessagesService.show('Wrong email', {cssClass: 'alert-danger', timeout: 3000});
        return false;
      }

      //Validate password
      if(!(this.validateService.validatePasswordCompare(this.password, this.confirmPassword) 
      && this.validateService.validatePassword(this.password))) {
        this.flashMessagesService.show('Wrong password', {cssClass: 'alert-danger', timeout: 3000});
        return false;
      }

      //Register user
      this.subscription = this.authService.registerUser(user).subscribe(data => {
        if(data.success){
          this.flashMessagesService.show('User registered', {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['/login']);
        } else {
          this.flashMessagesService.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['/register']);
        }
      });
  }
}