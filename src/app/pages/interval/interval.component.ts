import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { take, delay } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-interval',
  templateUrl: './interval.component.html',
  styleUrls: ['./interval.component.css'],
})
export class IntervalComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const interval$ = interval(1000);
    let subscrp = interval$.pipe(take(3)).subscribe(obs);
    setTimeout(() => {
      console.log('subs', subscrp.closed);
    }, 4000);
  }
}
