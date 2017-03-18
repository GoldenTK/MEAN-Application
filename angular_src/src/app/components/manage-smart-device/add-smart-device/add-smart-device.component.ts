import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SmartComponentsService } from '../../../services/smart-components.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-smart-device',
  templateUrl: './add-smart-device.component.html'
})
export class AddSmartDeviceComponent implements OnInit {

  subscription: any;
  name: string;
  description: string;
  state: boolean;

  constructor(
    private smartComponentsService: SmartComponentsService,
    private flashMessagesService: FlashMessagesService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onSubmitAddSmartDevice() {
    let user_id = JSON.parse(localStorage.getItem('user')).id;

    let newToogleSwitch = {
      user_id: user_id,
      name: this.name,
      description: this.description,
      state: false
    }
    this.subscription = this.smartComponentsService.addToogleSwitch(newToogleSwitch).subscribe(data => {
       if(data.success){
          this.flashMessagesService.show('Toogle Switch added', {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['/dashboard']);
        } else {
          this.flashMessagesService.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        }
    });
  }

}
