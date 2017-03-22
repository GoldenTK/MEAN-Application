import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html'
})
export class ManageUsersComponent implements OnInit {

  constructor(private authService: AuthService) { }
  users = [];
  usersGroups = [];
  ngOnInit() {
    this.authService.getUsers().subscribe(data => {
      this.users = data;
    });
    this.authService.getUserGroup().subscribe(data => {
      this.usersGroups = data;
    });
  }

  getUsersGroupName(id) {
    for(let userGroup of this.usersGroups) {
      if(userGroup._id == id) {
        return userGroup.name;
      }
    }
  }


}
