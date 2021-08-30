import { Component, OnInit } from '@angular/core';
import { take, takeLast, tap } from 'rxjs/operators';
import { interval } from 'rxjs/internal/observable/interval';

@Component({
  selector: 'app-take-last',
  templateUrl: './take-last.component.html',
  styles: [
  ]
})
export class TakeLastComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    interval(1000).pipe(
    tap(console.log),
    take(10),
    takeLast(3)).subscribe(
      console.log
    )
  }

}
