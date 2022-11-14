import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login/login.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private sessionService: SessionService,
              private loginService: LoginService,
              private toastrService: ToastrService,
              private router: Router) {
    if (!this.sessionService.isUserLogged())
      this.router.navigate(['login']);
  }

  ngOnInit(): void {
  }

  logout() {
    this.loginService.logout().subscribe({
      next: (value: any) => {
        const res = JSON.parse(JSON.stringify(value));
        this.sessionService.clearAuthenticatedUser();
        // location.reload();
        this.router.navigate(['login']);

        this.toastrService.success(res.message,'SUCESSO');
      },
      error: (err: any) => {
        // console.log(err)
        this.sessionService.clearAuthenticatedUser();
        this.router.navigate(['login']);
        location.reload();
      }
    });
  }
}
