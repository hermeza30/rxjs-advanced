import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { count } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.css']
})
export class CountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.contar();
    this.contar2()
  }
  contar(){
    let source$=of(1,2,3,4,5);
    source$.pipe(count()).subscribe(obs)
  }
  contar2(){
    let source$=of(1,2,3,4,5);
    source$.pipe(count((val,index)=>val%2===0)).subscribe(obs)
  }
}
