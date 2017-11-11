
import {Component, OnInit} from '@angular/core';
import {MediatorService} from '../../../services/mediator';

import {environment} from '../../../../environments/environment';
import {Router} from "@angular/router";
import {animate, style, transition, trigger} from "@angular/animations";
import {LookupService} from "../../../services/lookup.service";
import {LoggedUserService} from "../../../services/logged-user.service";

interface Client_Menu {
  profile?: string;
  sites?: string;
  invoices: string;
  users?: string;
  services?: string;
  call_logs: string;
  voice_service?: string;
  data_service?: string;
  misc?: string;
  tickets?: string;
}

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  environment = environment;

  particularlyLooged = false;

  constructor(
    public ms: MediatorService,
    private lookup: LookupService,
    public router: Router,
    private loggedUser: LoggedUserService) {

  }

  ngOnInit() {
    if(this.lookup.roles.USER == this.loggedUser.role){
      this.particularlyLooged = true;
    }
  }

  closeSidemenu(event) {


    if (this.ms.closeOverlay || !this.ms.menuToggle) {
      this.ms.closeOverlay = false;
      this.ms.menuToggle = false;
      this.ms.openDropdownMenu = false;
      this.ms.submenuOpen = false;
      this.ms.appmenuOpen = false;
    }

  }

}
