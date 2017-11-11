/**
 * Created by bobane on 6/4/17.
 */


import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';

// import * as autobahn from '../../../node_modules/@types/autobahn';
// import * as autobahn from '../../assets/scripts/autobahn.min.js';
// import {autobahn} from '@types/autobahn';
// import autobahn = require("autobahn");
import {Connection} from 'autobahn';
import {LookupService} from './lookup.service';
import {LoggedUserService} from "./logged-user.service";

@Injectable()
export class AppWsService {
  connection: any;

  constructor(
    private lookup: LookupService,
    private loggedUser: LoggedUserService,
  ) {
    // this.connection = new autobahn.Connection({url: environment.ws_url, realm: 'arvinws'});
    this.connection = new Connection({url: environment.ws_url, realm: 'arvinws'});
    this.connection.onopen = (session) => {

      console.log('CONNECTING', session);
      const channel = `arvin2user_${this.loggedUser.id}`;
      console.log('SUBSCRIBE TO', channel);
      // session.subscribe(`arvin2user`, (args, kwargs) => {
      session.subscribe(channel, (args, kwargs) => {
        console.log('STIGLO', args, kwargs);
        this.process_cmd(args, kwargs);
      }).then(
        (subscription) => {
          console.log('ws subscribed with ID ' + subscription.id);
        },
        (error) => {
          console.log(error);
        }
      );
    };
    if (!environment.stop_web_socket) {
      this.connection.open();
    }
  }

  process_cmd(args: Array<any>, kwargs: object) {
    console.log('ARGS', args);
    console.log('KWARGS', kwargs);

    for (const _arg in args) {
      console.log('ARG', _arg, args[_arg]);
      const _cmd = args[_arg];
      if (!('cmd' in _cmd)) {
        console.log('WANRING!!! Wrong message received:', _cmd);
      } else {
        switch (_cmd['cmd']) {
          case this.lookup.ws_commands.REQUEST_PERMISSION:
            if (!('doctor' in _cmd)) {
              alert('WARNING!!! Missing doctor');
              break;
            }
            this.request_permissions(_cmd['doctor']);
            break;
        }
      }
    }
  }

  request_permissions(_doctor) {
    console.log('DOOOOOCTOR', _doctor);
    alert('DOCTOR TRAZI PRISTUP')
  }


}
