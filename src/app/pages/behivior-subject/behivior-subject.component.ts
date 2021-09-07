import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-behivior-subject',
  templateUrl: './behivior-subject.component.html',
  styleUrls: ['./behivior-subject.component.css']
})
export class BehiviorSubjectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // this.normalSubject();
    this.behaviorSubject();
  }
  normalSubject(){
    let subject$=new Subject();
    subject$.subscribe((data)=>{
      console.log('ObservrA  '+data)
    });
    subject$.next(1);
   
    subject$.subscribe((data)=>{
        console.log('ObsB  '+data)//Este observable pierde el valor 1
        //lo pierde porque la subscripcion se hace despues de el primer next
        //no storea la data.
      });
    
    subject$.next(2);
  }
  behaviorSubject(){
    let bs$=new BehaviorSubject(0);
    bs$.subscribe((data)=>{
      console.log('ObservrA  '+data)
    });
    bs$.next(1);
    bs$.next(2);
   
    bs$.subscribe((data)=>{
        console.log('ObsB  '+data)//Toma el ultimo valor emitido.
      });
    
    bs$.next(3);
  }

}
