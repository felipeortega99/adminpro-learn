import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/service.index';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  public user: UserModel;
  public uploadImage: File;
  public tempImage: string;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.user;
  }

  updateProfile(user: UserModel) {
    this.user.name = user.name;
    if (!this.user.google) {
      this.user.email = user.email;
    }

    this.userService.updateUser(this.user).subscribe();
  }

  public selectImage(file: File) {
    if (!file) {
      this.uploadImage = null;
      return;
    }

    this.uploadImage = file;

    const reader = new FileReader();
    const urlImagetemp = reader.readAsDataURL(file);
    reader.onloadend = () => this.tempImage = reader.result.toString();
  }

  updateImage() {
    this.userService.updateUserImage(this.uploadImage, this.user._id);
  }

}
