import { Component, OnInit } from '@angular/core';
import { interval, of, fromEvent, range } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  filter,
  map,
  switchAll,
  switchMap,
  take,
  tap,
  mergeAll,
} from 'rxjs/operators';
import { obs } from 'src/app/interface';

@Component({
  selector: 'app-switch-map',
  templateUrl: './switch-map.component.html',
  styles: [],
})
export class SwitchMapComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    of(1, 2, 3, 4, 5)
      .pipe(
        tap((val) => {}),
        filter((id) => id > 0),
        switchMap((id) => {
          // console.log("id",id)
          return ajax
            .getJSON(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .pipe(tap((id) => console.log));
        })
      )
      .subscribe(obs);
    this.otroEjemplo();
  }
  otroEjemplo() {
    fromEvent(document, 'click')
      .pipe(
        switchMap(() => {
          return range(1, 4);
        })
      )
      .subscribe(console.log);
  }
}
