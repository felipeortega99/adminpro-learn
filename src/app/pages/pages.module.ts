import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Charts1Component } from './charts1/charts1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutes } from './pages-routing.module';
import { IncreaserComponent } from '../components/increaser/increaser.component';
import { ChartsModule } from 'ng2-charts';
import { DoughnutChartComponent } from '../components/doughnut-chart/doughnut-chart.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Charts1Component,
    IncreaserComponent,
    DoughnutChartComponent,
    AccountSettingsComponent,
  ],
  imports: [
    SharedModule,
    PagesRoutes,
    FormsModule,
    ChartsModule
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Charts1Component
  ]
})
export class PagesModule { }
