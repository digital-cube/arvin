


import {Component} from '@angular/core';
import {MediatorService} from "../../services/mediator";
import {AppWsService} from "../../services/ws.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent {
  constructor(public ms: MediatorService, private ws: AppWsService) {}

  closeSideMenu(){
    this.ms.closeOverlay = false;
    this.ms.openDropdownMenu = false;
    this.ms.submenuOpen = false;
    this.ms.appmenuOpen = false;
  }

}
