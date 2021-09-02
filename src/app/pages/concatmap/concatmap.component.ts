import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { concatMap, mergeMap } from 'rxjs/operators';
import { obs } from 'src/app/interface';

@Component({
  selector: 'app-concatmap',
  templateUrl: './concatmap.component.html',
  styles: [
  ]
})
export class ConcatmapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    of(1,2,3,4,5).pipe(concatMap((id:number)=>{
      return ajax.getJSON(`https://jsonplaceholder.typicode.com/posts/${id}`)
    })).subscribe(obs);
  }

}
