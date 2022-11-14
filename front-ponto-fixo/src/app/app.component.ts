import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './services/session/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-ponto-fixo';

  constructor(
    private sessionService: SessionService,
    private router: Router) {

    if (!this.isLogged()) this.router.navigate(['login']);
  }

  isLogged() {
    return this.sessionService.isUserLogged() && this.sessionService.isLogged();
  }

  getClass() {
    let cls;
    (this.isLogged()) ? cls = 'body': cls = 'login';
    return cls;
  }
}
