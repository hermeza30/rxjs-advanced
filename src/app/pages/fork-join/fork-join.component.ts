import { Component, OnInit } from '@angular/core';
import { forkJoin, of, Observable } from 'rxjs';
import { obs } from '../../interface';

@Component({
  selector: 'app-fork-join',
  templateUrl: './fork-join.component.html',
  styleUrls: ['./fork-join.component.css']
})
export class ForkJoinComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let source1$=of(1,2,3,4);
    let source2$=of('a','b');
    forkJoin([source1$,source2$]).subscribe(obs)
    this.retornoComoObjeto();
    this.siNuncaSeCompleta();
    this.siOcurrerUnError();
  }
  retornoComoObjeto(){
    console.log("/////Como objeto")
    let source1$=of(1,2,3,4);
    let source2$=of('a','b');
    forkJoin({source1:source1$,source2:source2$}).subscribe(obs)

  }
  siNuncaSeCompleta(){
    console.log("/////Si no se completa")
    let source1$=new Observable((observer)=>{
      observer.next(1);
      observer.next(2);
    })
    let source2$=of('a','b');
    forkJoin({source1:source1$,source2:source2$}).subscribe(obs)

  }
  siOcurrerUnError(){
    console.log("/////Si ocurre un error")
    let source1$=new Observable((observer)=>{
      observer.next(1);
      observer.next(2);
      observer.error();
    })
    let source2$=of('a','b');
    forkJoin({source1:source1$,source2:source2$}).subscribe(obs)

  }
}
