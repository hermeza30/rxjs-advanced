import { Component, OnInit } from '@angular/core';
import { defer, Observable, of, timer, concat } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { tap, mergeAll } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-defer',
  templateUrl: './defer.component.html',
  styleUrls: ['./defer.component.css'],
})
export class DeferComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.pruebaConBufferYajax();
  }
  deferPrueba() {
    /**El defer solo crear el observable siempre y cuando haya una subscripcion, esto
     * quiere decir que solo ejecutara su {()=>{}} "defer" en caso de que se subscriba
     */
    let obsDef$ = defer(() => {
      if (Math.random() > 0.5) {
        return of(1, 2, 3, 4, 5);
      } else {
        return of('a', 'b', 'c');
      }
    });
    obsDef$.subscribe(obs);
  }
  pruebaConBufferYajax() {
    let observablesArray$: Observable<any>[] = [];
    let timer$ = timer(3000);

    const defer$ = defer(() => {
      const numberArray = 4;
      for (let i = 1; i < numberArray; i++) {
        observablesArray$.push(
          ajax.getJSON(`https://jsonplaceholder.typicode.com/posts/${i}`).pipe()
        );
      }
      return observablesArray$;
    });
    console.log('Que es defer', defer$);
    defer$
      .pipe(
        mergeAll(),
        tap((x) => {
          // console.log("Que viene",x)
        })
      )
      .subscribe(obs);
  }
}
