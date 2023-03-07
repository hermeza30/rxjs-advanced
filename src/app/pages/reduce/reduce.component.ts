import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { map, reduce, scan, tap } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-reduce',
  templateUrl: './reduce.component.html',
  styleUrls: ['./reduce.component.css'],
})
export class ReduceComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // this.scanFunction();
    this.reduceVsScan();
  }
  scanFunction() {
    let source$ = of(1, 2, 3, 4, 5);
    source$.pipe(reduce(this.acumulador)).subscribe(obs);
  }
  acumulador(acc: any, val: any) {
    return acc + val;
  }
  reduceVsScan() {
    let source$ = of(1, 2, 3, 4, 5);
    source$
      .pipe(
        reduce(this.acumulador), //solo entrega al map el resultado final del reduce a diferencia del scan
        tap(() => console.log('tap del reduce')),
        map((v) => {
          return v * 2;
        })
      )
      .subscribe(obs);
    source$
      .pipe(
        scan(this.acumulador), //entrega al map el calculo de cada acumulador. Al scan solo entran datos de origen del observable, no toma los valores mapeados.
        tap((v) => console.log('tap del scan', v)),
        map((v) => {
          return v * 2;
        })
      )
      .subscribe(obs);
  }
}
