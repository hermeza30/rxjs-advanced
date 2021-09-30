import { Component, OnInit } from '@angular/core';
import { concat, interval, of } from 'rxjs';
import { obs } from '../../interface';
import { concatAll, concatMap, map, take } from 'rxjs/operators';

@Component({
  selector: 'app-concat-component',
  templateUrl: './concat-component.component.html',
  styleUrls: ['./concat-component.component.css']
})
export class ConcatComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.concatOperator();
    console.log("============")
    // this.concatAllOperator()
    console.log("============")
    this.concatMapOperator()
  }
  concatOperator(){
    let source1$=of('1','2','3');
    let source2$=of('4','5','6');
    concat(source1$,source2$).subscribe(obs)
  }
  concatAllOperator(){
    let source1$ = interval(1000).pipe(map(val=>'Observable 1:'+val),take(3));
    let source2$ = interval(500).pipe(map(val=>'Obser2:'+val),take(5));
    // source1$.pipe(map(val=>source2$)).subscribe(obs)//Sin hacer flat
    source1$.pipe(map(val=>source2$),concatAll()).subscribe(obs)//viene el 0 y entra al observable source2.--->se ejecuta totalmente y pasa al 1.
    //Es por eso que se ejecuta 3 veces * 5 valores
  }
  concatMapOperator(){
    let source1$ = interval(1000).pipe(map(val=>'Observable 1:'+val),take(3));
    let source2$ = interval(500).pipe(map(val=>'Obser2:'+val),take(5));
    // source1$.pipe(map(val=>source2$)).subscribe(obs)//Sin hacer flat
    source1$.pipe(concatMap(val=>source2$)).subscribe(obs)//viene el 0 y entra al observable source2.--->se ejecuta totalmente y pasa al 1.
    //Es por eso que se ejecuta 3 veces * 5 valores
  }

}
