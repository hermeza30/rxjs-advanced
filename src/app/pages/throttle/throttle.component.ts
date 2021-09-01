import { Component, OnInit } from '@angular/core';
import { fromEvent, interval, Subscription } from 'rxjs';
import { throttle } from 'rxjs/operators';
import { obs } from 'src/app/interface';

@Component({
  selector: 'app-throttle',
  templateUrl: './throttle.component.html',
  styles: [
  ]
})
export class ThrottleComponent implements OnInit {
  public s:Subscription=new Subscription();
  constructor() { }

  ngOnInit(): void {
    const keyvent$=fromEvent(document,'keypress').pipe(
      throttle(v=>interval(5000),{
        leading:true,
        trailing:true
      })
    ).subscribe(obs);
      this.s.add(keyvent$);
  }
ngOnDestroy(){
  this.s.unsubscribe();
}
}
