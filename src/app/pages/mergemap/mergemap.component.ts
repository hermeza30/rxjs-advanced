import { Component, OnInit } from '@angular/core';
import { of, fromEvent, interval } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  endWith,
  mergeMap,
  startWith,
  tap,
  debounce,
  debounceTime,
  map,
} from 'rxjs/operators';
import { obs } from '../../interface';
import { defaultIfEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-mergemap',
  templateUrl: './mergemap.component.html',
  styles: [],
})
export class MergemapComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // of(1,2,3,4,5).pipe(mergeMap((id:number)=>{
    //   return ajax.getJSON(`https://jsonplaceholder.typicode.com/posts/${id}`)
    // },1)).subscribe(obs);

    // of(1, 2, 3, 4, 5)
    //   .pipe(
    //     mergeMap((id: number) => {
    //       return ajax.getJSON(
    //         `https://jsonplaceholder.typicode.com/posts/${id}`
    //       );
    //     })
    //   )
    //   .subscribe(obs);

    this.reactiveSearchSolution();
  }

  reactiveSearchSolution() {
    //pag 138 Rxjs In action//buscar con "qui est esse"
    let searchbox = document.getElementById('searchbox');
    let result = document.getElementById('results');
    let count = document.getElementById('count');
    if (searchbox && result && count) {
      fromEvent(searchbox, 'keyup')
        .pipe(
          map(({ target }: any) => {
            return target.value;
          }),
          debounceTime(1500),
          map((value) => {
            return 'https://jsonplaceholder.typicode.com/posts?title=' + value;
          }),
          mergeMap((value) => {
            return ajax.get(value).pipe(
              map((v) => v.response),
              defaultIfEmpty([])
            );
          })
        )
        .subscribe((n: any) => {
          count && (count.innerText = n.length);
          n.forEach((element: any) => {
            let li = document.createElement('li');
            li.innerText = element.title;
            result?.appendChild(li);
          });
        });
    }
  }
  async callApi(value: string) {
    return ajax.get('');
  }
}
