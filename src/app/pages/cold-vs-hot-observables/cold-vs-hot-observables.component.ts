import { Component, OnInit } from '@angular/core';
import { filter, interval, Subject, take, tap } from 'rxjs';

import { obs } from 'src/app/interface';
import { io } from 'socket.io-client';
@Component({
  selector: 'app-cold-vs-hot-observables',
  templateUrl: './cold-vs-hot-observables.component.html',
  styleUrls: ['./cold-vs-hot-observables.component.css'],
})
export class ColdVsHotObservablesComponent implements OnInit {
  public socketIoClient = io('http://localhost:3000');
  constructor() {}

  ngOnInit(): void {
    this.miHotObservable();
  }
  observableCold() {
    const interval$ = interval(400);
    interval$
      .pipe(
        filter((v) => {
          return v % 2 !== 0;
        }),
        take(5)
      )
      .subscribe(obs);
    interval$
      .pipe(
        filter((v) => v % 2 === 0),
        take(5)
      )
      .subscribe(console.log);
  }
  miHotObservable() {
    /**Cada subscription se realiza en diferentes tiempos y mi subject emite aunque no haya subscriptires presentes
     * si yo corto la fuente ambos cortan
     * pero si quiero cortar cada subscripcion por separado puedo hacerlo
     */
    const subj = new Subject<number>();
    const subObs = subj.asObservable();
    const interval$ = interval(1000).pipe(take(15));
    interval$.subscribe(subj);
    function miPrimerSubscriptor() {
      setTimeout(() => {
        subObs.pipe(take(4)).subscribe({
          next: (v) => {
            console.log('FirstObs--->' + v);
          },
          error: () => {
            console.log('Error');
          },
          complete: () => {
            console.log('Complete First');
          },
        });
      }, 2000);
    }
    function miSegundosubscriptor() {
      setTimeout(() => {
        subObs.pipe().subscribe({
          next: (v) => {
            console.log('SecondObs--->' + v);
          },
          error: () => {},
          complete: () => console.log('Complete Second'),
        });
      }, 8000);
    }
    miPrimerSubscriptor();
    miSegundosubscriptor();
  }
}
