import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
// import {ChosenUserService} from '../../../../utils/chosen-user.service';
// import {TranslationService} from '../../../../utils/translate.service';
// import {RequestsService} from '../../../../utils/requests.service';
// import {LoggedUserService} from '../../../../utils/logged-user.service';
// import {AppValidators} from '../../../../utils/app-validators';
// import {ToastService} from "../../../../services/app-toast.service";


@Component ({
  selector: 'app-request-dialog',
  templateUrl: 'request-dialog.component.html',
  styleUrls: ['request-dialog.component.scss'],
})

export class RequestDialogComponent implements OnInit {

  // showPassword = false;
  //
  // validators_array = [
  //     ['upperCaseError', 'min1capital'],
  //     ['smallCaseError', 'min1small'],
  //     ['min4NumCaseError', 'min4numbers'],
  //     ['specialCharCaseError', 'min1specChar'],
  //     ['min10CharCaseError', 'min10chars']
  // ];
  //
  // changePasswordForm = new FormGroup({
  //   'old_password' : new FormControl(null, [ Validators.required]),
  //   'new_password' : new FormControl(null,
  //     [ Validators.required
  //     ]),
  // });

  constructor(
               public dialogRef: MatDialogRef<RequestDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

}
