import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {LookupService} from '../../services/lookup.service';
import {ApiCallsService} from '../../services/api-calls.service';
import {LoggedUserService} from '../../services/logged-user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  loginRoles: {[key: string]: number};
  loginRolesKeys: string[];
  signUpForm = new FormGroup({
    'username': new FormControl('', [Validators.email, Validators.required]),
    'password': new FormControl('', Validators.required),
    'data': new FormGroup({
      'role_flags': new FormControl(`${this.lookup.roles.USER}`),
      'first_name': new FormControl('', Validators.required),
      'last_name': new FormControl('', Validators.required),
      'phone': new FormControl('', Validators.required)
    }),
  });
  refObjectKeys = Object.keys;
  apiError: string;
  _error_timeout: any;
  _error_show_timeout = 3000;  // milliseconds

  constructor(
    private lookup: LookupService,
    private apiSvc: ApiCallsService,
    private loggedUser: LoggedUserService,
    private router: Router) {
    this.loginRoles = {
      'USER': this.lookup.roles.USER,
      'ADMIN': this.lookup.roles.ADMIN
    };
    this.loginRolesKeys = Object.keys(this.loginRoles);
  }

  ngOnInit() {
    this.signUpForm.setValue({
      'username': '',
      'password': '',
      'data': {
        'role_flags': `${this.lookup.roles.USER}`
        'first_name': '',
        'last_name': '',
        'phone':''
      }
    });
  }

  signUp() {
    delete this.apiError;
    this.apiSvc.svcPost('/user/register', this.signUpForm.value).subscribe(
      this.userRegistered.bind(this),
      this.registerError.bind(this)
    );
  }

  userRegistered(response) {
    this.loggedUser.login(response);
    this.router.navigate(['/']);
  }

  registerError(err) {
    this.apiError = err.statusText || 'Error in register process';
    try {
      const _body = err.text();
      const _body_loaded = JSON.parse(_body);
      if (_body_loaded.hasOwnProperty('message'))
        this.apiError = _body_loaded['message'];
    }
    catch (error) {
      console.log('Error load body:', err.text(), error);
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
