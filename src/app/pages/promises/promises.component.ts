import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() {
    this.counter()
      .then(message => console.log('Resolve:', message))
      .catch( error => console.error('Promise error', error));
   }

  ngOnInit(): void {
  }

  counter(): Promise<string> {
    return new Promise((resolve, reject) => {
      let counter = 0;
      const interval = setInterval( () => {
        counter += 1;
        console.log('counter: ', counter);

        if (counter === 3) {
          resolve('Ok');
          // reject('Simple error');
          clearInterval( interval );
        }
      }, 1000 );
    });
  }

}
