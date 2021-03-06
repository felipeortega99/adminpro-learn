import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Charts1Component } from './charts1/charts1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor.component';
import { SearchComponent } from './search/search.component';
import { AdminGuard, VerifyTokenGuard } from '../services/service.index';


const routes: Routes = [
      {
            path: 'dashboard',
            component: DashboardComponent,
            canActivate: [VerifyTokenGuard],
            data: { title: 'Dashboard' }
      },
      { path: 'progress', component: ProgressComponent, data: { title: 'Progress' }  },
      { path: 'charts1', component: Charts1Component, data: { title: 'Charts' }  },
      { path: 'promises', component: PromisesComponent, data: { title: 'Promises' }  },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' }  },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Theme Settings' }  },
      { path: 'profile', component: ProfileComponent, data: { title: 'User Profile' }  },
      { path: 'search/:term', component: SearchComponent, data: { title: 'Search' }  },
      // maintenance
      {
            path: 'users',
            component: UsersComponent,
            canActivate: [AdminGuard],
            data: { title: 'Users maintenance' }
      },
      { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitals maintenance' }  },
      { path: 'doctors', component: DoctorsComponent, data: { title: 'Doctors maintenance' }  },
      { path: 'doctor/:id', component: DoctorComponent, data: { title: 'Update Doctor' }  },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

export const PagesRoutes = RouterModule.forChild( routes );
