import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import {LoggedUserService} from './logged-user.service';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RequestsService {

  constructor(private http: Http, private logged_user: LoggedUserService) { }

  private getAuthHeader() {
    return new RequestOptions({headers: new Headers({Authorization: this.logged_user.getToken()})})
  }

  get_api_url(_url) {
    return `${environment.api_url}${_url}`;
  }

  loginUser(_data) {
    return this.http.post(this.get_api_url('/user/login'), _data).map(r => r.json());
  }

  logoutUser() {
    return this.http.post(this.get_api_url('/user/logout'), {}, this.getAuthHeader())
      .map(res => res.json());
  }

  forgotPassword(_data) {
    return this.http.put(this.get_api_url('/user/forgot'), _data).map(r => r.json());
  }

  get_clients(_data) {
    let _options = this.getAuthHeader();
    _options.search = _data;
    return this.http.get(this.get_api_url('/api/admin/client_users'), _options).map(r => r.json());
  }

  svc_get(_url, data, token= null, load_json= true) {
    return this._svc_call('GET', _url, data, token, load_json);
  }

  svc_put(_url, data, token= null) {
    return this._svc_call('PUT', _url, data, token);
  }

  svc_post(_url, data, token= null) {
    return this._svc_call('POST', _url, data, token);
  }

  svc_patch(_url, data, token= null) {
    return this._svc_call('PATCH', _url, data, token);
  }

  svc_delete(_url, data, token= null) {
    return this._svc_call('DELETE', _url, data, token);
  }

  _svc_call(_method, _url, _data, _token= null, load_json= true) {
    let _options = new RequestOptions();
    if (_method === 'GET' || _method === 'DELETE')
      _options.search = _data;
    if (_token)
      _options.headers = new Headers({Authorization: _token});
      // _options.headers = new Headers({Authorization: this.logged_user.get_token()});

    if (_method === 'GET')
      return this.http.get(this.get_api_url(_url), _options).map(r => load_json ? r.json() : r );

    if (_method === 'PUT')
      return this.http.put(this.get_api_url(_url), _data, _options).map(r => load_json ? r.json() : r);

    if (_method === 'POST')
      return this.http.post(this.get_api_url(_url), _data, _options).map(r => load_json ? r.json() : r);

    if (_method === 'PATCH')
      return this.http.patch(this.get_api_url(_url), _data, _options).map(r => load_json ? r.json() : r);

    if (_method === 'DELETE')
      return this.http.delete(this.get_api_url(_url), _options).map(r => load_json ? r.json() : r);

    return Observable.of(false);
  }

  postImage(img) {
    return this.http.post(this.get_api_url('/upl/profile-upload'), {
      upload:img,
      token:  this.logged_user.getToken()
    }).map(res => res.json())
  }
}
