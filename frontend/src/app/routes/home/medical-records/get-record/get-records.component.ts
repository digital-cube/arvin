import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiCallsService} from "../../../../services/api-calls.service";
import {LoggedUserService} from "../../../../services/logged-user.service";
import {MediatorService} from "../../../../services/mediator";


@Component({
  selector: 'app-medical-records',
  templateUrl: './get-records.component.html',
  styleUrls: ['./get-records.component.scss']
})

export class GetRecordComponent implements OnInit{

  searchRecordsForm = new FormGroup({
    'ssn': new FormControl('', [Validators.required]),
  });

  setPinForm = new FormGroup({
    'pin': new FormControl('', [Validators.required]),
  });


  ngOnInit() {
    console.log('MEDICAL RECORDS');
  }

  constructor(
    private api_service: ApiCallsService,
    public loggedUser: LoggedUserService,
    private ms: MediatorService
  ) {}

  getRecord() {
    console.log('FORM', this.searchRecordsForm);
    this.api_service.svcGet(`/api/records-access`, {'ssn': this.searchRecordsForm.get('ssn').value}, this.loggedUser.getToken()).subscribe(
      r => {
        console.log('Response', r);
        this.ms.showLoader = true;
      },
      r => {
        console.log('ERROR', r);
      }
    );

  }

  setPin(){
    console.log('FORM', this.setPinForm);
    this.api_service.svcPost('/api/save-pin', this.setPinForm.value, this.loggedUser.getToken()).subscribe(
      r => {
        console.log('Response', r);
        this.loggedUser.admin_pin = this.setPinForm.get('pin').value;
        this.loggedUser.hasPin = true;
      },
      r => {
        console.log('ERROR', r);
      }
    );

  }

}
