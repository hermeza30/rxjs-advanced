import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { reduce } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-reduce',
  templateUrl: './reduce.component.html',
  styleUrls: ['./reduce.component.css']
})
export class ReduceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let source$=of(1,2,3,4,5);
    source$.pipe(reduce(this.acumulador)).subscribe(obs)
  }
  acumulador(acc:any,val:any){
    return acc+val;
  }

}
