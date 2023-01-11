import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { last, map, scan, tap } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css'],
})
export class ScanComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    //Se puede usar el operador Last() para obtener solamente el ultimo valor generado por el observable
    let source$ = of(1, 2, 3, 4, 5);
    source$
      .pipe(
        tap((v) => console.log({ antesScan: v })),
        scan(this.acumulador), //A diferencia del reduce, el scan va dejando pasar los valores uno por uno al next.
        //El reducer realiza toda la operacion con todos los valores y despues deja pasar el valor al next.
        tap((v) => console.log({ antesMap: v })),
        map((v) => {
          return v * 4;
        }),
        tap((v) => console.log({ despuesMap: v }))
      )
      .subscribe(obs);
  }
  acumulador(acc: any, val: any) {
    console.log(this);
    return acc + val;
  }
}
