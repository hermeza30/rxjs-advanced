import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-void-subject',
  templateUrl: './void-subject.component.html',
  styleUrls: ['./void-subject.component.css']
})
export class VoidSubjectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.conVoid();
  }
  sinVoid(){
    let subj$=new Subject();
    subj$.subscribe((data)=>{
      console.log("data",data)
    })
    subj$.next("hola")
    subj$.next("pepe")
  }
  conTipo(){
    let subj$=new Subject<string|number>();
    subj$.subscribe((data)=>{
      console.log("data",data)
    })
    subj$.next("hola")
    subj$.next(2)
  }
  conVoid(){
    let subj$=new Subject<void>();
    subj$.subscribe((data)=>{
      console.log("data",data)
    })
    subj$.next();
    subj$.next();
  }
}
