
import {Component, OnInit} from '@angular/core';
import {MediatorService} from '../../../services/mediator';

import {environment} from '../../../../environments/environment';
import {Router} from "@angular/router";
import {animate, style, transition, trigger} from "@angular/animations";

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
  // animations: [
  //   trigger(
  //     'enterFromLeft',
  //     [
  //       transition(
  //         ':enter', [
  //           style({ width: 0}),
  //           animate('500ms', style({'width': 100}))
  //         ]
  //       ),
  //       transition(
  //         ':leave', [
  //           style({'width': 100}),
  //           animate('500ms', style({'width': 0}))
  //
  //         ]
  //       )]
  //   )
  // ],
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  // lang_icon = `${environment.images_url}${this.tr_svc.lang.toLowerCase()}-${this.tr_svc.lang.toLocaleUpperCase()}.svg`;
  show_down_menu = false;
  environment = environment;
  // showAvatar = false;

  // ENABLE MENU OPTIONS IF NEEDED
  client_sidemenu: Client_Menu = {
    // profile: '/profile',
    // sites: '/sites',
    invoices: '/invoices',
    // users: '/users',
    // services: '/services',
    call_logs: '/call-logs',
    // voice_service: '/voice-service',
    // data_service: '/technical-data',
    // misc: '/misc'
    // tickets:'/tickets'
  };

  constructor(
    public ms: MediatorService,
    public router: Router) {

    // if (this.logged_user.is_client)
    //   this.show_down_menu = true;
    // console.log('SHOW DOWN MENU', this.show_down_menu);
  }

  ngOnInit() {
    // if (this.logged_user.is_super_admin) {
    //   this.chosen_user.user_chosen.subscribe(r => {
    //     // console.log('SELECTOVAN JE USER');
    //     if (!this.chosen_user.chosen) {
    //       this.show_down_menu = false;
    //     } else {
    //       this.show_down_menu = true;
    //       this.client_sidemenu = {
    //         profile: `/${this.chosen_user.id}/profile`,
    //         sites: `/${this.chosen_user.id}/sites`,
    //         invoices: `/${this.chosen_user.id}/invoices`,
    //         users: `/${this.chosen_user.id}/users`,
    //         services: `/${this.chosen_user.id}/services`,
    //         call_logs: `/${this.chosen_user.id}/call-logs`,
    //         voice_service: `/${this.chosen_user.id}/voice-service`,
    //         data_service: `/${this.chosen_user.id}/technical-data`,
    //         misc: `/${this.chosen_user.id}/misc`,
    //         tickets: `/${this.chosen_user.id}/tickets`,
    //
    //       };
    //     }
    //     // console.log('SAD JE MENI', this.client_sidemenu);
    //   })
    // }
  }

  closeSidemenu(event) {

    // if (event.srcElement.childNodes[0].data === 'Services'
    //   || event.srcElement.childNodes[0].parentElement.childNodes[0].data === 'keyboard_arrow_down'
    //   || event.srcElement.childNodes[0].parentElement.childNodes[0].data === 'keyboard_arrow_up'
    //   || event.srcElement.id === 'service-list-icon'
    //   || event.path[3].id === 'services-button') {
    //   return;
    // }


    if (this.ms.closeOverlay || !this.ms.menuToggle) {
      this.ms.closeOverlay = false;
      this.ms.menuToggle = false;
      this.ms.openDropdownMenu = false;
      this.ms.submenuOpen = false;
      this.ms.appmenuOpen = false;
    }

    // if (this.service.closeOverlay === false && this.service.menuToggle === true) {
    //
    // }
    // else {
    //   this.service.closeOverlay = false;
    //   this.service.menuToggle = false;
    // }
  }
  // logoutUser() {
  //   this.requests.logoutUser().subscribe(res => {
  //       this.loggedUser.logout(res);
  //       this.router.navigate(['login']);
  //       console.log('Logged out')
  //     },
  //     res => {
  //       this.router.navigate(['login']);
  //       console.log('Error logged out', res);
  //     }
  //   )
  // }


}
