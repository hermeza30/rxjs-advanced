import { Component, OnInit } from '@angular/core';
import { AsyncSubject } from 'rxjs';

@Component({
  selector: 'app-async-subject',
  templateUrl: './async-subject.component.html',
  styleUrls: ['./async-subject.component.css']
})
export class AsyncSubjectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.asyncSubjectSubscribe();
  }
  asyncSubjectSubscribe(){
    //Emite solo el ultimo valor solo cuando se completa el observable asyncsubject
    let as$=new AsyncSubject();
    as$.subscribe((data)=>{
      console.log("ObsA",data)
    });
    as$.next(1);
    as$.next(2);
    as$.next(3);
    as$.next(4);
    as$.complete();

    setTimeout(()=>{
      as$.subscribe((data)=>{
        console.log("ObseB",data);
      })
    },3000)
  }

}
