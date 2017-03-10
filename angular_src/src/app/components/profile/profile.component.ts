import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: Object;
  subscription: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.subscription = this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
