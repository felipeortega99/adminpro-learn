import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import swal from 'sweetalert';
import { Doctor } from 'src/app/models/doctor.model';

@Injectable()
export class DoctorService {
  public totalDoctors: number = 0;

  constructor(public http: HttpClient, public userService: UserService) { }

  getDoctors(from: number = 0): Observable<any> {
    const url = `${URL_SERVICES}/doctor?from=${from}`;
    return this.http.get(url)
      .pipe(
        map((res: any) => {
          this.totalDoctors = res.total;
          return res.doctors;
        })
      );
  }

  getDoctor(id: string) {
    const url = `${URL_SERVICES}/doctor/${id}`;
    return this.http.get(url)
      .pipe(
        map((res: any) => res.doctor)
      );
  }

  searchDoctor(term: string) {
    const url = `${URL_SERVICES}/search/collection/doctors/${term}`;
    return this.http.get(url)
      .pipe(
        map((res: any) => res.doctors)
      );
  }

  deleteDoctor(id: string) {
    const url = `${URL_SERVICES}/doctor/${id}?token=${this.userService.token}`;
    return this.http.delete(url)
      .pipe(
        map(() => swal('Doctor removed', 'Successfully removed', 'success'))
      );
  }

  saveDoctor(doctor: Doctor) {
    let url = `${URL_SERVICES}/doctor`;

    if (doctor._id) {
      url = `${url}/${doctor._id}?token=${this.userService.token}`;

      return this.http.put(url, doctor)
      .pipe(
        map((res: any) => {
          swal('Doctor Updated', doctor.name, 'success');
          return res.doctor;
        })
      );
    } else {
      url = `${url}?token=${this.userService.token}`;

      return this.http.post(url, doctor)
        .pipe(
          map((res: any) => {
            swal('Doctor Created', doctor.name, 'success');
            return res.doctor;
          })
        );
    }
  }

}
