import { Component, OnInit } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, concatMap, map, take } from 'rxjs/operators';
import { obs } from '../../interface';

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
    this.catchErrorUbication();
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
    const pokemonId$ = of(-3, 5, 6);
    //Al capturar los errores que ocurren en un Observable interno
    //(un Observable emitido por un Observable de orden superior),
    // se debe tener cuidado a la hora de utilizar el operador catchError ya que,
    // si se coloca en el sitio equivocado, el flujo del Observable fuente no seguirá ejecutándose tras capturar el error.

    //1-A continuación, se puede ver cómo el uso incorrecto de catchError hará que, después de capturar el error que devuelve la primera petición, el flujo se completará y no se harán las otras dos peticiones restantes:
    pokemonId$
      .pipe(
        concatMap((id) => this.getPokemonName(id)),
        catchError((error) => of(`¡Oh no, ha ocurrido un error! ${error}`))
      )
      .subscribe(obs);

    //2-Sin embargo, si se utiliza catchError en el Observable interno, el comportamiento es el que se busca: cuando falle la primera petición,
    // se capturará el error y el flujo seguirá ejecutándose, realizando las dos peticiones restantes:
    pokemonId$
      .pipe(
        concatMap((id) =>
          this.getPokemonName(id).pipe(
            catchError((error:any) => {
            if(error){

              return of(`¡Oh no, ha ocurrido un error! ${error}`)
            }
            return throwError(()=>new Error(error))
            })
          )
        )
      )
      .subscribe(obs);
  }

  getPokemonName(id: number) {
    return ajax
      .getJSON(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .pipe(map((res: any) => res.name));
  }
}
