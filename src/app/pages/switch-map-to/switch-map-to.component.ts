import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { switchMapTo, take } from 'rxjs/operators';
import { obs } from 'src/app/interface';

@Component({
  selector: 'app-switch-map-to',
  templateUrl: './switch-map-to.component.html',
  styles: [
  ]
})
export class SwitchMapToComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //Que sucede¿? el inner observable se va a ejecutar cada 3ms
    //pero el SObs se va a ejecutar cada 1 segundo
    //Entonces
    //SO-ejecuta 0
    //In--genera cada 3 milisegundos un valor 0 1 2 3--vam a la salida
    //SO--ejecta 1
    //In--ve que llega un calor entonces cancela o sea mata el 4
    //In--empieza de nuevo generando 0 1 2 3 y asi...
    interval(1000).pipe(switchMapTo(interval(300)),take(10)).subscribe(obs)
    
  }

}
