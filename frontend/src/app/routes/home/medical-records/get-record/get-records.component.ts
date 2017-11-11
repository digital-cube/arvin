import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiCallsService} from "../../../../services/api-calls.service";
import {LoggedUserService} from "../../../../services/logged-user.service";


@Component({
  selector: 'app-medical-records',
  templateUrl: './get-records.component.html',
  styleUrls: ['./get-records.component.scss']
})

export class GetRecordComponent implements OnInit{

  searchRecordsForm = new FormGroup({
    'ssd': new FormControl('', [Validators.required]),
  });

  setPinForm = new FormGroup({
    'pin': new FormControl('', [Validators.required]),
  });


  ngOnInit(){
    console.log('MEDICAL RECORDS');
  }

  constructor(
    private api_service: ApiCallsService,
    public loggedUser: LoggedUserService,
  ) {}

  getRecord(){
    console.log('FORM', this.searchRecordsForm);
    // this.api_service.svcPost('????', this.searchRecordsForm.value, this.loggedUser.getToken()).subscribe(
    //   r => {
    //     console.log('Response', r);
    //   },
    //   r => {
    //     console.log('ERROR', r);
    //   }
    // );

  }

  setPin(){
    console.log('FORM', this.setPinForm);
  }

}
