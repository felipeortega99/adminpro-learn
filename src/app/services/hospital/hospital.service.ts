import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import swal from 'sweetalert';
import { Hospital } from 'src/app/models/hospital.model';

@Injectable()
export class HospitalService {
  public totalHospitals: Number = 0;

  constructor(public http: HttpClient, public userService: UserService) { }

  loadHospitals(from: number = 0): Observable<any> {
    const url = `${URL_SERVICES}/hospital?from=${from}`;
    return this.http.get(url)
      .pipe(
        map((res: any) => {
          this.totalHospitals = res.total;
          return res.hospitals;
        })
      );
  }

  getHospital(id: string) {
    const url = `${URL_SERVICES}/hospital/${id}`;
    return this.http.get(url)
      .pipe(
        map((res: any) => res.hospital)
      );
  }

  deleteHospital(id: string) {
    const url = `${URL_SERVICES}/hospital/${id}?token=${this.userService.token}`;
    return this.http.delete(url)
      .pipe(
        map(() => swal('Hospital removed', 'Successfully removed', 'success'))
      );
    }

    createHospital(name: string) {
      const url = `${URL_SERVICES}/hospital?token=${this.userService.token}`;
      return this.http.post(url, { name })
        .pipe(
          map((res: any) => res.hospital)
        );
    }

    searchHospital(term: string) {
      const url = `${URL_SERVICES}/search/collection/hospitals/${term}`;
      return this.http.get(url)
        .pipe(
          map((res: any) => res.hospitals)
        );
    }

    updateHospital(hospital: Hospital) {
      const url = `${URL_SERVICES}/hospital/${hospital._id}?token=${this.userService.token}`;
      return this.http.put(url, hospital)
        .pipe(
          map((res: any) =>{
            swal('Hospital updated', hospital.name, 'success');
            return res.hospital;
          })
        );
    }

}
