import { Component, OnInit } from '@angular/core';
import { observable, Observable, Observer, of, Subject } from 'rxjs';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // this.observableMethodUnicast();
    this.subjectMulticast();
  }
  observableMethodUnicast(){
    let observable$=new Observable<any>(observer=>{
      observer.next(Math.random()),
      observer.next(2),
      observer.next(3),
      observer.next(4),
      observer.complete();
    });
    let observer1={
      next:(data:any)=>console.log('Ob1 '+data),
      error:(err:any)=>console.log(err),
      complete:()=>console.log('Complete Obs1')
    }
    let observer2={
      next:(data:any)=>console.log('Ob2 '+data),
      error:(err:any)=>console.log(err),
      complete:()=>console.log('Complete Obs2')
    }
    observable$.subscribe(observer1);
    observable$.subscribe(observer2);

  }
  subjectMulticast(){
    let observable$=of(Math.random(),2,3,4,5);
    let sub=new Subject<number>();

    let observer1={
      next:(data:any)=>console.log('Ob1 '+data),
      error:(err:any)=>console.log(err),
      complete:()=>console.log('Complete Obs1')
    }
    let observer2={
      next:(data:any)=>console.log('Ob2 '+data),
      error:(err:any)=>console.log(err),
      complete:()=>console.log('Complete Obs2')
    }
    let observer3={
      next:(data:any)=>console.log('Ob3 '+data),
      error:(err:any)=>console.log(err),
      complete:()=>console.log('Complete Obs3')
    }
    sub.subscribe(observer1);//Tengo observers subscripto al subject(como observable)
    sub.subscribe(observer2);
    observable$.subscribe(sub);//Aca subscribo el subject(como observer )al observable.
    //No recive valores porqe se susbcribio despues de la subscripcion al observable.
/**Lo anterior quiere decir que si hay un observer que se subscribe posteriormente
 * a la subscrpcion del subject al observable, sus emisiones posteriores se van a perder.
 */
  // sub.subscribe(observer3);  
  // sub.next(2222); 
  // observable$.subscribe(sub);//Aca subscribo el subject(como observer )al observable.

}
}
