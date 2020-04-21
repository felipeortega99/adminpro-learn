import { Component, OnInit } from '@angular/core';
import { UploadFileService, ModalUploadService } from 'src/app/services/service.index';
import swal from 'sweetalert';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  public uploadImage: File;
  public tempImage: string;

  constructor(public uploadFileService: UploadFileService, public modalUploadService: ModalUploadService) { }

  ngOnInit(): void {
  }

  public selectImage(file: File) {
    if (!file) {
      this.uploadImage = null;
      return;
    }

    if (file.type.indexOf('image') < 0) {
      swal('Just images', 'The selected file is not an images', 'error');
      this.uploadImage = null;
      return;
    }

    this.uploadImage = file;

    const reader = new FileReader();
    const urlImagetemp = reader.readAsDataURL(file);
    reader.onloadend = () => this.tempImage = reader.result.toString();
  }

 public updateImage() {
  this.uploadFileService.uploadFile(this.uploadImage, this.modalUploadService.type, this.modalUploadService.id)
    .then(res => {
      this.modalUploadService.notification.emit(res);
      this.closeModal();
    })
    .catch(err => {
      console.error('Error on uploading the image');
    });
  }

  public closeModal() {
    this.tempImage = null;
    this.uploadImage = null;
    this.modalUploadService.hideModal();
  }

}
