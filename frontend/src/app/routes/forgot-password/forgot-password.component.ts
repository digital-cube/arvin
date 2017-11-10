import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {ApiCallsService} from '../../services/api-calls.service';
import {MatSnackBar} from "@angular/material";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  animations: [
    trigger(
      'errorAnimate',
      [
        transition(
          ':enter', [
            style({ opacity: 0}),
            animate('500ms', style({'opacity': 1}))
          ]
        ),
        transition(
          ':leave', [
            style({'opacity': 1}),
            animate('500ms', style({'opacity': 0}))

          ]
        )]
    )
  ],
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm = new FormGroup({
    'username': new FormControl('', [Validators.required, Validators.email])
  });
  apiError: string;
  _error_timeout: any;
  _error_show_timeout = 3000;  // milliseconds
  constructor(private apiSvc: ApiCallsService, private router: Router, private sb: MatSnackBar) { }

  ngOnInit() {
  }

  forgot() {
    console.log('FORGOT', this.forgotForm.value);
    delete this.apiError;
    this.apiSvc.svcPut('/user/forgot', this.forgotForm.value).subscribe(
      r => {
        const sbRef = this.sb.open('Check mail! We sent you the link for reset password', null,
          {duration: 2000});
        sbRef.afterDismissed().subscribe( () => {
            this.router.navigate(['/login']);
        });
      },
      err => {
        console.log('Error save forgot password', err);
        this.apiError = 'Error save request';
      }
    );
    if (this._error_timeout) {
      clearTimeout(this._error_timeout);
    }

    // this.apiError = _err;
    this._error_timeout = setTimeout(() => {
      this.reset_error();
    }, this._error_show_timeout)
  }

  reset_error() {
    //noinspection JSAnnotator
    delete this.apiError;
    this._error_timeout = false;
  }

}
