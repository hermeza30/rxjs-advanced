import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-catch-error',
  templateUrl: './catch-error.component.html',
  styleUrls: ['./catch-error.component.css']
})
export class CatchErrorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // this.error();
    // this.errorConCatch()
    this.errorDevolviendoInifiteLoop()
  }
  error(){
    let source$=new Observable((observer)=>{
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.error('error to catch');
      observer.next(4);//No muestra el 4 y no completa el observable
    })
    source$.subscribe(obs);
  }
  errorConCatch(){
    let source$=new Observable((observer)=>{
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.error('error to catch');
      observer.next(4);//No muestra el 4 y Pero si completa el obsrvable
    })
    source$.pipe(catchError((error,caught)=>{
      console.log("Error",error);
      console.log("caught",caught);
      return of(4,5,6,7)
    })).subscribe(obs);
  }
  errorDevolviendoInifiteLoop(){
    let source$=new Observable((observer)=>{
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.error('error to catch');
      observer.next(4);//No muestra el 4 y Pero si completa el obsrvable
    })
    source$.pipe(catchError((error,caught)=>{
      return caught//ejecuta de manera indefinida el observable generando un loop
    }),take(6)).subscribe(obs);
  }
}
