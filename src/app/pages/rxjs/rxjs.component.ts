import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor() {

    this.subscription = this.counter().pipe(
      // retry(2)
    ).subscribe(
      num => console.log('Subs', num),
      error => console.error('Observable error:', error),
      () => console.log('Observer has finished')
    );
   }

   ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('On Destroy');
    this.subscription.unsubscribe();
  }

  counter(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {
      let counter = 0;
      const interval = setInterval(() => {
        counter += 1;

        const result = {
          value: counter
        };

        observer.next(result);

        // if (counter === 3) {
        //   clearInterval(interval);
        //   observer.complete();
        // }

        // if (counter === 2 ) {
        //   clearInterval(interval);
        //   observer.error('Help!');
        // }

      }, 1000);
    }).pipe(
      map( resp => resp.value ),
      filter( (value, index) => (value % 2) === 1 ? true : false )
    );
  }

}
