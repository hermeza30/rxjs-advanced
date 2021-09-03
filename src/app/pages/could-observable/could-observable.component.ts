import { Component, OnInit } from '@angular/core';
import { Observable, interval, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-could-observable',
  templateUrl: './could-observable.component.html',
  styles: [
  ]
})
export class CouldObservableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.couldObservable()
    // this.hotObservable();

  }
  couldObservable(){
    console.log("Could Observables")
    let interval$=interval(1000).pipe(take(5));

    interval$.subscribe(data=>{
      console.log("observable1",data)
    })
    setTimeout(()=>{
      interval$.subscribe(data=>{
        console.log("observable2",data)
      })
    },3000)

  }
  hotObservable(){
    let interval$=interval(1000);
    let subject$=new Subject();
    
    interval$.subscribe(subject$);
    /** */

    subject$.subscribe(data=>{
      console.log("Observer1",data)
    });
    setTimeout(()=>{

      subject$.subscribe((data)=>{
        console.log("Observe2",data)
      })

    },3000)

    
  }
}
