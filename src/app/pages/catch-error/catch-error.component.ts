import { Component, OnInit } from '@angular/core';
import {
  EMPTY,
  Observable,
  of,
  range,
  throwError,
  zip,
  zipWith,
  timer,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  catchError,
  concatMap,
  map,
  take,
  tap,
  retry,
  mergeMap,
} from 'rxjs/operators';
import { obs } from '../../interface';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-catch-error',
  templateUrl: './catch-error.component.html',
  styleUrls: ['./catch-error.component.css'],
})
export class CatchErrorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // this.error();
    // this.errorConCatch()
    // this.errorDevolviendoInifiteLoop();
    // this.catchErrorUbication();
    // this.atrapandoErrorYRetry();
    //this.catchErrorWithEmpty()
    this.catchErrorWitchBackOffRetry();
  }

  atrapandoErrorYRetry() {
    of(1, 3, 4, 5, 2)
      .pipe(
        map((num) => {
          if (num % 2 === 0) {
            throw new Error('Valor no esperado');
          }
          return num;
        }),
        retry(3)
      )
      .subscribe(obs);
  }
  atrapandoErrorYvolverAlPrinicipio() {
    of(2, 3, 4, 5).pipe(
      map((num) => {
        if (num % 2 === 0) {
          throw new Error('Valor no esperado');
        }
        return num;
      }),
      tap((er) => {
        console.log('en tap men');
      }),
      catchError((err, caught) => {
        return caught;
      })
    );
  }

  atrapandoErroMap() {
    type Compute = (x: number) => number;
    const computeHalf: Compute = (x) => Math.floor(x / 2);
    of(2, 4, 3, 5, 6, 8)
      .pipe(
        map((num) => {
          if (num % 2 !== 0) {
            throw new Error(`Unexpected odd number:  ${num}`);
          }
          return num;
        }),
        catchError(() => of(10)),
        map(computeHalf)
      )
      .subscribe(obs);
  }
  error() {
    let source$ = new Observable((observer) => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.error('error to catch');
      observer.next(4); //No muestra el 4 y no completa el observable
    });
    source$.subscribe(obs);
  }
  errorConCatch() {
    let source$ = new Observable((observer) => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.error('error to catch');
      observer.next(4); //No muestra el 4 y Pero si completa el obsrvable
    });
    source$
      .pipe(
        catchError((error, caught) => {
          console.log('Error', error);
          console.log('caught', caught);
          return of(4, 5, 6, 7);
        })
      )
      .subscribe(obs);
  }
  errorDevolviendoInifiteLoop() {
    let source$ = new Observable((observer) => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.error('error to catch');
      observer.next(4); //No muestra el 4 y Pero si completa el obsrvable
    });
    source$
      .pipe(
        catchError((error, caught) => {
          return caught; //ejecuta de manera indefinida el observable generando un loop
        }),
        take(6)
      )
      .subscribe(obs);
  }
  catchErrorUbication() {
    const pokemonId$ = of(5, -3, 6);
    //Al capturar los errores que ocurren en un Observable interno
    //(un Observable emitido por un Observable de orden superior),
    // se debe tener cuidado a la hora de utilizar el operador catchError ya que,
    // si se coloca en el sitio equivocado, el flujo del Observable fuente no seguirá ejecutándose tras capturar el error.

    //1-A continuación, se puede ver cómo el uso incorrecto de catchError hará que, después de capturar el error que devuelve la primera petición, el flujo se completará y no se harán las otras dos peticiones restantes:
    pokemonId$
      .pipe(
        tap((id) => console.log('Pokemon', id)), //Me corta el flujo al segundo elemento
        concatMap((id) => this.getPokemonName(id)),
        catchError((error) => of(`¡Oh no, ha ocurrido un error! ${error}`))
      )
      .subscribe(obs);

    //2-Sin embargo, si se utiliza catchError en el Observable interno, el comportamiento es el que se busca: cuando falle la primera petición,
    // se capturará el error y el flujo seguirá ejecutándose, realizando las dos peticiones restantes:
    // pokemonId$
    //   .pipe(
    //     concatMap((id) =>
    //       this.getPokemonName(id).pipe(
    //         catchError((error: any) => {
    //           if (error) {
    //             return of(`¡Oh no, ha ocurrido un error! ${error}`);
    //           }
    //           return throwError(() => new Error(error));
    //         })
    //       )
    //     )
    //   )
    //   .subscribe(obs);
  }

  getPokemonName(id: number) {
    return ajax
      .getJSON(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .pipe(map((res: any) => res.name));
  }

  catchErrorWithEmpty() {
    of(1, 3, 4, 5, 2)
      .pipe(
        map((num) => {
          if (num % 2 === 0) {
            throw new Error('Valor no esperado');
          }
          return num;
        }),
        catchError(() => EMPTY), //Empty completa el observable y no permite pasar al error del tap
        tap({
          next: (v) => console.log('Next tap', v),
          error: (e) => console.log('Error', e),
        })
        // tap((q) => console.log('Tap error', q))
      )
      .subscribe(obs);
  }
  catchErrorWitchBackOffRetry() {
    const mxRetries = 3;
    const range$ = range(0, 4);
    range$
      .pipe(
        map((i) => {
          if (i % 2 === 0) {
            console.log(`pasando por map ${i}`);
            throw new Error(`Este numero es divisible por 2:${i}`);
          }
          return i;
        }),
        retry({
          count: 3,
          delay: (error, num) => {
            return timer(num * 1000).pipe(
              tap(() => console.log(`Retrying after ${num} seconds...`))
            );
            // return zip(of(error), (error) => {//Tener en cuenta que zip posee una funcion que recibe el observable de primer parametro
            //   return { num, error };
            // }).pipe(
            //   mergeMap(({ num, error }) => {
            //     return timer(num * 2000).pipe(
            //       tap(() => console.log(`Retrying after ${num} seconds...`))
            //     );
            //   })
            // );
          },
        })
      )
      .subscribe(obs);
    // of(2, 4, 5, 8, 10).pipe(
    //   map((num) => {
    //     if (num % 2 !== 0) {
    //       throw new Error(`Unexpected odd number:${num}`);
    //     }
    //     return num;
    //   }),
    //   retry({
    //     count: mxRetries,
    //     delay: (e, n) => {
    //       return range(0, mxRetries).pipe(tap(() => console.log(e, n))); //Analiszar
    //     },
    //   })
    // );
  }
}
