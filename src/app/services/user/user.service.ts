import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file/upload-file.service';

@Injectable()
export class UserService {
  private url = URL_SERVICES;
  public token: string;
  public user: UserModel;
  public menu: any = [];

  constructor(private http: HttpClient,
              public router: Router,
              private uploadFileService: UploadFileService) {
    this.laodStorage();
  }

  renewToken() {
    const url = `${URL_SERVICES}/login/renewtoken?token=${this.token}`;
    return this.http.get(url).pipe(
      map((res: any) => {
        this.token = res.token;
        localStorage.setItem('token', this.token);
        return true;
      }),
      catchError((err: any) => {
        this.router.navigate(['/login']);
        swal(err.error.message, err.error.errors.message, 'error');
        return throwError(err);
      })
    );
  }

  login(user: UserModel, remember: boolean): Observable<any> {
    if (remember) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(`${this.url}/login`, user)
      .pipe(
        map((res: any) => {
          this.saveToStorage(res.id, res.token, res.user, res.menu);
          return true;
        }),
        catchError(err => swal('Error on Login', err.error.message, 'error'))
      );
  }

  googleLogin(token: string) {

    return this.http.post(`${this.url}/login/google`, { token })
      .pipe(
        map((res: any) => {
          this.saveToStorage(res.id, res.token, res.user, res.menu);
          return true;
        })
      );
  }

  public logout() {
    this.user =  null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  public createUser(user: UserModel): Observable<any> {
    return this.http.post(`${this.url}/user`, user)
      .pipe(
        map((res: any) => {
          swal('User created', user.email, 'success');
          return res.user;
        }),
        catchError(err => swal(err.error.message, err.error.errors.message, 'error'))
      );
  }

  updateUser(user: UserModel): Observable<any> {
    return this.http.put(`${this.url}/user/${user._id}/?token=${this.token}`, user)
      .pipe(
        map((res: any) => {

          if (user._id === this.user._id) {
            const userDB: UserModel = res.user;
            this.saveToStorage(userDB._id, this.token, userDB, this.menu);
          }

          swal('User updated successfully', user.name, 'success');

          return true;
        }),
        catchError(err => swal(err.error.message, err.error.errors.message, 'error'))
      );
  }

  saveToStorage(id: string, token: string, user: UserModel, menu: any): void {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.user = user;
    this.token = token;
    this.menu = menu;
  }

  isLoged(): boolean {
    return ( this.token.length > 5 ) ? true : false;
   }
 
   laodStorage(): void {
     if (localStorage.getItem('token')) {
       this.token = localStorage.getItem('token');
       this.user = JSON.parse(localStorage.getItem('user'));
       this.menu = JSON.parse(localStorage.getItem('menu'));
     } else {
       this.token = '';
       this.user = null;
       this.menu = [];
     }
   }

   updateUserImage(file: File, id: string) {
    this.uploadFileService.uploadFile(file, 'users', id)
      .then((res: any) => {
        this.user.img = res.user.img;
        swal('User Image Updated', this.user.name, 'success');
        this.saveToStorage(id, this.token, this.user, this.menu);
      })
      .catch(err => console.error(err));
   }

   loadUsers(from: number = 0) {
    const url = `${URL_SERVICES}/user?from=${from}`;
    return this.http.get(url);
   }

   searchUser(term: string) {
      const url = `${URL_SERVICES}/search/collection/users/${term}`;
      return this.http.get(url)
        .pipe(
          map((res: any) => res.users)
        );
   }

   deleteUser(id: string) {
     const url = `${URL_SERVICES}/user/${id}?token=${this.token}`;
     return this.http.delete(url).pipe(
       map(() => {
        swal('Poof! The profile has been deleted', '', 'success');
        return true;
       })
     );
   }
}
