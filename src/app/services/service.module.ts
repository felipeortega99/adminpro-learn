import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SettingsService, SidebarService, SharedService, UserService } from './service.index';
import { LoginGuardGuard } from './guards/login-guard.guard';



@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UserService,
    LoginGuardGuard
  ]
})
export class ServiceModule { }
