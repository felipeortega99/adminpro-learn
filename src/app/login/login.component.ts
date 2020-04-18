import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import { UserModel } from '../models/user.model';
import { GOOGLE_CLIENT_ID } from '../config/config';
declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string;
  public rememberMe = false;
  public auth2: any;

  constructor(public router: Router, private userService: UserService) { }

  ngOnInit(): void {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) { this.rememberMe = true; }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: GOOGLE_CLIENT_ID,
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser: any) => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this.userService.googleLogin(token)
        .subscribe(() => window.location.href = '#/dashboard');
    });
  }

  login(form: NgForm): void {
    if (form.invalid) { return; }

    const user = new UserModel(null, form.value.email, form.value.password);

    this.userService.login(user, form.value.rememberMe)
      .subscribe(() => this.router.navigate(['/dashboard']));
  }

}
