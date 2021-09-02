import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { single } from 'rxjs/operators';
import { obs } from 'src/app/interface';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styles: [
  ]
})
export class SingleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //Si emite un solo valor por defecto retorna la unica emision
    of(1).pipe(single()).subscribe(obs);
    console.log("-------default---------")
    of(1,2).pipe(single()).subscribe(obs);
    console.log("-------error en sequencia---------")
    of(1,2).pipe(single((v)=>v%2===0)).subscribe(obs);
    console.log("-------con predicate function---------")
    of(1,2).pipe(single((v)=>v>3)).subscribe(obs);
    console.log("-------undefined---------")
  }

}
