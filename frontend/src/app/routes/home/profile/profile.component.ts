import {Component, OnInit} from '@angular/core';
import {LoggedUserService} from "../../../services/logged-user.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit{
  ngOnInit(){
    console.log('PROFILE');
  }

  constructor(private loggedUser: LoggedUserService) {}

}
