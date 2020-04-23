import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/service.index';
import { UserModel } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  public user: UserModel;

  constructor(public userService: UserService, public router: Router) { }

  ngOnInit(): void {
    this.user = this.userService.user;
  }

  search(term: string) {
    this.router.navigate(['search', term]);
  }

}
