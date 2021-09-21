import { Component, OnInit } from '@angular/core';
import { interval, merge, of, Observable, Observer } from 'rxjs';
import { take } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-merge',
  templateUrl: './merge.component.html',
  styleUrls: ['./merge.component.css']
})
export class MergeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let source$=interval(1000);
    let source2$=of('a','b');
    let source3$=of(100,200,300);
    let source4$=new Observable((observer)=>{
      observer.next('leela');
      observer.error("Error");//El error corta e unsubscribe el observable
    })
    merge(source$,source2$,source3$,source4$).pipe(take(10)).subscribe(obs)
  }

}
