import { Component, OnInit } from '@angular/core';
import { from, Observable, of, fromEvent } from 'rxjs';
import {
  delay,
  concatMap,
  subscribeOn,
  switchMap,
  switchMapTo,
  share,
} from 'rxjs/operators';
import { obs } from '../../interface';
import { concatAll, mergeAll, mergeMapTo } from 'rxjs/operators';

@Component({
  selector: 'app-delay',
  templateUrl: './delay.component.html',
  styleUrls: ['./delay.component.css'],
})
export class DelayComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // this.delayMethod();
    // this.delayForEachValueMethod();
    this.delayObs();
  }
  delayMethod() {
    let source$ = of(1, 2, 3, 5);
    source$.pipe(delay(2000)).subscribe(obs);
  }
  delayForEachValueMethod() {
    let source$ = of(1, 2, 3, 5);
    source$
      .pipe(
        concatMap((v) => {
          return of(v).pipe(delay(2000));
        })
      )
      .subscribe(obs);
  }
  delayObs() {
    /**Administrar array observables con delay */
    const array: Array<Observable<string>> = [
      of('first').pipe(delay(1000)),
      of('second').pipe(delay(1500)),
      of('third').pipe(delay(2000)),
    ];
    const array$ = from(array);
    const request$ = array$.pipe(concatAll());
    const click$ = fromEvent(document, 'click');
    click$
      .pipe(
        switchMap(() => request$),
        share()
      )
      .subscribe(obs);
  }
}
