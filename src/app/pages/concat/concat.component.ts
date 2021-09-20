import { Component, OnInit } from '@angular/core';
import { concat, of, Observable } from 'rxjs';
import { obs } from 'src/app/interface';

@Component({
  selector: 'app-concat',
  templateUrl: './concat.component.html',
  styleUrls: ['./concat.component.css']
})
export class ConcatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let source1$=of(1,2,3,4);
    let source2$=of('a','b','c','d');
    concat(source1$,source2$).subscribe(obs);//Se concatenan los observable- Uno termina y el otro continua despues
    this.quePasaSiUnObservableNoSeCompleta()
    this.completandoElObservable()
  }
 quePasaSiUnObservableNoSeCompleta(){
   console.log("/////NoCompleteObservable///////")
    let source3$=new Observable((observer)=>{
      observer.next(1);
      observer.next(2);
    });
    let source4$=of('a','b','c');
    concat(source3$,source4$).subscribe(obs)
 }
 completandoElObservable(){
  console.log("/////Si se completa///////")
   let source3$=new Observable((observer)=>{
     observer.next(1);
     observer.next(2);
     setTimeout(()=>{
      observer.complete();
     },3000)
   });
   let source4$=of('a','b','c');
   concat(source3$,source4$).subscribe(obs)
}
}
