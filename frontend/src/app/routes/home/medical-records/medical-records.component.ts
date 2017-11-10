import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-medical-records',
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.scss']
})

export class MedicalRecordsComponent implements OnInit{


  ngOnInit(){
    console.log('MEDICAL RECORDS');
  }

  constructor() {}

}
