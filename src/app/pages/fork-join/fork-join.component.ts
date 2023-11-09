import { Component, OnInit } from '@angular/core';
import {
  forkJoin,
  of,
  Observable,
  timer,
  asyncScheduler,
  from,
  throwError,
  Subject,
} from 'rxjs';
import {
  take,
  debounce,
  debounceTime,
  throttle,
  throttleTime,
  observeOn,
  tap,
  catchError,
  mergeMap,
  map,
  mergeAll,
} from 'rxjs/operators';
import { obs } from '../../interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fork-join',
  templateUrl: './fork-join.component.html',
  styleUrls: ['./fork-join.component.css'],
})
export class ForkJoinComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    // this.retornoComoObjeto();
    // this.siNuncaSeCompleta();
    //this.siOcurrerUnError();
    //this.unsubscribeForkJoin();
    // this.unsubscribeTakeOneForkJoin();
    // this.unsubscribeErrorForkJoin();
    //  this.siUnObservableNoEmite();
    // this.ejecucionForkJoinAsyncObservable();
    // this.elForkJoinSeEjecutaEnParalelo();
    this.handleInnerErrors();
  }
  retornoComoObjeto() {
    console.log('/////Como objeto');
    let source1$ = of(1, 2, 3, 4);
    let source2$ = of('a', 'b');
    forkJoin({ source1: source1$, source2: source2$ }).subscribe(obs);
  }
  siNuncaSeCompleta() {
    console.log('/////Si no se completa');
    let source1$ = new Observable((observer) => {
      observer.next(1);
      observer.next(2);
    });
    let source2$ = of('a', 'b');
    forkJoin([source1$, source2$, timer(2000)]).subscribe(obs);
  }
  siOcurrerUnError() {
    console.log('/////Si ocurre un error');
    let source1$ = new Observable((observer) => {
      observer.next(1);
      observer.next(2);
      observer.error('Error');
    });
    let source2$ = of('a', 'b');

    forkJoin({ source1: source1$, source2: source2$ }).subscribe(obs);
  }
  unsubscribeForkJoin() {
    console.log('/////Unsubscribe');
    let source1$ = new Observable((observer) => {
      observer.next(1);
      observer.next(2);
    });
    let subscription = forkJoin({ source1: source1$ }).subscribe(obs);
    setTimeout(() => {
      console.log('antes de la unsubscription', subscription);
      subscription.unsubscribe();
      console.log('despues de la unsubscription', subscription);
    }, 2000);
    /** Si el observable no se completa a los 2 segundos mato la subscrpcion*/
  }
  unsubscribeTakeOneForkJoin() {
    console.log('/////Unsubscribe take1');
    let source1$ = new Observable((observer) => {
      observer.next(1);
      observer.next(2);
    }).pipe(take(1));
    let subscription = forkJoin({ source1: source1$ }).subscribe(obs);
    setTimeout(() => {
      console.log('antes de la unsubscription', subscription);
      subscription.unsubscribe();
      console.log('despues de la unsubscription', subscription);
    }, 4000);
    /** Si usamos el take(1) se completa el observable y automaticamente se unsubscribe*/
  }
  unsubscribeErrorForkJoin() {
    console.log('/////Unsubscribe error');
    let source1$ = new Observable((observer) => {
      observer.next(2);
      observer.next(3);
      observer.error('Error');
    }).pipe(take(1));
    let subscription = forkJoin({ source1: source1$ }).subscribe(obs);
    setTimeout(() => {
      console.log('antes de la unsubscription', subscription);
      subscription.unsubscribe();
      console.log('despues de la unsubscription', subscription);
    }, 4000);
    /** Si ocurre un error automaticamente se unsubscribe*/
  }
  ejecucionForkJoinAsyncObservable() {
    let source1$ = of(1, 2, 3, 4);
    let source2$ = of('a', 'b', 'c').pipe(observeOn(asyncScheduler, 5000)); //Hacemos que el observable se emita a los 5 segundos.
    forkJoin([source1$, source2$]).pipe().subscribe(obs);
  }
  siUnObservableNoEmite() {
    const uno$ = of(); //si un observable no emite datos el resultado del forkJoin tampoco emitira datos, devuelve un complete sin datos.
    const dos$ = of(1, 2, 3);
    forkJoin([uno$, dos$]).subscribe(obs);
  }
  elForkJoinSeEjecutaEnParalelo() {
    const source1$ = of(1, 2, 3);
    const source2$ = timer(6000);
    forkJoin(source1$, source2$).subscribe(obs); //No ejecuta hasta los 6 segundos
  }
  handleInnerErrors(): void {
    const array = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

    const subject = new Subject();
    const obs = subject.asObservable();

    obs
      .pipe(
        tap((value: any) => {
          if (value.id === '2') {
            console.log(value);
            throw Error('Error to process');
          }
        }),
        mergeMap((value: any) => {
          return from(value.array).pipe(
            map((item: any) => {
              return from(
                fetch(`https://reqres.in/api/users/${item.id}`).then((r) =>
                  r.json()
                )
              );
            })
          );
        }),
        mergeAll()
      )
      .subscribe(console.log);
    subject.next({ id: '1', array });
    subject.next({ id: '2', array });
    subject.next({ id: '3', array });
    subject.next({ id: '4', array });
  }
}
