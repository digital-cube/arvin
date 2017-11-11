import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {LoggedUserService} from "../../../../services/logged-user.service";


@Component({
  selector: 'app-patient-record',
  templateUrl: './patient-record.component.html',
  styleUrls: ['./patient-record.component.scss']
})

export class PatientRecordComponent implements OnInit{

  ngOnInit(){
    console.log('PATIENT RECORD');
  }

  constructor(
    private loggedUser: LoggedUserService,
  ) {}

}
