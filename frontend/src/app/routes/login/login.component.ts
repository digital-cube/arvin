import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {ApiCallsService} from '../../services/api-calls.service';
import {LoggedUserService} from '../../services/logged-user.service';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
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
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    'username': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', Validators.required)
  });
  apiError: string;
  _error_timeout: any;
  _error_show_timeout = 3000;  // milliseconds
  constructor(private apiSvc: ApiCallsService, private loggedUser: LoggedUserService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    console.log('LOGIN', this.loginForm.value);
    this.apiSvc.svcPost('/user/login', this.loginForm.value).subscribe(
      this.userLoggedIn.bind(this),
      this.userLoginError.bind(this)
    );
  }

  userLoggedIn(response) {
    this.loggedUser.login(response);
    this.router.navigate(['']);
  }

  userLoginError(err) {
    try {
    const _err = err.text();
      const _body = JSON.parse(_err);
      if (_body.hasOwnProperty('message')) {
        this.apiError = _body['message'];
      }
    } catch (err) {
      console.log('Error load login error', err);
    }
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
