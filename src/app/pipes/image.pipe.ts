import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type: string = 'user'): unknown {
    let url = `${URL_SERVICES}/img`;
    if (!img) {
      return `${url}/users/xxx`;
    }

    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    switch(type) {
      case 'user':
        url = `${url}/users/${img}`;
        break;
      case 'doctor':
        url = `${url}/doctors/${img}`;
        break;
      case 'hospital':
        url = `${url}/hospitals/${img}`;
        break;
      default:
        console.log('Image type does not exist');
        url = `${url}/users/xxx`;
    }

    return url;
  }

}
