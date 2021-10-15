import { Component, OnInit } from '@angular/core';
import { defer, of } from 'rxjs';
import { obs } from '../../interface';

@Component({
  selector: 'app-defer',
  templateUrl: './defer.component.html',
  styleUrls: ['./defer.component.css']
})
export class DeferComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    /**El defer solo crear el observable siempre y cuando haya una subscripcion, esto
     * quiere decir que solo ejecutara su {()=>{}} "defer" en caso de que se subscriba
     */
    let obsDef$=defer(()=>{
      if(Math.random()>0.5){
        return of(1,2,3,4,5);
      }else{
        return of("a","b","c");
      }
    });
    obsDef$.subscribe(obs);
  }

}
