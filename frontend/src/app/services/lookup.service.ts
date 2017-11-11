import { Injectable } from '@angular/core';

@Injectable()
export class LookupService {

  roles = {
    'DEVELOPER': 4,
    'ADMIN': 2,
    'USER': 1
  };

  ws_commands = {
    'REQUEST_PERMISSION': 'REQUEST_PERMISSION',
    'RISK_STATUS': 'RISK_STATUS'
  };

  constructor() { }

}
