import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { endWith, mergeMap, startWith, tap } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-mergemap',
  templateUrl: './mergemap.component.html',
  styles: [
  ]
})
export class MergemapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // of(1,2,3,4,5).pipe(mergeMap((id:number)=>{
    //   return ajax.getJSON(`https://jsonplaceholder.typicode.com/posts/${id}`)
    // },1)).subscribe(obs);

    of(1,2,3,4,5).pipe(mergeMap((id:number)=>{
      return ajax.getJSON(`https://jsonplaceholder.typicode.com/posts/${id}`)
    })).subscribe(obs);
  }

}
