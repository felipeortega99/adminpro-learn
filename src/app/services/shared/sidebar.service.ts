import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';

@Injectable()
export class SidebarService {
  menu: Array<any> = [];
  constructor(public userService: UserService) {
    
   }

   public loadMenu() {
    this.menu = this.userService.menu;
   }
}
