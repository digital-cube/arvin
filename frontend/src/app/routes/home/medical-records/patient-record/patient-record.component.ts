import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoggedUserService} from "../../../../services/logged-user.service";
import * as moment from 'moment';
import {timestamp} from "rxjs/operator/timestamp";


@Component({
  selector: 'app-patient-record',
  templateUrl: './patient-record.component.html',
  styleUrls: ['./patient-record.component.scss']
})

export class PatientRecordComponent implements OnInit{



resp = {
  "id": "mock_id_user",
  "main": {
    "weight": 100.0,
    "height": 185.5,
    "systolic_blood_pressure": 120,
    "diastolic_blood_pressure": 80,
    "blood_type": "A+"
  },
  "own_record": [
    {
      "record_id": "234234234_234234",
      "record_time_created": "2017-10-12 15:12:22",
      "record_data": {
        "title": "fuck off",
        "description": "fuck off the beste"
      }
    },
    {
      "record_id": "234234234_234234",
      "record_time_created": "2017-10-21 18:12:22",
      "record_data": {
        "title": "fuck off 2",
        "description": "fuck off the beste 2"
      }
    }
    ],
  "extern_records": [
    {
      "id_doctor": "s0d9fasdfj",
      "name_doctor": "pera zikic",
      "record_time_created":  "2017-08-22 09:15:20",
      "record_data": {
        "title": "fffffff ttt",
        "description": "alo bre, evo neki description"
      }
    },
    {
      "id_doctor": "sdfsd08sdf",
      "name_doctor": "zika peric",
      "record_time_created":  "2017-09-22 19:15:20",
      "record_data": {
        "title": "auuuuu",
        "description": "odje pozega, javi se, tu tu"
      }
    }
    ]
};

showEditNewRecord = false;

  addRecordForm = new FormGroup({
    'title': new FormControl('', [Validators.required]),
    'description': new FormControl('', [Validators.required]),
  });

  ngOnInit(){
    console.log('PATIENT RECORD');
  }

  constructor(
    private loggedUser: LoggedUserService,
  ) {
    this._sortResponse();
  }

  _sortResponse() {

    if (this.resp.own_record) {
      this.resp.own_record.sort((a, b)=>{
        if (a.record_time_created > b.record_time_created) {
          return -1;
        }
        return 1;
      })
    }
    if (this.resp.extern_records) {
      this.resp.extern_records.sort((a,b) => {
        if (a.record_time_created > b.record_time_created) {
          return -1;
        }
        return 1;
      })
    }
  }

  onTabChange($event){
    console.log(event);
  }

  openEditNewRecord(){
    this.showEditNewRecord = true;
  }

  cancel(){
    this.showEditNewRecord = false;
  }

  addNewRecord(){
    this.showEditNewRecord = false;
    console.log('prover', this.addRecordForm);
    this.resp.own_record.unshift(
      {
        "record_id": `new_${+moment()}`, //"new"+moment(),
        "record_time_created": moment().format('YYYY-MM-DD HH:mm:ss'),
        "record_data": {
          "title": this.addRecordForm.get('title').value,
          "description": this.addRecordForm.get('description').value
        }
      }
    );
  }


}
