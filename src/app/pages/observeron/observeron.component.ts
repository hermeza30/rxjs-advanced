import { Component, OnInit } from '@angular/core';
import { asyncScheduler, of } from 'rxjs';
import { map, observeOn } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-observeron',
  templateUrl: './observeron.component.html',
  styleUrls: ['./observeron.component.css'],
})
export class ObserveronComponent implements OnInit {
  public source$ = of(1, 2, 3, 4, 5);
  public source2$ = of(10, 20, 30, 40, 50);
  constructor() {}

  ngOnInit(): void {
    this.observeOnAfterMap();
  }
  observeOnAfterMap() {
    /**
     * @todo
     * despues del map hace todo asyncrono. pero antes del map todo es sincrono.
     * probar moviendo el observeOn antes del map
     * probar qu
     */
    console.log("inicio")
    this.source$.pipe(map((data)=>{
      console.log("in map")//se ejecuta 5 veces esto y despues al final trae la data
      return data;
    }),observeOn(asyncScheduler)).subscribe(obs);
    console.log("fin")
  }
  observeOnBeforeMap() {}
}
