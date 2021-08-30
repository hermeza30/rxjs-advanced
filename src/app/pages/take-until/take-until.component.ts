import { Component, OnInit, AfterViewInit } from '@angular/core';
import { fromEvent, interval, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-take-until',
  templateUrl: './take-until.component.html',
  styles: [
  ]
})
export class TakeUntilComponent implements OnInit,AfterViewInit {

  public buttonEvent:Observable<Event>=new Observable<Event>();
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.buttonEvent=fromEvent(document.getElementById('takeuntil')!,'click');
  }
  startTimer(){
      interval(500).pipe(takeUntil(this.buttonEvent)).subscribe(
        (data:any)=>{
          console.log("data",data)
        },
        (err:any)=>{console.log(err)},
        ()=>{
          console.log("Complete")
        })
  }
}
