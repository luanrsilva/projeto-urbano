import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login/login.service';
import { SessionService } from 'src/app/services/session/session.service';
import {User} from "../../models/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private loginService: LoginService,
    private sessionService: SessionService,
    private toastrService: ToastrService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  errors = {
    userEmail: {
      required: 'Email is required.',
      email: 'Must be a valid email address.',
    },
    password: {
      required: 'Password is required.',
      minlength: 'Must be at least 6 characters.',
    },
  };

  ngOnInit(): void {
  }

  login() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.loginService.login(email, password)
      .subscribe({
        next: (response) => {
          const res = JSON.parse(JSON.stringify(response));
          this.sessionService.setUserAuthenticated(res.data.user, res.data.token);
          this.toastrService.success(res.message,'SUCESSO');
          this.redirectUser(res.data.user);
        },
        error: err => {
          this.toastrService.error(err.error.message, 'ERRO');
        }
      }
    )
  }

  redirectUser(user: User) {
    (user._type === 'Admin') ?
      this.router.navigate(['/cities']) : this.router.navigate(['/cities' + 'id']);
  }

}
