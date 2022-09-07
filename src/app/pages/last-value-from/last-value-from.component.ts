import { Component, OnInit } from '@angular/core';
import { from, interval, lastValueFrom, take } from 'rxjs';
@Component({
  selector: 'app-last-value-from',
  templateUrl: './last-value-from.component.html',
  styleUrls: ['./last-value-from.component.css'],
})
export class LastValueFromComponent implements OnInit {
  //Basicamente este operador convierte un observable en promsea
  //espera hata que el ultimo valor sea entregado y se complete el observable
  //hay que tener cuidado de que el observable se complete
  constructor() {}

  ngOnInit(): void {
    this.generateLastValue();
  }

  async generateLastValue() {
    let interval$ = interval(1000).pipe(take(10));
    const finalNUmber = await lastValueFrom(interval$);
    console.log('Numero final:', finalNUmber);
  }
}
