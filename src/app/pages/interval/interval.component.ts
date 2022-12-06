import { Component, OnInit } from '@angular/core';
import { interval, fromEvent } from 'rxjs';
import { take, delay, takeUntil } from 'rxjs/operators';
import { obs } from '../../interface';
import * as Rx from 'rxjs';
@Component({
  selector: 'app-interval',
  templateUrl: './interval.component.html',
  styleUrls: ['./interval.component.css'],
})
export class IntervalComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.detenerIntervalo();
  }

  prubaInterval() {
    const interval$ = interval(1000);
    let subscrp = interval$.pipe(take(3)).subscribe(obs);
    setTimeout(() => {
      console.log('subs', subscrp.closed);
    }, 4000);
  }

  detenerIntervalo() {
    let click$ = fromEvent(document, 'click');
    const interval$ = Rx.interval(1000);
    interval$.pipe(take(10), takeUntil(click$)).subscribe({
      next: (v) => console.log(v),
      error: (v) => console.error(v),
      complete: () => {
        console.log('COMPLETE');
      },
    });
  }
}
