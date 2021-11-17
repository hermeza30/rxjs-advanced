import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { max } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-max',
  templateUrl: './max.component.html',
  styleUrls: ['./max.component.css'],
})
export class MaxComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.max2();
  }
  max1() {
    let source$ = of(1, 2, 3, 4, 5, -1, 34);
    source$.pipe(max()).subscribe(obs);
  }
  max2() {
    let person = [
      {
        name: 'tony',
        age: 20,
      },
      {
        name: 'elias',
        age: 30,
      },
      {
        name: 'pedro',
        age: 40,
      },
      {
        name: 'salam',
        age: 10,
      },
    ];
    of(...person)
      .pipe(
        max((pre, cur) => {
          return pre.age < cur.age ? -1 : 1;
        })
      )
      .subscribe(obs);
  }
}
