import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file/upload-file.service';

@Injectable()
export class UserService {
  private url = URL_SERVICES;
  public user: UserModel;
  private token: string;

  constructor(private http: HttpClient,
              public router: Router,
              private uploadFileService: UploadFileService) { 
    this.laodStorage();
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
          this.saveToStorage(res.id, res.token, res.user);
          return true;
        })
      );
  }

  googleLogin(token: string) {

    return this.http.post(`${this.url}/login/google`, { token })
      .pipe(
        map((res: any) => {
          this.saveToStorage(res.id, res.token, res.user);
          return true;
        })
      );
  }

  public logout() {
    this.user =  null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['/login']);
  }

  public createUser(user: UserModel): Observable<any> {
    return this.http.post(`${this.url}/user`, user)
      .pipe(
        map((res: any) => {
          swal('User created', user.email, 'success');
          return res.user;
        })
      );
  }

  updateUser(user: UserModel): Observable<any> {
    return this.http.put(`${this.url}/user/${user._id}/?token=${this.token}`, user)
      .pipe(
        map((res: any) => {
          const userDB: UserModel = res.user;
          swal('User updated successfully', user.name, 'success');
          this.saveToStorage(userDB._id, this.token, userDB);
          return true;
        })
      );
  }

  saveToStorage(id: string, token: string, user: UserModel): void {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.user = user;
    this.token = token;
  }

  isLoged(): boolean {
    return ( this.token.length > 5 ) ? true : false;
   }
 
   laodStorage(): void {
     if (localStorage.getItem('token')) {
       this.token = localStorage.getItem('token');
       this.user = JSON.parse(localStorage.getItem('user'));
     } else {
       this.token = '';
       this.user = null;
     }
   }

   updateUserImage(file: File, id: string) {
    this.uploadFileService.uploadFile(file, 'users', id)
      .then((res: any) => {
        this.user.img = res.user.img;
        swal('User Image Updated', this.user.name, 'success');
        this.saveToStorage(id, this.token, this.user);
      })
      .catch(err => console.error(err));
   }
}
