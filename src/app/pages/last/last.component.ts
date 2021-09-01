import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { last, tap } from 'rxjs/operators';
import { obs } from 'src/app/interface';

@Component({
  selector: 'app-last',
  templateUrl: './last.component.html',
  styles: [
  ]
})
export class LastComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    ///First pelado
  of('a','b','c','d','e').pipe(tap(v=>console.log('----Basic----')),last()).subscribe(obs)
  //Last con filtro
  of(1,2,3,4,5).pipe(tap(v=>console.log('----Una condicion----')),last(v=>v>2)).subscribe(obs)
  //LASt con filtro canbiando la salida en caso de que no se cumpla la condicion
  of(1,2,3,4,5).pipe(tap(v=>console.log('----Condicion false y retorno otro valor----')),last(v=>v>6,10)).subscribe(obs)

  }

}
