import { Component, OnInit } from '@angular/core';
import { interval, of, Subscription, timer, Subject } from 'rxjs';
import { obs } from '../../interface';
import { concatMap, map, take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnInit {
  public subscri=new Subscription();
  public destroy$=new Subject<void>();
  constructor() {}

  ngOnInit(): void {
    // this.timerVsInterval();
   //this.subscri= timer(8000).pipe(takeUntil(this.destroy$)).subscribe(obs)
  }

  timerExample(){
    let source$ = timer(1000, 2000).pipe(take(5));
    // let source$=timer(1000,2000);//Lo convertimos en un intervalo.
    let data$ = of('a', 'b', 'c');
    source$
      .pipe(
        concatMap((data: any) => {
          return data$.pipe(
            map((d) => {
              return d + data;
            })
          );
        }),
      )
      .subscribe(obs);
  }
  timerVsInterval(){
    let interval$=interval(5000);//Emite cada 5 segundos un valor.
    let timer$=timer(5000);//Emite a los 5 segundos un valor y completa
    let timerLikeInterval$=timer(5000,5000);//Emite a los 5 segundos pero no termina
    // interval$.pipe(take(1)).subscribe(obs)
    // timer$.subscribe(obs)
    // timerLikeInterval$.subscribe(obs)//
  }
  ngOnDestroy(){
    console.log("antes",this.subscri)
    this.destroy$.next();
    this.destroy$.unsubscribe();
    console.log("despues",this.subscri)
  }

}
