import { Component, OnInit } from '@angular/core';
import {
  combineLatest,
  Observable,
  observable,
  Observer,
  interval,
  of,
  from,
  forkJoin,
} from 'rxjs';
import { mergeMap, map, take } from 'rxjs/operators';
import { obs } from '../../interface';
import { zip } from 'rxjs';

@Component({
  selector: 'app-combine-latest',
  templateUrl: './combine-latest.component.html',
  styleUrls: ['./combine-latest.component.css'],
})
export class CombineLatestComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // this.pruebaConDosObservables();
    // this.combineLatetsConInterval();
    // this.simpleCombineLatest();
    this.combineVsForJoin();
  }

  pruebaConIntervalos() {
    /**Este Operador es creacional-->combina multiples observables y crea uno nuevo devolviendolos como un array- El cual
     * los valores son calculaods teniendo en cuenta el ultimo generado
     * ejemplo si tengo
     * of(1)
     * of('uno')
     * combineLatest(of(1),of('uno')).pipe(map(res)=>{
     * aca me retorna los dos valores del observable
     * res[0],
     * res[1]
     * }))
     */

    let interval$ = interval(1000);

    let source2$ = new Observable((observer) => {
      setTimeout(() => {
        observer.next(10);
      }, 5000);
    });

    combineLatest([interval$, source2$]).subscribe(obs); //Se completa una vez que ambos han terminado.
  }

  pruebaConDosObservables() {
    let observ1$ = of('uno');
    let observ2$ = of('2');
    let numberThre = 3;
    observ1$
      .pipe(
        mergeMap((value) => {
          return combineLatest([of(value), observ2$]);
        })
      )
      .subscribe((value) => {
        console.log('Value 0', value[0]);
        console.log('Value 1', value[1]);
      });
  }
  combineLatetsConInterval() {
    const interval$ = interval(2000);
    const obs1$ = interval$.pipe(
      map((v) => String.fromCharCode(65 + v)),
      map((l) => `Source 1- Letter : ${l}`)
    );

    const obs2$ = interval$.pipe(map((v) => `Source 2- Number: ${v}`));
    combineLatest([obs1$, obs2$]).subscribe(console.log);
  }
  simpleCombineLatest() {
    const obs1$ = from(['a', 'b', 'c']);
    const obs2$ = from([1, 2, 3]);
    combineLatest([obs1$, obs2$]).subscribe(console.log);
  }
  combineVsForJoin() {
    forkJoin([of(42), interval(1000).pipe(take(5))]).subscribe(console.log);
    combineLatest([of(42), interval(1000).pipe(take(5))]).subscribe(
      console.log
    );
  }
}
