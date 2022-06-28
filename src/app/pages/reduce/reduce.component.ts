import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { map, reduce, scan } from 'rxjs/operators';
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
    console.log('En acumulador', acc);
    console.log('En current', val);
    return acc + val;
  }
  reduceVsScan() {
    let source$ = of(1, 2, 3, 4, 5);
    source$
      .pipe(
        reduce(this.acumulador), //solo entrega al map el resultado final del reduce a diferencia del scan
        map((v) => {
          return v * 2;
        })
      )
      .subscribe(obs);
    // source$
    //   .pipe(
    //     scan(this.acumulador), //no toma el valor del map solo toma los valores del el observable origen y va acumulando
    //     map((v) => {
    //       return v * 2;
    //     })
    //   )
    //   .subscribe(obs);
  }
}
