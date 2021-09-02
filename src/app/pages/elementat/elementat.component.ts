import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { elementAt } from 'rxjs/operators';

@Component({
  selector: 'app-elementat',
  templateUrl: './elementat.component.html',
  styles: [
  ]
})
export class ElementatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    of(1,2,3,4).pipe(elementAt(2,10)).subscribe(console.log)
    //Si no encuentra el valor 2 por default devuelve el 10
    //Valores negativos devuelve un error.
    console.log("DEfault Value")
    of(1,2,3,4).pipe(elementAt(6,10)).subscribe(console.log)

  }

}
