import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SettingsService, SidebarService, SharedService, UserService, UploadFileService } from './service.index';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { HospitalService } from './hospital/hospital.service';
import { DoctorService } from './doctor/doctor.service';
import { AdminGuard } from './guards/admin.guard';



@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UserService,
    LoginGuardGuard,
    AdminGuard,
    UploadFileService,
    ModalUploadService,
    HospitalService,
    DoctorService
  ]
})
export class ServiceModule { }
