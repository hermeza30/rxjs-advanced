import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, observable, Observer, interval } from 'rxjs';
import { obs } from '../../interface';

@Component({
  selector: 'app-combine-latest',
  templateUrl: './combine-latest.component.html',
  styleUrls: ['./combine-latest.component.css']
})
export class CombineLatestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    /**Este Operador es creacional-->combina multiples observables y crea uno nuevo- El cual
     * los valores son calculaods teniendo en cuenta el ultimo generado
     */

    let interval$=interval(1000);

    let source2$=new Observable((observer)=>{
      setTimeout(()=>{
        observer.next(10);
      },5000)
    })

    combineLatest([interval$,source2$]).subscribe(obs)//Se completa una vez que ambos han terminado.


  }

}
