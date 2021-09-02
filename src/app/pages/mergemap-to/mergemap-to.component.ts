import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { mergeMapTo } from 'rxjs/operators';
import { obs } from 'src/app/interface';

@Component({
  selector: 'app-mergemap-to',
  templateUrl: './mergemap-to.component.html',
  styles: [
  ]
})
export class MergemapTOComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    of('a','b','c','d','e').pipe(mergeMapTo(ajax.getJSON(`https://jsonplaceholder.typicode.com/photos/2`))).subscribe(obs)

  }

}
