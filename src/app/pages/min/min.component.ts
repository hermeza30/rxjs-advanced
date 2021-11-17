import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { max, min } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-min',
  templateUrl: './min.component.html',
  styleUrls: ['./min.component.css']
})
export class MinComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.min2();
  }
  min2() {
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
        min((pre, cur) => {
          return pre.age < cur.age ? -1 : 1;
        })
      )
      .subscribe(obs);
  }
}
