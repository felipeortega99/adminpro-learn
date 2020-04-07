import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Charts1Component } from './charts1/charts1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


const routes: Routes = [
  { path: '', component: PagesComponent, children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'progress', component: ProgressComponent },
    { path: 'charts1', component: Charts1Component },
    { path: 'account-settings', component: AccountSettingsComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
  ]}
];

export const PagesRoutes = RouterModule.forChild( routes );
