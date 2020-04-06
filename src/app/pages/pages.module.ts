import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Charts1Component } from './charts1/charts1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutes } from './pages-routing.module';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Charts1Component
  ],
  imports: [
    SharedModule,
    PagesRoutes
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Charts1Component
  ]
})
export class PagesModule { }
