import { Component, OnInit } from '@angular/core';
import { obs } from '../../interface';
import{ajax, AjaxResponse}from 'rxjs/ajax';
import { map, tap } from 'rxjs/operators';
@Component({
  selector: 'app-ajax',
  templateUrl: './ajax.component.html',
  styles: [
  ]
})
export class AjaxComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    ajax(`https://jsonplaceholder.typicode.com/posts`).pipe(tap(v=>console.log('---------SIN JSON------'))).subscribe(obs)
    
    ajax.getJSON(`https://jsonplaceholder.typicode.com/posts`).pipe(tap(v=>console.log('---------CON GETJSON------'))).subscribe(obs)

    ajax({
      url:`https://jsonplaceholder.typicode.com/posts`,
      method:'POST',
      headers:{
        tony:'tony'
      },
      body:{
        tittle:'PRACTICA RXJS'
      }
    }).pipe(tap(v=>console.log('---------CON OBJECT------'))).subscribe(obs)

  }

}
