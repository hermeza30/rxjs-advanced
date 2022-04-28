import { Component, OnInit } from '@angular/core';
import { interval, of, Subject, timer, Subscription } from 'rxjs';
import {
  map,
  mapTo,
  tap,
  mergeAll,
  take,
  delay,
  takeUntil,
} from 'rxjs/operators';
import { obs } from '../../interface';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-tap',
  templateUrl: './tap.component.html',
  styleUrls: ['./tap.component.css'],
})
export class TapComponent implements OnInit {

  public sub:Subscription=new Subscription();
  public tap$ = interval(1000).pipe(
    tap(() => console.log('public')),
    mapTo(3)
  );
  constructor() {}

  ngOnInit(): void {
    // this.pruebaDeDobleSubscripcion()
    this.comoDestruirSubscription();
  }
  tapOperator(): void {
    this.tap$
      .pipe(
        tap((v: any) => {
          console.log('Oninit', v);
        }),
        map((res: any) => {
          return res * 3;
        }),
        take(4)
      )
      .subscribe(obs);
  }

  pruebaDeDobleSubscripcion() {
    /**
     * todos los operadores devuelven un observable
     * el observable source que tiene 1,2,3,4 tiene un takeUntil, cuando el destroy emite ese observable se destroye
     * pero el observable generado por el delay no. Entonces cuando haya una subscripcion esta se va a realizar a los 5seg
     * por mas que yo a los 2 segundos mate al obsrvable de origen.
     * Si quiero matar al observable generado por el delay, tengo que añadirle takeUntil.
     * Otra cosa es que la sub1y sub2 se van a cerrar.a los 2 segundos. pero los 2 observables van a vivir.
     * Una cosa es la subscripcion y otra cosa es el complete de los observables
     */
    const destroy$: Subject<void> = new Subject();
    const obs$ = of(1, 2, 3, 4).pipe(takeUntil(destroy$));
    const sub1 = obs$.pipe(delay(5000)).subscribe(obs);
    const sub2 = obs$.pipe(delay(5000)).subscribe(obs);
    console.log('Obs1', obs$);
    console.log('Subscripcion1', sub1);
    console.log('Subscripcion2', sub2);
    timer(2000).subscribe(() => {
      destroy$.next();
      destroy$.unsubscribe();
      console.log('Subscripcion1Final', sub1);
      console.log('Subscripcion2Final', sub2);
      console.log('Obs1final', obs$);
    });
  }
  comoDestruirSubscription() {
    const destroy$: Subject<void> = new Subject();
    const obs$ = of(1, 2, 3, 4).pipe(delay(5000),takeUntil(destroy$));
    this.sub = obs$.pipe().subscribe(obs);

    timer(2000).subscribe(() => {
      console.log('Subscripcion1Final',this.sub);
      console.log('Obs1final', obs$);
      destroy$.next();
      destroy$.unsubscribe();
      console.log('Subscripcion1Final',this.sub);
      console.log('Obs1final', obs$);
    });
  }
}
