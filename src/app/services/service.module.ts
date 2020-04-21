import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SettingsService, SidebarService, SharedService, UserService, UploadFileService } from './service.index';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';



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
    UploadFileService,
    ModalUploadService
  ]
})
export class ServiceModule { }
