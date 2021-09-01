import { Component, OnInit } from '@angular/core';
import { fromEventPattern, fromEvent, interval, Subscription } from 'rxjs';
import { sample } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styles: [
  ]
})
export class SampleComponent implements OnInit {
  public s:Subscription=new Subscription();
  constructor() { }

  ngOnInit(): void {
    const interval$=interval(4000);
    const keyvent$=fromEvent(document,'keypress').pipe(
      sample(interval$)
    ).subscribe(obs);
      this.s.add(keyvent$);
  }
ngOnDestroy(){
  this.s.unsubscribe();
}
    

}
