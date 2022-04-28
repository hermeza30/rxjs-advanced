import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
  combineLatest,
  concat,
  from,
  fromEvent,
  interval,
  Observable,
  of,
  Subject,
} from 'rxjs';
import { delay, switchMap, takeUntil, throttleTime, subscribeOn } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-take-until',
  templateUrl: './take-until.component.html',
  styles: [],
})
export class TakeUntilComponent implements OnInit, AfterViewInit {
  public buttonEvent: Observable<Event> = new Observable<Event>();
  constructor() {}

  ngOnInit(): void {
    this.memoryLeak();
  }
  ngAfterViewInit() {
    // this.buttonEvent = fromEvent(
    //   document.getElementById('takeuntil')!,
    //   'click'
    // );
  }
  startTimer() {
    interval(500)
      .pipe(takeUntil(this.buttonEvent))
      .subscribe(
        (data: any) => {
          console.log('data', data);
        },
        (err: any) => {
          console.log(err);
        },
        () => {
          console.log('Complete');
        }
      );
  }
  memoryLeak() {
    const a = of(1, 2, 3, 4).pipe(delay(5000));
    const b = of(1, 2, 3, 4).pipe(delay(6000));
    const notifier: Subject<void> = new Subject();
    const subscription= interval(1000)
      .pipe(
        takeUntil(notifier),
        switchMap((notificacion) =>{
          console.log("Notificacion",notificacion)
          return combineLatest([a, b])})//Si el takeUntil esta antes del switchMap, no va hacer que la subscripcion deje de escuchar, esto se debe a que el switchmap todavia esta devolviendo un obs
      )
      .subscribe(obs);

    setTimeout(() => {
      console.log("Subs antes",subscription)
      notifier.next();
      notifier.complete();
      console.log("Subs des",subscription)
    },3000);//Probar cambiando de 3000 a 8000 para ver si termina o no la subscripcion

    //TakeUntil refleja los valores del source Observable mientras no se notifique, una vez que se notifica, deja de emitir los valores del source
    //y completa el Observable reflejado, en este caso el observable generado por Obs$=takeUntil(notifier),es decir devuelve un observable que es reflejo del sourceObservable, pero si hay otro operador debajo del takeUntil,
    //Este no va a completar y va a dejar la subscripcion abierta. Por eso hay q tener cuidado y matar a todas las subscripciones poniendola al final.

  }
}
