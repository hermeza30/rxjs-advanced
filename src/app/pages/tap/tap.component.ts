import { Component, OnInit } from '@angular/core';
import { interval, of } from 'rxjs';
import { map, mapTo, tap, mergeAll, take } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-tap',
  templateUrl: './tap.component.html',
  styleUrls: ['./tap.component.css'],
})
export class TapComponent implements OnInit {
  public tap$ = interval(1000).pipe(
    tap(() => console.log('public')),
    mapTo(3),
  );
  constructor() {}

  ngOnInit(): void {
    this.tap$
      .pipe(
        tap((v: any) => {
          console.log('Oninit', v);
        }),
        map((res: any) => {
          return res*3
        }),
        take(4)
      )
      .subscribe(obs);
  }
  tapOperator(): void {}
}
