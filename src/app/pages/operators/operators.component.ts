import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { obs } from 'src/app/interface';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css'],
})
export class OperatorsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    of(1,2,3,4,5,6,7,8,9,10).pipe(filter(v=>v%2===0),map(x=>x)).subscribe(obs)
  }
}
