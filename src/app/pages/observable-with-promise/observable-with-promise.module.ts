import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservableWithPromiseComponent } from './observable-with-promise.component';
import {
  from,
  interval,
  map,
  mergeAll,
  Observable,
  of,
  switchMap,
  take,
  tap,
  defer,
  retry,
} from 'rxjs';
import { resolve } from 'dns';
import { obs } from '../../interface';

@NgModule({
  declarations: [ObservableWithPromiseComponent],
  imports: [CommonModule],
  exports: [ObservableWithPromiseComponent],
})
export class ObservableWithPromiseModule {
  constructor() {
    // this.observableAndPromise();
    // this.usingDeferWithPromise();
    // this.usingDeferWithAsync();
    this.usandoForEach();
  }
  /**If it accepts observable, it accets promise */
  observableAndPromise() {
    type TypePromise = (ms: number) => Promise<string>;

    const source$ = interval(1000).pipe<number, number>(
      take(10),
      map((x) => x * 100)
    );

    const promiseDelay: TypePromise = (ms: number) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('done: ' + ms);
        }, ms);
      });
    };

    source$
      .pipe(
        switchMap(promiseDelay),
        tap((v) => console.log('Switch:' + v))
      )
      .subscribe();

    of(promiseDelay(100), promiseDelay(1000))
      .pipe(
        mergeAll(),
        tap((v) => console.log('Merge:' + v))
      )
      .subscribe();
  }

  /**
   * Hacer reintentable una función que devuelve una promesa con defer
Si tienes acceso a la función que crea la promesa, puedes envolverla con Observable.defer() y
 hacer un Observable que pueda ser reintentado en caso de error. */
  usingDeferWithPromise() {
    function getErrorPromise() {
      console.log('Get Error in Promise called');
      return Promise.reject(new Error('sad'));
    }
    defer(getErrorPromise).pipe(retry(3)).subscribe(obs);
  }

  /**
   *   Define an Observable with async-await using defer()
   */
  usingDeferWithAsync() {
    const promiseDelay: any = (ms: number) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('done: ' + ms);
        }, ms);
      });
    };

    defer(async function () {
      const a = await promiseDelay(100).then(() => 1);
      const b = (await a) + (await promiseDelay(1000).then(() => 2));
      const c =
        (await b) + (await a) + (await promiseDelay(3000).then(() => 8));
      return c;
    }).subscribe(console.log); // logs 12

    const usandoof = async () => {
      const a = await promiseDelay(100).then(() => 1);
      const b = (await a) + (await promiseDelay(1000).then(() => 2));
      const c =
        (await b) + (await a) + (await promiseDelay(3000).then(() => 8));
      from(Promise.all([c])).subscribe(console.log); //[12]
    };
    usandoof();
  }
  /*
  Using forEach
  Suscribirse a un Observable con forEach para crear tareas concurrentes en async-await
Esta es una característica menos utilizada de RxJS que proviene de la propuesta TC39 Observable.
 Hay más de una forma de suscribirse a un Observable. Está subscribe,
  que es la forma clásica de suscribirse a un Observable,
   y devuelve un objeto Subscription que puede utilizarse para cancelar el flujo de datos... y está forEach,
    que es una forma no cancelable de suscribirse a un Observable que toma una función por cada valor siguiente,
     y devuelve una Promise que incorpora las rutas de finalización y error para el Observable.

Traducción realizada con la versión gratuita del traductor www.DeepL.com/Translator
  */
  /**Se utiliza como un medio NO CANCELABLE de suscribirse a un observable,
  *  para su uso con APIs que esperan promesas, como async/await. No se puede cancelar la suscripción.

  ADVERTENCIA: Utilícelo sólo con observables que sepa que se completarán.
   Si el observable fuente no se completa, acabarás con una promesa colgada,
    y potencialmente todo el estado de una función asíncrona colgado en memoria.
     Para evitar esta situación, busca añadir algo como timeout , take , takeWhile , o takeUntil entre otros.

Traducción realizada con la versión gratuita del traductor www.DeepL.com/Translator */
  usandoForEach() {
    const obs$ = of([1, 2, 3, 4]);
    obs$.forEach((value: number[]) => {
      console.log({ value });
    });
  }
}
