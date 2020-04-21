import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {
  public type: string;
  public id: string;
  public hide: string = 'hide';
  public notification = new EventEmitter<any>();

  constructor() { }

  public hideModal() {
    this.hide = 'hide';
    this.type = null;
    this.id = null;
  }

  public showModal(type: string, id: string) {
    this.hide = '';
    this.id = id;
    this.type = type;
  }
}
