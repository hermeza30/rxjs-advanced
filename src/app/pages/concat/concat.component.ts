import { Component, OnInit } from '@angular/core';
import { concat, of, Observable, forkJoin } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { mergeAll, delay } from 'rxjs/operators';
import { obs } from 'src/app/interface';

@Component({
  selector: 'app-concat',
  templateUrl: './concat.component.html',
  styleUrls: ['./concat.component.css'],
})
export class ConcatComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    //this.forkJoinVsConcat()
    // this.quePasaSiUnObservableNoSeCompleta();
    // this.completandoElObservable();
    // this.otraFormaConConcat();
  }
  forkJoinVsConcat() {
    //Array vs ForkJoin
    let source1$ = of(1, 2, 3, 4).pipe(delay(3000));
    let source2$ = of('a', 'b', 'c', 'd');
    let source3$ = of({ name: 'pepe' });
    concat(source1$, source2$, source3$).subscribe(obs); //Se concatenan los observable- Uno termina y el otro continua despues
    forkJoin([source1$, source2$, source3$]).subscribe(obs);
  }

  quePasaSiUnObservableNoSeCompleta() {
    console.log('/////NoCompleteObservable///////');
    let source3$ = new Observable((observer) => {
      observer.next(1);
      observer.next(2);
    });
    let source4$ = of('a', 'b', 'c');
    concat(source3$, source4$).subscribe(obs);
  }
  completandoElObservable() {
    console.log('/////Si se completa///////');
    let source3$ = new Observable((observer) => {
      observer.next(1);
      observer.next(2);
      setTimeout(() => {
        observer.complete();
      }, 3000);
    });
    let source4$ = of('a', 'b', 'c');
    concat(source3$, source4$).subscribe(obs);
  }
  otraFormaConConcat() {
    const numberArray = 4;
    let observablesArray$: Observable<any>[] = [];
    for (let i = 1; i < numberArray; i++) {
      observablesArray$.push(
        ajax.getJSON(`https://jsonplaceholder.typicode.com/posts/${i}`).pipe()
      );
    }
    concat(observablesArray$).pipe(mergeAll()).subscribe(obs);
  }
}
