import { Component, OnInit } from '@angular/core';
import { asyncScheduler, merge, of, queueScheduler } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-subscribeon',
  templateUrl: './subscribeon.component.html',
  styleUrls: ['./subscribeon.component.css'],
})
export class SubscribeonComponent implements OnInit {
  public source$ = of(1, 2, 3, 4);
  public source2$ = of(10, 20, 30, 40);
  constructor() {}

  ngOnInit(): void {
    // this.sinSubscribeOn();
    //this.conSubscribeOn();
     this.conSubscribeOnQueueSchedule()
  }

  sinSubscribeOn() {
    console.log("inicio")
    merge(this.source$, this.source2$).subscribe(obs);
    console.log("fin")
  }
  conSubscribeOn() {
    console.log('inicio');
    const otro=this.source$.pipe(subscribeOn(asyncScheduler,3000));//trata al observable de manera asincrona por lo tanto se ejecuta primero los console y despues el subscribe
    merge(this.source2$, otro).subscribe(obs);
    console.log('fin');
  }
  conSubscribeOnQueueSchedule() {
    console.log('inicio');
    const otro=this.source$.pipe(subscribeOn(queueScheduler));//trata al observable de manera sincrona por lo tanto se ejecuta primero inicio, respuesta ,fin
    merge(this.source2$, otro).subscribe(obs);
    console.log('fin');
  }
}
