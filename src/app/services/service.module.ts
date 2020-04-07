import { NgModule } from '@angular/core';
import { SettingsService, SidebarService, SharedService } from './service.index';



@NgModule({
  declarations: [],
  providers: [
    SettingsService,
    SidebarService,
    SharedService
  ]
})
export class ServiceModule { }
