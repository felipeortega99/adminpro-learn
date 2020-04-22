import { Component, OnInit } from '@angular/core';
import { HospitalService, ModalUploadService } from 'src/app/services/service.index';
import { Hospital } from 'src/app/models/hospital.model';
import swal from 'sweetalert';

declare var swal: any;

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit {
  public hospitals: Array<Hospital> = [];
  public from: number = 0;

  constructor(public hospitalService: HospitalService, public modalUploadService: ModalUploadService) { }

  ngOnInit(): void {
    this.loadHospitals();
    this.modalUploadService.notification
      .subscribe(() => this.loadHospitals());
  }

  loadHospitals(): void {
    this.hospitalService.loadHospitals(this.from)
      .subscribe(hospitals => {
        this.hospitals = hospitals;
      });
  }

  saveHospital(hospital: Hospital) {
    console.log(hospital);
    this.hospitalService.updateHospital(hospital)
      .subscribe();
  }

  deleteHospital(hospital: Hospital) {
    this.hospitalService.deleteHospital(hospital._id)
      .subscribe(() => {
        this.loadHospitals();
      });
  }

  searchHospital(term: string) {
    if (term.length <= 0) {
      this.loadHospitals();
      return;
    }

    this.hospitalService.searchHospital(term)
      .subscribe((hospitals: Array<Hospital>) => {
        this.hospitals = hospitals;
      });
  }

  createHospital() {
    swal({
      title: 'New Hospital',
      text: 'Enter hospital name',
      icon: 'info',
      buttons: true,
      dangerMode: true
    })
    .then((value: string) => {
      if (!value || value.length === 0) { return; }

      this.hospitalService.createHospital(value)
        .subscribe(() => this.loadHospitals());
    });
  }

  updateImage(id: string) {
    this.modalUploadService.showModal('hospitals', id);
  }

  updateFrom(value: number) {
    const from = this.from + value;

    if (from >= this.hospitalService.totalHospitals) { return; }
    if (from < 0) { return; }

    this.from += value;
    this.loadHospitals();
  }

}
