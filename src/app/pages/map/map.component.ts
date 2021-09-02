import { Component, OnInit, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { first, map, take } from 'rxjs/operators';
import { obs } from 'src/app/interface';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styles: [
  ]
})
export class MapComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    
    const fd$=fromEvent<MouseEvent>(document.getElementById('buttonmap')!,'click').pipe(first());
    fd$.pipe(map(({x,y})=>({x,y}))).subscribe(obs)

  }

}
