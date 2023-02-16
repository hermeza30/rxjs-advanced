import { Component, OnInit } from '@angular/core';
import {
  interval,
  observable,
  Observable,
  Observer,
  of,
  Subject,
  timer,
  forkJoin,
  concat,
  merge,
  EMPTY,
  from,
} from 'rxjs';
import { combineLatestInit } from 'rxjs/internal/observable/combineLatest';
import {
  combineLatest,
  switchMap,
  take,
  startWith,
  takeUntil,
  map,
  tap,
} from 'rxjs/operators';
import { obs } from '../../interface';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
})
export class SubjectComponent implements OnInit {
  constructor() {}
  /**Un subject se puede comportar como un Observer y como un observable que emite eventos.
 * interface Subject extends Observable implements Subscription {
}
 */
  ngOnInit(): void {
    // this.observableMethodUnicast();
    // this.subjectMulticast();
    // this.ejemploSubjectAsObserver();
    // this.destruirInnerAndHIggerObserv();
    // this.multipleSubscriptions();
    this.quieroVeerTakeUntil();
  }

  multipleSubscriptions() {
    const subject = new Subject();
    subject.subscribe((x) => console.log('Source1:' + x));
    subject.subscribe((x) => console.log('Source2:' + x));

    subject.next(0);
    from([1, 2, 3, 4]).subscribe(subject);
  }
  observableMethodUnicast() {
    let observable$ = new Observable<any>((observer) => {
      observer.next(Math.random()),
        observer.next(2),
        observer.next(3),
        observer.next(4),
        observer.complete();
    });
    let observer1 = {
      next: (data: any) => console.log('Ob1 ' + data),
      error: (err: any) => console.log(err),
      complete: () => console.log('Complete Obs1'),
    };
    let observer2 = {
      next: (data: any) => console.log('Ob2 ' + data),
      error: (err: any) => console.log(err),
      complete: () => console.log('Complete Obs2'),
    };
    observable$.subscribe(observer1);
    observable$.subscribe(observer2);
  }
  subjectMulticast() {
    let observable$ = of(Math.random(), 2, 3, 4, 5);
    let sub = new Subject<number>();

    let observer1 = {
      next: (data: any) => console.log('Ob1 ' + data),
      error: (err: any) => console.log(err),
      complete: () => console.log('Complete Obs1'),
    };
    let observer2 = {
      next: (data: any) => console.log('Ob2 ' + data),
      error: (err: any) => console.log(err),
      complete: () => console.log('Complete Obs2'),
    };
    let observer3 = {
      next: (data: any) => console.log('Ob3 ' + data),
      error: (err: any) => console.log(err),
      complete: () => console.log('Complete Obs3'),
    };
    // sub.subscribe(observer2);
    // observable$.subscribe(sub);//Aca subscribo el subject(como observer )al observable.
    // sub.subscribe(observer1);//Tengo observers subscripto al subject(como observable)
    /**
     * @nota si la subscrpcion sub.subcribe(observer1) la hago despues del observable$.subscribe()
     * observable$.subscribe(sub)
     * sub.subscribe(observer1)
     * entonces no va a poder capturar los datos de la ejecucion del observable$ porque mi subject lo hace posteriormente
     *
     * sub.subscribe(observer1);
     * observable$.subscribe(sub)
     * sub.subscribe(observer2);
     */

    // sub.subscribe(observer3);
    // sub.next(2222);
    // observable$.subscribe(sub);//Aca subscribo el subject(como observer )al observable.
  }

  ejemploSubjectAsObserver() {
    const interSubject: Subject<any> = new Subject();
    const itervObs$ = interSubject.asObservable();
    // const obser= of(timer(2000),timer(4000));

    itervObs$
      .pipe(
        startWith(false),
        switchMap((pause: boolean = false) => (pause ? EMPTY : interval(100)))
      )
      .subscribe(obs);
    interSubject.next(false);
    // merge(timer(1000),timer(2000),timer(5000)).subscribe(interSubject)
    setTimeout(() => {
      interSubject.next(true);
    }, 7000);
  }
  destruirInnerAndHIggerObserv() {
    const interSubject: Subject<any> = new Subject();
    const itervObs$ = interSubject.asObservable();
    const subDestroy = new Subject();
    const declarative = itervObs$.pipe(
      startWith(false),
      switchMap((pause: boolean = false) => (pause ? EMPTY : interval(100)))
    );
    declarative.pipe().subscribe(obs);
    interSubject.next(false);
    // merge(timer(1000),timer(2000),timer(5000)).subscribe(interSubject)
    setTimeout(() => {
      interSubject.next(true);
    }, 7000);
    setTimeout(() => {
      subDestroy.next(true);
      subDestroy.unsubscribe();
    }, 8000);
  }
  quieroVeerTakeUntil() {
    const destroy$ = new Subject();
    interval(1000)
      .pipe(
        tap(() => console.log('--->Interval padre')),
        mergeMap(() => {
          return interval(2000).pipe(
            tap(() => console.log('--->Interval Hijo'))
          );
        }),
        takeUntil(destroy$) //take until se lleva puesto el source e innerInterval
      )
      .subscribe();
    setTimeout(() => {
      destroy$.next(destroy$);
    }, 6000);
  }
}
