import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { UserService } from '../services/service.index';
import { UserModel } from '../models/user.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(public userService: UserService, public router: Router) { }

  ngOnInit(): void {
    init_plugins();

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      confirmationPassword: new FormControl(null, Validators.required),
      conditions: new FormControl(false)
    }, { validators: this.areEquals('password', 'confirmationPassword') });
  }

  areEquals(field1: string, field2: string) {
    return (group: FormGroup) => {
      const password = group.controls[field1].value;
      const confirmationPassword = group.controls[field2].value;

      if (password === confirmationPassword) {
        return null;
      }

      return {
        areEquals: true
      };
    };
  }

  /**
   * registerUser
   */
  public registerUser() {
    if (this.form.invalid) { return; }

    if (!this.form.value.conditions) {
      swal('Important', 'Must acept the conditions', 'warning');
    }
    const user = new UserModel(
      this.form.value.name,
      this.form.value.email,
      this.form.value.password
    );

    this.userService.createUser(user)
      .subscribe(res => this.router.navigate(['/login']));
  }

}
