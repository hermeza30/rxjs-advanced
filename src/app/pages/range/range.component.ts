import { Component, OnInit } from '@angular/core';
import { asyncScheduler, range, startWith } from 'rxjs';
import { obs } from '../../interface';

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.css'],
})
export class RangeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.rangeStartWith();
  }
  rangeWithAsyncScheduler() {
    console.log('Start');
    let range$ = range(4, 10);
    let rangeAsyncro$ = range(4, 10, asyncScheduler);
    // range$.subscribe(obs);
    rangeAsyncro$.subscribe(obs);
    console.log('End');
  }
  rangeStartWith() {
    range(1, 5).pipe(startWith(0)).subscribe(console.log);
  }
}
