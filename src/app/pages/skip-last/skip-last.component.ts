import { Component, OnInit } from '@angular/core';
import { skipLast, take } from 'rxjs/operators';
import { interval, of, Subject, timer } from 'rxjs';

@Component({
  selector: 'app-skip-last',
  templateUrl: './skip-last.component.html',
  styles: [],
})
export class SkipLastComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // of('a','b','c','d','e','f','g','h','i').pipe(skipLast(3)).subscribe(console.log)
    of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
      .pipe(take(10), skipLast(3)) //Elimina o hace un skip de los ultimo 3 elementos
      .subscribe(console.log);
  }
}
