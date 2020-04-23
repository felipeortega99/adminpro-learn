import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { UserModel } from 'src/app/models/user.model';
import { Hospital } from 'src/app/models/hospital.model';
import { Doctor } from 'src/app/models/doctor.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {
  users: Array<UserModel> = [];
  hospitals: Array<Hospital> = [];
  doctors: Array<Doctor> = [];

  constructor(public activatedRoute: ActivatedRoute, public http: HttpClient) {
    this.activatedRoute.params
      .subscribe(params => {
        const term = params['term'];
        this.search(term);
      });
  }

  ngOnInit(): void {
  }

  search(term: string) {
    const url = `${URL_SERVICES}/search/all/${term}`;
    this.http.get(url).subscribe((res: any) => {
      console.log(res);
      this.users = res.users;
      this.hospitals = res.hospitals;
      this.doctors = res.doctors;
    });
  }

}
