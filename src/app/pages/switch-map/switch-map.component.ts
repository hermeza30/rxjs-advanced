import { Component, OnInit } from '@angular/core';
import { interval, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { filter, switchMap, take } from 'rxjs/operators';
import { obs } from 'src/app/interface';

@Component({
  selector: 'app-switch-map',
  templateUrl: './switch-map.component.html',
  styles: [
  ]
})
export class SwitchMapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    of(1,2,3,4,5).pipe(filter(id=>id>0),switchMap(id=>ajax.getJSON(`https://jsonplaceholder.typicode.com/posts/${id}`))).subscribe(obs)

  }

}
