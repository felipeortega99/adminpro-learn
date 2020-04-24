import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserService, ModalUploadService } from 'src/app/services/service.index';
// import swal from 'sweetalert';

declare var swal: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {
  public users: Array<UserModel> = [];
  public from: number = 0;
  public totalRecords: number = 0;
  public loading: boolean = true;

  constructor(public userService: UserService, public modalUploadService: ModalUploadService) { }

  ngOnInit(): void {
    this.loadUsers();
    this.modalUploadService.notification
      .subscribe(res => this.loadUsers());
  }

  loadUsers() {
    this.loading = true;
    this.userService.loadUsers(this.from)
      .subscribe((res: any) => {
        this.totalRecords = res.total;
        this.users = res.users;
        this.loading = false;
      });
  }

  updateFrom(value: number) {
    const from = this.from + value;

    if (from >= this.totalRecords) { return; }
    if (from < 0) { return; }

    this.from += value;
    this.loadUsers();
  }

  searchUser(term: string) {
    if (term.length <= 0) { return; }

    this.loading = true;

    this.userService.searchUser(term)
      .subscribe((users: Array<UserModel>) => {
        this.users = users;
        this.loading = false;
      });
  }

  deleteUser(user: UserModel) {
    if (user._id === this.userService.user._id) {
      swal('You cannot delete this user', '', 'error');
      return;
    }

    swal({
      title: 'Are you sure?',
      text: `Once deleted, you will not be able to recover ${user.name}'s profile` ,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        this.userService.deleteUser(user._id)
          .subscribe( (deleted: boolean) => {
            this.loadUsers();
          });
      }
    });
  }

  saveUser(user: UserModel) {
    this.userService.updateUser(user).subscribe();
  }

  showModal(id: string) {
    this.modalUploadService.showModal('users', id);
  }

}
