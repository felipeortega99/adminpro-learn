import { Component, OnInit } from '@angular/core';
import { Doctor  } from '../../models/doctor.model';
import { DoctorService } from 'src/app/services/service.index';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
export class DoctorsComponent implements OnInit {
  public doctors: Array<Doctor> = [];
  public from: number = 0;

  constructor(public doctorsService: DoctorService) { }

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorsService.getDoctors(this.from)
      .subscribe(doctors => {
        this.doctors = doctors;
      });
  }

  searchDoctor(term: string) {
    if (term.length <= 0) {
      this.loadDoctors();
      return;
    }

    this.doctorsService.searchDoctor(term)
      .subscribe(doctors => this.doctors = doctors);
  }

  deleteDoctor(doctor: Doctor) {
    this.doctorsService.deleteDoctor(doctor._id)
      .subscribe(() => {
        this.loadDoctors();
      });
  }

  updateFrom(value: number) {
    const from = this.from + value;

    if (from >= this.doctorsService.totalDoctors) { return; }
    if (from < 0) { return; }

    this.from += value;
    this.loadDoctors();
  }

}
