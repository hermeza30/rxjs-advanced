import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';
import { obs } from 'src/app/interface';

@Component({
  selector: 'app-map-to',
  templateUrl: './map-to.component.html',
  styles: [
  ]
})
export class MapToComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    of('a','b','c','d','e').pipe(mapTo(':)')).subscribe(obs)
  
  }

}
