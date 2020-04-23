import { Component, OnInit } from '@angular/core';
import { DoctorService, HospitalService, ModalUploadService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { Doctor } from 'src/app/models/doctor.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: []
})
export class DoctorComponent implements OnInit {

  hospitals: Array<Hospital> = [];
  doctor: Doctor = new Doctor('', '', '', '', '');
  hospital = new Hospital('');

  constructor( public doctorService: DoctorService, public hospitalService: HospitalService,
               public router: Router, public activatedRoute: ActivatedRoute,
               public modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe(params => {
      const id = params['id'];

      if (id !== 'new') {
        this.getDoctor(id);
      }
    });
  }

  ngOnInit(): void {
    this.hospitalService.loadHospitals()
      .subscribe(hospitals => this.hospitals = hospitals);

    this.modalUploadService.notification
      .subscribe(res => {
        this.doctor.img = res.doctor.img;
      });
  }

  getDoctor(id: string) {
    this.doctorService.getDoctor(id)
      .subscribe(doctor => {
        this.doctor = doctor;
      });
  }

  saveDoctor(form: NgForm) {
    if (form.invalid) { return; }

    this.doctorService.saveDoctor(this.doctor)
      .subscribe(doctor => {
        this.doctor._id = doctor._id;
        this.router.navigate(['/doctor', doctor._id]);
      });
  }

  onChangeHospital(id: string) {
    this.hospitalService.getHospital(id)
      .subscribe(hospital => this.hospital = hospital);
  }

  updateImage() {
    this.modalUploadService.showModal('doctors', this.doctor._id);
  }

}
