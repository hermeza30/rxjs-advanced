import { Component, OnInit } from '@angular/core';
import { of, Observer, Observable } from 'rxjs';
import { count, isEmpty } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-isempty',
  templateUrl: './isempty.component.html',
  styleUrls: ['./isempty.component.css'],
})
export class IsemptyComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // let source$ = of(1, 2, 3);
    // source$.pipe(isEmpty()).subscribe(obs);
    this.emptyVsCount();
  }
  emptyVsCount() {
    let source$ = new Observable((observer: Observer<number>) => {
      observer.next(1);
      observer.next(2);
      setTimeout(() => {
        observer.next(3);
        observer.complete();
      }, 4000);
    });
    source$.pipe(isEmpty()).subscribe((data) => {
      /** Este se ejecuta apenas recibe el primer valor del observeable */
      if (data) {
        console.log('Is Empty', data);
      } else {
        console.log('Is Empty', data);
      }
    });
    source$.pipe(count()).subscribe((data) => {
      /** Este se ejecuta cuando termine y se complete el observable */
      if (data) {
        console.log('Count,', data);
      } else {
        console.log('Count,', data);
      }
    });
  }
}
