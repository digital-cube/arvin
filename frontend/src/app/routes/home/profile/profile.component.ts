import {Component, OnInit} from '@angular/core';
import {LoggedUserService} from "../../../services/logged-user.service";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {CropperComponent} from "../../dialogs/image-cropper/cropper.component";
import {ChangePasswordDialogComponent} from "../../dialogs/change-password-dialog/change-password-dialog.component";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit{
  ngOnInit(){
    console.log('PROFILE');
  }

  constructor(private loggedUser: LoggedUserService,public dialog: MatDialog) {}

  changePassword() {
    this.dialog.open(ChangePasswordDialogComponent, <MatDialogConfig>{
      data: {
        // username: this.clients._users[userIndex].username,
        // id_user: this.clients._users[userIndex].id,
        // index: userIndex
      },
    });
  }
  openCropper(){
    this.dialog.open(CropperComponent, <MatDialogConfig>{
    });
  }

}
