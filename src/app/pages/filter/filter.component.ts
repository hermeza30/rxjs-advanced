import { Component, OnInit } from '@angular/core';
import { of, fromEvent, Subscription, Subject, Observable } from 'rxjs';
import { filter, map, mergeMap, switchMap, take } from 'rxjs/operators';
import { obs } from 'src/app/interface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styles: [],
})
export class FilterComponent implements OnInit {
  public subs: Subscription = new Subscription();
  public obs$!: Observable<number>;
  constructor() {}

  ngOnInit(): void {
    /**........... */
    // let arrra = Array.from(Array(10).keys());
    // of(...arrra)
    //   .pipe(filter((x) => x >= 3))
    //   .subscribe(obs);
    // of(...arrra)
    //   .pipe(filter((x) => x === 50))
    //   .subscribe(obs);
    // /**........... */
    // this.subs = fromEvent(document, 'click')
    //   .pipe(
    //     filter((e: any) => {
    //       return (e.target as HTMLElement).tagName === 'A';
    //     })
    //   )
    //   .subscribe(obs);
    this.switchMasfilter();
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  switchMasfilter() {
    const subj: Subject<number> = new Subject();
    const obs2 = subj.asObservable();
    this.obs$ = obs2.pipe(
      filter<number>(Boolean),
      switchMap((v) => {
        return of(2).pipe(
          map((vt) => {
            return v * vt;
          })
        );
      })
    );

    setTimeout(() => {
      subj.next(2342);
    }, 2000);
    setTimeout(() => {
      subj.next(1);
    }, 5000);
  }
}
