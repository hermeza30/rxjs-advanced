import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { findIndex } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-findindex',
  templateUrl: './findindex.component.html',
  styleUrls: ['./findindex.component.css']
})
export class FindindexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.findIndexMethod();
  }
  findIndexMethod():void{
    let source$=of(1,2,3,4,10,5,12);
    //se completa en el primer caso que coincide con el predicado
    //en caso de no coincidir el predicado va por el error
    source$.pipe(findIndex((val)=>val>10)).subscribe(obs)
  }
}
