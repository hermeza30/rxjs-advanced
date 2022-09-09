import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Observer4 } from 'src/app/services/Observer4';

@Component({
  selector: 'app-new-observable',
  templateUrl: './new-observable.component.html',
  styleUrls: ['./new-observable.component.css'],
})
export class NewObservableComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const newObservable = new Observable<number>((observer) => {
      let timer = 0;
      for (let i = 0; i <= 5; i++) {
        observer.next(i);
      }
      observer.complete();
      observer.next(1000);
    });

    let observer = {
      next: (data: number) => console.log('observer 1' + data),
      error: (error: string) => console.log(error),
      complete: () => console.log('complete all done'),
    };

    newObservable.subscribe(observer);

    newObservable.subscribe({
      next: (data: number) => console.log('observer 2' + data),
      error: (error: string) => console.log(error),
      complete: () => console.log('complete all done'),
    });

    newObservable.subscribe(
      (data) => console.log('observer 3' + data),
      (error) => console.log(error),
      () => console.log('complete done')
    );

    newObservable.subscribe(new Observer4());
  }

  underneedHood() {
    const observable = (events: any) => {
      const INTERVAL = 1 * 1000;
      let schedulerId: any;
      return {
        subscribe: (observer: any) => {
          schedulerId = setInterval(() => {
            if (events.length === 0) {
              observer.complete();
              clearInterval(schedulerId);
              schedulerId = undefined;
            } else {
              observer.next(events.shift());
            }
          }, INTERVAL);
          return {
            unsubscribe: () => {
              if (schedulerId) {
                clearInterval(schedulerId);
              }
            },
          };
        },
      };
    };

    let sub = observable([1, 2, 3]).subscribe({
      next: console.log,
      complete: () => console.log('Done!'),
    });

    const source$ = new Observable((observer: any) => {
      observer.next('55555555');
      observer.next('44444444');
      observer.next('333333333');
      observer.complete();
    });
    source$.subscribe(console.log);
  }
}
