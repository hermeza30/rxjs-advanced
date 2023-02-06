import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap, retry, tap } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-retry',
  templateUrl: './retry.component.html',
  styleUrls: ['./retry.component.css'],
})
export class RetryComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    let source$ = new Observable((observer) => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.error('error');
    });
    source$
      .pipe(
        retry(3), //{count:3, delay:2000}
        catchError((err) => {
          return of('a', 'b', 'c');
        })
      )
      .subscribe(obs); //Permite ejecutar de nuevo el observable.
  }

  pruebaRetry() {
    /**LAS PROMESAS NO SE PUEDEN REINTENTAR
     * Caso 1: Of(promise) esto al tirar error la promise ya no se puede volver a intentar de nuevo
     * por lo que su estado es failed. Por mas que haga 3 retry solamente fallara y no reintentara.
     * Caso 2: En el segundo caso MergeMap envuelvo la prom dentro de un mergeMap lo cual
     * puedo volver a reintentar la promsa 3 veces y fallará las 3.
     */
    const prom = fetch('httpfs://jsonplaceholder.typicode.com/todos/1')
      .then((response) => response.json())
      .then((json) => console.log(json));
    //CASO 1-
    of(prom)
      .pipe(
        tap(() => console.log('INTAP')), //INTAP
        retry(3)
      )
      .subscribe(obs);
    //CASO 2
    of(1)
      .pipe(
        tap(() => console.log('INTAP')), //INTAPx3
        mergeMap(() => {
          return prom;
        }),
        retry(3)
      )
      .subscribe(obs);
  }
}
