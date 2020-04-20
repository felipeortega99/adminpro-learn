import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from '../../services/service.index';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  public user: UserModel;

  constructor(public sidebarService: SidebarService, public userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.user;
  }

}
