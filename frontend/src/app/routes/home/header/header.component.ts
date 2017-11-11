import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {environment} from '../../../../environments/environment';
import {MediatorService} from "../../../services/mediator";
import {ApiCallsService} from "../../../services/api-calls.service";
import {LoggedUserService} from "../../../services/logged-user.service";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {RequestDialogComponent} from "../../dialogs/request-dialog/request-dialog.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  // lang_icon = `${environment.images_url}${this.tr_svc.lang.toLowerCase()}-${this.tr_svc.lang.toLocaleUpperCase()}.svg`;
  // environment = environment;

  constructor(
    private apiSvc: ApiCallsService,
    public loggedUser: LoggedUserService,
    private router: Router,
    public ms: MediatorService,
    public dialog: MatDialog) {
    console.log('HEADER', loggedUser);
  }

  // logoutUser() {
  //   this.requests.logoutUser().subscribe(res => {
  //     this.loggedUser.logout(res);
  //     this.router.navigate(['login']);
  //     console.log('Logged out')
  //   },
  //     res => {
  //       this.router.navigate(['login']);
  //       console.log('Error logged out', res);
  //     }
  //     )
  // }
  //
  // change_language(lang) {
  //   this.tr_svc.setLang(lang);
  //   this.setIcon();
  // }

  // setIcon() {
  //   this.lang_icon = `${this.environment.images_url}${this.tr_svc.lang.toLowerCase()}-${this.tr_svc.lang.toLocaleUpperCase()}.svg`;
  // }
  // openCropper(){
  //   this.dialog.open(CropperComponent, <MatDialogConfig>{
  //   });
  // }
  logout() {
    this.apiSvc.svcPost('/user/logout', {}, this.loggedUser.getToken()).subscribe(
      r => {
        this.loggedUser.logout();
        this.router.navigate(['/login']);
      },
      err => {
        console.log('Error logout user', err);
      }
    );
  }
  openRequest(){
    this.dialog.open(RequestDialogComponent, <MatDialogConfig>{
    });
  }
}
