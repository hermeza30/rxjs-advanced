import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { find, first } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
})
export class FindComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //diferencia con el findindex no retorna error si no se cumple predicado
    //devuelve el valor
    this.findMethod();
    this.findVsFirstMethod();
  }
  findMethod():void{
    let source$=of(1,2,3,10,5,6,20);
    source$.pipe(find((v)=>v>4)).subscribe(obs)
  }
  findVsFirstMethod():void{
    let source$=of(1,2,3,10,13,3,2,20);
    source$.pipe(first((v)=>v>20)).subscribe(obs)
    //diferencia con el find es que el first si no matchea devuelve error
  }

}
