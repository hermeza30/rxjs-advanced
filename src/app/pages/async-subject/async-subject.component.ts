import { Component, OnInit } from '@angular/core';
import { AsyncSubject } from 'rxjs';
import { obs } from '../../interface';

@Component({
  selector: 'app-async-subject',
  templateUrl: './async-subject.component.html',
  styleUrls: ['./async-subject.component.css'],
})
export class AsyncSubjectComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // this.asyncSubjectSubscribe();
    this.probarAsynSubject();
  }
  asyncSubjectSubscribe() {
    //Emite solo el ultimo valor solo cuando se completa el observable asyncsubject
    let as$ = new AsyncSubject();
    as$.subscribe((data) => {
      console.log('ObsA', data);
    });
    as$.next(1);
    as$.next(2);
    as$.next(3);
    as$.next(4);
    as$.complete();

    setTimeout(() => {
      as$.subscribe((data) => {
        console.log('ObseB', data);
      });
    }, 3000);
  }

  promiseLike(fn: Function) {
    let subject = new AsyncSubject();
    const resolve = (x: any) => {
      subject.next(x);
      subject.complete();
    };
    let reject = (e: any) => {
      subject.error(e);
    };
    fn(resolve, reject);
    return subject.asObservable();
  }

  probarAsynSubject() {
    const randomInt = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min)) + min;
    const random$ = this.promiseLike((resolve: Function, reject: Function) => {
      resolve(randomInt(0, 1000));
    });
    random$.subscribe(obs);
    random$.subscribe(obs);
    random$.subscribe(obs);
    random$.subscribe(obs);
  }
}
