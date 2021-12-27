import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { delay, concatMap } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-delay',
  templateUrl: './delay.component.html',
  styleUrls: ['./delay.component.css'],
})
export class DelayComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.delayMethod();
    this.delayForEachValueMethod();
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
}
