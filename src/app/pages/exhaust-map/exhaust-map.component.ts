import { Component, OnInit } from '@angular/core';
import { interval, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { exhaustMap, filter, take, tap } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-exhaust-map',
  templateUrl: './exhaust-map.component.html',
  styles: [
  ]
})
export class ExhaustMapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //IGNORA EL 2,3,4,5 porque el 1 tardo bastante tiempo en completarse
    // of(1,2,3,4,5).pipe(tap(console.log),exhaustMap(id=>ajax.getJSON(`https://jsonplaceholder.typicode.com/users/${id}`))).subscribe(obs)
    //
    interval(20).pipe(filter(id=>id>0),exhaustMap(id=>ajax.getJSON(`https://jsonplaceholder.typicode.com/posts/${id}`)),take(5)).subscribe(obs)

  }

}
