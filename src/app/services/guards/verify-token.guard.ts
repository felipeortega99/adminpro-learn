import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyTokenGuard implements CanActivate {

  constructor(private userService: UserService, public router: Router) { }

  canActivate(): Promise<boolean> | boolean {
    const token = this.userService.token;
    const payload = JSON.parse(atob(token.split('.')[1]));

    const expired = this.expired(payload.exp);

    if (expired) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.renew(payload.exp);
  }

  renew(expDate: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const expToken = new Date(expDate * 1000);
      const today = new Date();

      today.setTime(today.getTime() + (4 * 60 * 60 * 1000));

      if (expToken.getTime() > today.getTime()) {
        resolve(true);
      } else {
        this.userService.renewToken()
          .subscribe( () => resolve(true), () => {
            this.router.navigate(['/login']);
            reject(false);
          } );
      }
    });
  }

  expired(expDate: number): boolean {
    const today = new Date().getTime() / 1000;

    return (expDate < today) ? true : false;
  }

}
