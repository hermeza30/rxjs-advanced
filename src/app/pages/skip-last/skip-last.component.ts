import { Component, OnInit } from '@angular/core';
import { skipLast, take } from 'rxjs/operators';
import { interval, of, Subject } from 'rxjs';

@Component({
  selector: 'app-skip-last',
  templateUrl: './skip-last.component.html',
  styles: [
  ]
})
export class SkipLastComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // of('a','b','c','d','e','f','g','h','i').pipe(skipLast(3)).subscribe(console.log)
    interval(500).pipe(take(10),skipLast(4)).subscribe(console.log)
  }

}
