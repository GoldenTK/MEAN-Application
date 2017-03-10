import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  subscription: any;
  user: any;
  password: string;
  newPassword: string;
  confirmNewPassword: string;

  constructor(
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscription = this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
    err => {
      console.log(err);
      return false;
    });
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onChange() {
    if(this.password !== undefined) {
      const user = {
        username: this.user.username,
        password: this.password
      }
        this.authService.authenticateUser(user).subscribe(data => {
          if(!data.success) {
            this.flashMessagesService.show('Old password is wrong', {cssClass: 'alert-danger', timeout: 10000});
          }
        });
    } else {
      this.flashMessagesService.show('Please type old password', {cssClass: 'alert-danger', timeout: 5000});
    }

    if(this.newPassword !== undefined && this.confirmNewPassword !== undefined) {

      if(this.newPassword == this.confirmNewPassword) {

        // Send request with new password
        this.authService.changeUserPassword(this.user._id, this.newPassword).subscribe(data => {

          if(data.success){
            this.flashMessagesService.show(data.msg, {cssClass: 'alert-success', timeout: 3000});
            this.authService.logout();
            this.router.navigate(['login']);

        } else {
          this.flashMessagesService.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
          }

      });
      
      } else {
        this.flashMessagesService.show('Password does not match the confirm password', {cssClass: 'alert-danger', timeout: 5000});
        }

    } else {
      this.flashMessagesService.show('Please type new password', {cssClass: 'alert-danger', timeout: 5000});
      }
  }

}
