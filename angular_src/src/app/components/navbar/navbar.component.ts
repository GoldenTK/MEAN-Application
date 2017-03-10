import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html' 
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService, 
    private router: Router
  ) {}

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
    this.flashMessagesService.show('You are logged out', {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['login']);
    return false;
  }
}
