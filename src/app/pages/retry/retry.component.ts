import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-retry',
  templateUrl: './retry.component.html',
  styleUrls: ['./retry.component.css'],
})
export class RetryComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    let source$ = new Observable((observer) => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.error('error');
    });
    source$
      .pipe(
        retry(3), //{count:3, delay:2000}
        catchError((err) => {
          return of('a', 'b', 'c');
        })
      )
      .subscribe(obs); //Permite ejecutar de nuevo el observable.
  }
}
