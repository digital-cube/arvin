


import {Component} from '@angular/core';
import {MediatorService} from "../../services/mediator";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent {
  constructor(public ms: MediatorService) {}

  closeSideMenu(){
    this.ms.closeOverlay = false;
    this.ms.openDropdownMenu = false;
    this.ms.submenuOpen = false;
    this.ms.appmenuOpen = false;
  }

}
