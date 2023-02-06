import { Component, OnInit } from '@angular/core';
import {
  filter,
  from,
  fromEvent,
  interval,
  lastValueFrom,
  mergeMap,
  Observable,
  of,
  Subject,
  take,
  tap,
  timer,
} from 'rxjs';

import { obs } from 'src/app/interface';
import { io } from 'socket.io-client';
import * as dayjs from 'dayjs';
import moment from 'moment';
import { Observer } from 'rxjs';
import { retry } from 'rxjs/operators';
@Component({
  selector: 'app-cold-vs-hot-observables',
  templateUrl: './cold-vs-hot-observables.component.html',
  styleUrls: ['./cold-vs-hot-observables.component.css'],
})
export class ColdVsHotObservablesComponent implements OnInit {
  public socketIoClient = io('http://localhost:3000');
  constructor() {}

  ngOnInit(): void {
    // this.resubscribingStream();
  }
  resubscribingStream() {
    /**Cold observable
     * Cuando creamos un observable este es por defecto frio.
     * Cada subscripcion que se realiza al observable es nueva
     * por lo tanto emite siempre los mismos valores. para cada subscripcion
     * Volver a suscribirse a este flujo (con sub2) crearía un flujo nuevo e independiente,
     * pero no propagaría ciegamente los mismos valores de nuevo. En su lugar,
     * reinvoca la lógica para que diferentes suscriptores reciban (o no) eventos
     * en función de cuándo se suscribieron. Si la hora llega a las 22:00 antes de
     * que el suscriptor sub2 tenga la oportunidad de escuchar, no recibirá ningún evento.
     * Así que el hecho de que el observable comience a emitir eventos cuando se suscribe indica que es un observable frío.
     *  Pero debido a que tiene un efecto secundario en su código, impidiendo que reproduzca la secuencia,
     *  los resultados que ven los suscriptores sub pueden ser significativamente diferentes.

     */
    const interval$ = new Observable((observer) => {
      let i = 0;
      observer.next('Starting observable...');
      let intervalId = setInterval(() => {
        let isAfter10pm = moment().hour() >= 20;
        if (isAfter10pm) {
          clearInterval(intervalId);
          observer.complete();
        }
        observer.next(`Next: ${i++}`);
      }, 1000);
    });
    const sub1 = interval$.subscribe((val) => console.log(``));
    setTimeout(() => {
      const sub2 = interval$.subscribe((val) => console.log(`Sub2 ${val}`));
    }, 5000);
  }
  coldReplaying() {
    /**Cold Observable
     * Replaying stream
     * Cualquier observador que se subscriba a este stream recibira el mismo resultaodo
     */
    const p = new Promise((resolve, reject) => {
      setTimeout(() => {
        let isAfter10pm = moment().hour() >= 20;
        console.log(moment().hour());
        if (isAfter10pm) {
          reject(new Error('Too late!'));
        } else {
          resolve('Success!');
        }
      }, 5000);
    });
    const promises$ = from(p);
    promises$.subscribe((val) => console.log(`Sub1 ${val}`));
    promises$.subscribe((val) => console.log(`Sub2 ${val}`));
  }
  escuchandoWebSocketEvents() {
    timer(3000) //Al emitirse a los 3 segundos ya no recibo nada del socket debido a que el socket emitio antes que yo me subscribiera
      .pipe(
        mergeMap(() => {
          return fromEvent(this.socketIoClient, 'hello');
        })
      )
      .subscribe((message) => {
        console.log('Desde el cliente ', message);
      });

    // this.miHotObservable();
  }
  observableCold() {
    const interval$ = interval(400);
    interval$
      .pipe(
        filter((v) => {
          return v % 2 !== 0;
        }),
        take(5)
      )
      .subscribe(obs);
    interval$
      .pipe(
        filter((v) => v % 2 === 0),
        take(5)
      )
      .subscribe(console.log);
  }
  miHotObservable() {
    /**Cada subscription se realiza en diferentes tiempos y mi subject emite aunque no haya subscriptires presentes
     * si yo corto la fuente ambos cortan
     * pero si quiero cortar cada subscripcion por separado puedo hacerlo
     */
    const subj = new Subject<number>();
    const subObs = subj.asObservable();
    const interval$ = interval(1000).pipe(take(15));
    interval$.subscribe(subj);
    function miPrimerSubscriptor() {
      setTimeout(() => {
        subObs.pipe(take(4)).subscribe({
          next: (v) => {
            console.log('FirstObs--->' + v);
          },
          error: () => {
            console.log('Error');
          },
          complete: () => {
            console.log('Complete First');
          },
        });
      }, 2000);
    }
    function miSegundosubscriptor() {
      setTimeout(() => {
        subObs.pipe().subscribe({
          next: (v) => {
            console.log('SecondObs--->' + v);
          },
          error: () => {},
          complete: () => console.log('Complete Second'),
        });
      }, 8000);
    }
    miPrimerSubscriptor();
    miSegundosubscriptor();
  }
}
