import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private cookieOptions: any;
  private dataExpires: Date | undefined;

  constructor(
    private localStorage: LocalStorageService,
    private cookieService: CookieService) { }

  cookieDateExpires() {
    const TIME_COOKIE_HOUR = 1;
    this.dataExpires = new Date();
    this.dataExpires.setHours(this.dataExpires.getHours() + TIME_COOKIE_HOUR);
    this.cookieOptions = {expires: this.dataExpires} ;
    return this.cookieOptions;
  }

  setUserAuthenticated(user: any, token: string) {
    const options = this.cookieDateExpires();

    localStorage.setItem('user', btoa(JSON.stringify(user)));
    localStorage.setItem('authenticated', btoa('true'));
    this.cookieService.set('tcc-system-token', token, options);
  }

  isUserAuthenticated() {
    const authenticated = atob(<string>localStorage.getItem('authenticated'));
    return authenticated === 'true' && (this.getUserToken() !== undefined && this.getUserToken() !== null);
  }

  clearAuthenticatedUser() {
    localStorage.clear();
    this.cookieService.delete('tcc-system-token');
    localStorage.setItem('authenticated', btoa('false'));
  }

  getAuthenticatedUser() {
    if (this.isUserAuthenticated()) {
      return JSON.parse(atob(<string>localStorage.getItem('user')));
    } else {
      return undefined;
    }
  }

  getUserToken() {
    return this.cookieService.get('tcc-system-token');
  }

  isLogged() {
    const authenticated = atob(<string>localStorage.getItem('authenticated'));
    return authenticated === 'true';
  }

  isUserLogged() {
    const authenticated = this.cookieService.get('tcc-system-token');
    return authenticated !== undefined && authenticated !== '';
  }
}
