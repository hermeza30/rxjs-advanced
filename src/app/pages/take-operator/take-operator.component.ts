import { Component, OnInit } from '@angular/core';
import { interval, of, Subject } from 'rxjs';
import {
  filter,
  take,
  subscribeOn,
  takeUntil,
  mergeMap,
  tap,
} from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-take-operator',
  templateUrl: './take-operator.component.html',
  styles: [],
})
export class TakeOperatorComponent implements OnInit {
  public numbers$ = of(1, 2, 3, 4);
  constructor() {}

  ngOnInit(): void {
    interval(500)
      .pipe(take(5))
      .subscribe(
        (data) => console.log(data),
        (err) => console.log(err),
        () => {
          console.log('Compete');
        }
      );
  }
  pruebaSubjectTake() {
    /**Analizando el error
     * {
    "name": "ObjectUnsubscribedError",
    "message": "object unsubscribed"
}
     */
    const sub = new Subject<number>();
    const obss = sub.asObservable();
    const destroy = new Subject<void>();
    obss.pipe(takeUntil(destroy)).subscribe(obs);
    interval(1000)
      .pipe(
        tap((v) => {
          return sub.next(v);
        })
      )
      .subscribe();
    setTimeout(() => {
      destroy.next();
      destroy.unsubscribe();
    }, 2000);
    setTimeout(() => {
      obss.pipe(takeUntil(destroy)).subscribe(obs); //Al hacer el destroy anteriormente a los dos segundos e intentarlo de nuevo tira ese error
      sub.next(5);
    }, 3000);
  }
}
