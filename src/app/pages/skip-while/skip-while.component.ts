import { Component, OnInit } from '@angular/core';
import { interval, of } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { obs } from 'src/app/interface';

@Component({
  selector: 'app-skip-while',
  templateUrl: './skip-while.component.html',
  styles: [
  ]
})
export class SkipWhileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // interval(500).pipe(
    //   skipWhile(x=>(x<10))
    //   ).subscribe(obs)
      of(1,2,3,4,5,1,2).pipe(
        skipWhile(x=>(x<3))
        ).subscribe(obs)
  }

}
