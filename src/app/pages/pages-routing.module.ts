import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Charts1Component } from './charts1/charts1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path: '', component: PagesComponent, canActivate: [LoginGuardGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'Progress' }  },
      { path: 'charts1', component: Charts1Component, data: { title: 'Charts' }  },
      { path: 'promises', component: PromisesComponent, data: { title: 'Promises' }  },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' }  },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Theme Settings' }  },
      { path: 'profile', component: ProfileComponent, data: { title: 'User Profile' }  },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
  ]}
];

export const PagesRoutes = RouterModule.forChild( routes );
