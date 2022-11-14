import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {SessionService} from "../session/session.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlLogin: string = `${environment.apiUrl}/api/login`;
  private urlLogout: string = `${environment.apiUrl}/api/logout`;

  constructor(
    private httpClient: HttpClient,
    private sessionService: SessionService) { }

  login(email: string, password: string) {
    const credentials = {
      'email': email,
      'password': password
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.httpClient.post(this.urlLogin, JSON.stringify(credentials), httpOptions);
  }

  logout() {

    const credentials = {
      'token': this.sessionService.getUserToken()
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.sessionService.getUserToken()
      })
    };

    return this.httpClient.post(this.urlLogout, JSON.stringify(credentials), httpOptions);
  }
}
