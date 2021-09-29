import { Component, OnInit } from '@angular/core';
import { interval, merge } from 'rxjs';
import { map, take, mergeAll, mergeMap } from 'rxjs/operators';
import { obs } from 'src/app/interface';

@Component({
  selector: 'app-merges-components',
  templateUrl: './merges-components.component.html',
  styleUrls: ['./merges-components.component.css']
})
export class MergesComponentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // this.mergeOperator();
    // this.mergeAllOperator();
    this.mergeMapOperator();
  }
  mergeOperator(){
    let source1$ = interval(1000).pipe(map(val=>'Observable 1:'+val),take(5));
    let source2$ = interval(500).pipe(map(val=>'Obser2:'+val),take(5));
    merge(source1$,source2$).subscribe(obs)
  }
  mergeAllOperator(){
    let source1$ = interval(1000).pipe(map(val=>'Observable 1:'+val),take(5));
    let source2$ = interval(500).pipe(map(val=>'Obser2:'+val),take(5));
    // source1$.pipe(map(val=>source2$)).subscribe(obs)//Sin hacer flat
    source1$.pipe(map(val=>source2$),mergeAll()).subscribe(obs)//Obteniendo los values

  }
  mergeMapOperator(){
    let source1$ = interval(1000).pipe(map(val=>'Observable 1:'+val),take(5));
    let source2$ = interval(500).pipe(map(val=>'Obser2:'+val),take(5));
    // source1$.pipe(map(val=>source2$)).subscribe(obs)//Sin hacer flat
    source1$.pipe(mergeMap((val)=>source2$)).subscribe(obs)//Permite hacer un map y un mergeall

  }
}
