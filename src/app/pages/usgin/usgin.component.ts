import { Component, OnInit } from '@angular/core';
import { using, interval, tap, startWith, scan, take } from 'rxjs';
import { obs } from '../../interface';
import dayjs from 'dayjs';

class DisposableResource {
  constructor(private value: unknown, private disposed?: boolean) {
    this.value = value;
    this.disposed = false;
  }

  getValue() {
    console.log({ inValue: 'In value' });
    if (this.disposed) {
      throw new Error('Object is disposed');
    }
    return this.value;
  }
  unsubscribe() {
    console.log({ dis: this.disposed, v: this.value });
    if (!this.disposed) {
      this.disposed = true;
      this.value = null;
    }
    console.log('Disposed');
  }
}

class SessionDisposable {
  private token: unknown;
  private disposed!: boolean;

  constructor(private sessionToken: unknown) {
    this.token = sessionToken;
    this.disposed = false;
    let expire = dayjs().add(1, 'days').toDate();
    document.cookie = `session_token=${sessionToken} expires=${expire.toUTCString()}`;
    console.log(`Session created: ${this.token}`);
  }
  getToken() {
    return this.token;
  }
  unsubscribe() {
    if (!this.disposed) {
      this.disposed = true;
      this.token = null;
      document.cookie = `session_token=; expires="thu 01 jan 1970"`;
      console.log('Ended session! This Object Has been Disposed.');
    }
  }
}

@Component({
  selector: 'app-usgin',
  templateUrl: './usgin.component.html',
  styleUrls: ['./usgin.component.css'],
})
export class UsginComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // this.ejemploUsing1();
    this.ejemploUsing2();
  }

  ejemploUsing1() {
    const interval$ = interval(1000).pipe(tap(console.log));
    const using$ = using(
      () => new DisposableResource(42),
      function resourceObservable() {
        return interval$;
      }
    );

    const subscription = using$.subscribe(obs);
    setTimeout(() => {
      subscription.unsubscribe();
    }, 3000);
  }

  generateSessionToken() {
    return 'xyxyxyxy'.replace(/[xy]/g, (c) => {
      return Math.floor(Math.random() * 10).toString();
    });
  }

  ejemploUsing2() {
    const interval$ = interval(1000).pipe(
      startWith(20),
      scan((val) => {
        return val - 1;
      }),
      take(10)
    );

    const countDown$ = using(
      () => new SessionDisposable(this.generateSessionToken()),
      () => interval$
    );
    countDown$.subscribe(console.log);
  }
}
