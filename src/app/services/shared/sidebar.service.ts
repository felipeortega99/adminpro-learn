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
        { title: 'Charts', url: '/charts1' }
      ]
    }
  ];

  constructor() { }
}
