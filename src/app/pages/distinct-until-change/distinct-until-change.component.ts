import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { obs } from 'src/app/interface';

@Component({
  selector: 'app-distinct-until-change',
  templateUrl: './distinct-until-change.component.html',
  styles: [
  ]
})
export class DistinctUntilChangeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    of(1,2,3,4,5,6,6,7,8,9,9,9,4,5,6).pipe(distinctUntilChanged()).subscribe(obs);//
    console.log("*************");
    of(1,2,3,4,5,6,7,8,9).pipe(distinctUntilChanged((prev,curr)=>{
      //Cuando el valor es true no deja pasar
      //Cada vez que el valor pasa prev toma el valor del current
      //prev=1 y current =2 entonces 2===1+1 es true entonces no deja pasar, es decir hace el skip del 2
      //y prev queda en 1 y current en 3
      console.log('Prev',prev);
      console.log('Curr', curr);
      console.log("comparacion",curr===prev+1)
        return curr===prev+1;
    })).subscribe(obs)

  }

}
