import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {LoggedUserService} from "../../../services/logged-user.service";
import {ApiCallsService} from "../../../services/api-calls.service";
import {MediatorService} from "../../../services/mediator";
// import {FormControl, FormGroup, Validators} from '@angular/forms';
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

export class RequestDialogComponent {

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
               private loggedUser: LoggedUserService,
               private api_service: ApiCallsService,
               private ms: MediatorService
  ) {}

  cancel() {
    this.dialogRef.close();
  }

  answare(res) {
    console.log('RES', res);
    const _url = '/api/access-request-answer';
    const _data = {
      answer: res,
      id_doctor: this.ms.id_doctor
    };
    this.api_service.svcPut(_url, _data, this.loggedUser.getToken()).subscribe(
      r => {
        console.log('Response', r);
        this.dialogRef.close();
      },
      r => {
        console.log('ERROR', r);
        this.dialogRef.close();
      }
    );

  }

}
