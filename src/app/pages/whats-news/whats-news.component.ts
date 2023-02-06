import { Component, OnInit } from '@angular/core';
import {
  groupBy,
  interval,
  of,
  lastValueFrom,
  firstValueFrom,
  combineLatest,
  race,
  timer,
  throwError,
} from 'rxjs';
import {
  map,
  mergeMap,
  filter,
  take,
  combineLatestWith,
  mergeWith,
  raceWith,
  concatWith,
  timeout,
} from 'rxjs/operators';
import { obs } from '../../interface';
import { zipWith, partition } from 'rxjs';
import { share, first } from 'rxjs/operators';

@Component({
  selector: 'app-whats-news',
  templateUrl: './whats-news.component.html',
  styleUrls: ['./whats-news.component.css'],
})
export class WhatsNewsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // this.betterTypes();
    // this.lessMemory();
    // this.toPromiseDeprecatedInstedFromValue();
    // this.combineLatestObservable();
    // this.combineLatestWithRxjs();
    // this.mergeWithRxjs();
    // this.zipWithRxjs();
    // this.raceWithRxjs();
    // this.concatWithRxjs();
    this.betterTimeOut();
  }
  betterTypes() {
    of(
      0,
      'A',
      1,
      'B',
      2,
      'C',
      3,
      'D',
      4,
      'E',
      5,
      'F',
      6,
      'G',
      7,
      'H',
      8,
      'I',
      9,
      '...'
    )
      .pipe(
        groupBy((x): x is number => typeof x === 'number'),
        mergeMap((group$) =>
          group$.key === true ? group$.pipe(map(String)) : group$
        )
      )
      .subscribe(obs);

    of('' as const, 0 as const, null, undefined, new Date())
      .pipe(filter(Boolean))
      .subscribe(obs);
  }
  lessMemory() {
    of(1, 2, 3, 4)
      .pipe(
        map((id) =>
          fetch(`https://jsonplaceholder.typicode.com/todos/${id}`).then((r) =>
            r.json()
          )
        )
      )
      .subscribe(obs);
  }
  toPromiseDeprecatedInstedFromValue() {
    const interval$ = interval(1000).pipe(
      take(5),
      map((v) => v * 2)
    );
    lastValueFrom(interval$).then(console.log); //0
    firstValueFrom(interval$).then(console.log); //8
  }
  combineLatestObservable() {
    //deprecado en 6
    const count1to5$ = interval(1000).pipe(
      take(5),
      map((i) => i + 1)
    );
    const count6to9$ = interval(1000).pipe(
      take(4),
      map((i) => i + 6)
    );

    combineLatest({ x: count1to5$, y: count6to9$ }).subscribe(
      obs
    ); /** (2) [1, 6]
    Subscriber.js:91 (2) [2, 6]
    Subscriber.js:91 (2) [2, 7]
    Subscriber.js:91 (2) [3, 7]
    Subscriber.js:91 (2) [3, 8]
    Subscriber.js:91 (2) [4, 8]
    Subscriber.js:91 (2) [4, 9]

    Se combina con el ultimo valor emitido por el innerobservable
    ---1---2---3---4---
    ----6----7---8--9--
    */
  }
  combineLatestWithRxjs() {
    const count1to5$ = interval(1000).pipe(
      take(5),
      map((i) => i + 1)
    );
    const count6to9$ = interval(1000).pipe(
      take(4),
      map((i) => i + 6)
    );
    count1to5$.pipe(combineLatestWith(count6to9$)).subscribe(console.log);
  }
  mergeWithRxjs() {
    const count1to5$ = interval(1000).pipe(
      take(5),
      map((i) => i + 1)
    );
    const count6to9$ = interval(1000).pipe(
      take(4),
      map((i) => i + 6)
    );
    count1to5$.pipe(mergeWith(count6to9$)).subscribe(obs);
  }
  zipWithRxjs() {
    const count1to5$ = interval(1000).pipe(
      take(5),
      map((i) => i + 1)
    );
    const count6to9$ = interval(1000).pipe(
      take(4),
      map((i) => i + 6)
    );
    count1to5$.pipe(zipWith(count6to9$)).subscribe(obs);

    /**next (2) [1, 6]
interface.ts:4 next (2) [2, 7]
interface.ts:4 next (2) [3, 8]
interface.ts:4 next (2) [4, 9] */
  }

  raceWithRxjs() {
    const count1To5$ = interval(1000).pipe(
      take(5),
      map((i) => i + 1)
    );

    const count6To9$ = interval(1000).pipe(
      take(4),
      map((i) => i + 6)
    );

    count1To5$.pipe(raceWith(count6To9$)).subscribe(console.log);
  }
  concatWithRxjs() {
    const count1To5$ = interval(1000).pipe(
      take(5),
      map((i) => i + 1)
    );

    const count6To9$ = interval(1000).pipe(
      take(4),
      map((i) => i + 6)
    );

    count1To5$.pipe(concatWith(count6To9$)).subscribe(console.log);
  }
  betterTimeOut() {
    // const count$ = timer(3000, 1000).pipe(share());
    // const [first$, rest$] = partition(timer$, (_, index) => index === 0);//ver partition
    const count$ = interval(1202);
    count$
      .pipe(
        timeout({
          each: 1201,
          with: () => throwError(() => new Error('error timeout')),
        })
      )
      .subscribe(obs);
  }
}
