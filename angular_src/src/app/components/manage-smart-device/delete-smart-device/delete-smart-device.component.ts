import { Component, OnInit } from '@angular/core';

import { SmartComponentsService } from '../../../services/smart-components.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-delete-smart-device',
  templateUrl: './delete-smart-device.component.html',
  styleUrls: ['./delete-smart-device.component.css']
})
export class DeleteSmartDeviceComponent implements OnInit {

  toogleSwitches =[];
  subscription: any;
  constructor(
    private smartComponentsService: SmartComponentsService,
    private flashMessagesService: FlashMessagesService
    ) {}

  ngOnInit() {
    this.getToogleSwitches();
  }

  getToogleSwitches() {
    this.subscription = this.smartComponentsService.getToogleSwitches().subscribe((data) => {
      this.toogleSwitches = data;
    });
  }

  onDelete(toogleSwitch) {
    this.smartComponentsService.deleteToogleSwitch(toogleSwitch).subscribe((data) => {
      if (!data.success) {
        this.flashMessagesService.show('Toogle Switch not deleted', {cssClass: 'alert-danger', timeout: 3000});
      } else {
        this.flashMessagesService.show('Toogle Switch deleted', {cssClass: 'alert-success', timeout: 3000});
        this.getToogleSwitches();
      }
    });
  }

}
