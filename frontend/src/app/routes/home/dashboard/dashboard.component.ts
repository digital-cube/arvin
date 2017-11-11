import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiCallsService} from '../../../services/api-calls.service';
import {LoggedUserService} from '../../../services/logged-user.service';
import {MediatorService} from "../../../services/mediator";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private apiSvc: ApiCallsService, private loggedUser: LoggedUserService, private router: Router, public ms: MediatorService) { }

  ngOnInit() {
    console.log('DASHOARD');
  }

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

}
