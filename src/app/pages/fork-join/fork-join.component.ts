import { Component, OnInit } from '@angular/core';
import { forkJoin, of, Observable, timer, asyncScheduler } from 'rxjs';
import {
  take,
  debounce,
  debounceTime,
  throttle,
  throttleTime,
  observeOn,
} from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-fork-join',
  templateUrl: './fork-join.component.html',
  styleUrls: ['./fork-join.component.css'],
})
export class ForkJoinComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // this.retornoComoObjeto();
    this.siNuncaSeCompleta();
    //this.siOcurrerUnError();
    //this.unsubscribeForkJoin();
    // this.unsubscribeTakeOneForkJoin();
    // this.unsubscribeErrorForkJoin();
    //  this.siUnObservableNoEmite();
    // this.ejecucionForkJoinAsyncObservable();
    // this.elForkJoinSeEjecutaEnParalelo();
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
}
