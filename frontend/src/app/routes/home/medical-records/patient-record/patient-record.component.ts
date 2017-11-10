import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-patient-record',
  templateUrl: './patient-record.component.html',
  styleUrls: ['./patient-record.component.scss']
})

export class PatientRecordComponent implements OnInit{
  ngOnInit(){
    console.log('PATIENT RECORD');
  }

  constructor() {}

}
