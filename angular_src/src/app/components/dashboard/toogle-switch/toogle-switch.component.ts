import { Component, OnInit, OnDestroy } from '@angular/core';

import { SmartComponentsService } from '../../../services/smart-components.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-toogle-switch',
  templateUrl: './toogle-switch.component.html'
})
export class ToogleSwitchComponent implements OnInit, OnDestroy {

  name: string;
  value: boolean;
  toogleSwitches = [];
  subscription: any;

  constructor(
    private smartComponentsService: SmartComponentsService,
    private flashMessagesService: FlashMessagesService
    ) {}

  ngOnInit() {
    this.getToogleSwitches();
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getToogleSwitches() {
    this.subscription = this.smartComponentsService.getToogleSwitches().subscribe((data) => {
      this.toogleSwitches = data;
    });
  }

  onStateChange(id, state) {
    this.smartComponentsService.changeStateToogleSwitch(id, !state).subscribe((data) => {
      if (!data.success) {
        this.flashMessagesService.show('State not changed', {cssClass: 'alert-danger', timeout: 3000});
      } else {
      this.getToogleSwitches();
      }
    });
  }
  

}
