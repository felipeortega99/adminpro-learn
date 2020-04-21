import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {
  menu: Array<any> = [
    {
      title: 'Main',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Progress Bar', url: '/progress' },
        { title: 'Charts', url: '/charts1' },
        { title: 'Promises', url: '/promises' },
        { title: 'RxJs', url: '/rxjs' }
      ]
    }, 
    {
      title: 'Maintenance',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { title: 'Users', url: '/users' },
        { title: 'Hospitals', url: '/hospitals' },
        { title: 'Doctors', url: '/doctors' }
      ]
    }
  ];

  constructor() { }
}
