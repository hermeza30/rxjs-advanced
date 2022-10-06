import { Component, OnInit, AfterViewInit } from '@angular/core';
import { fromEvent, interval, Subscription, timer } from 'rxjs';
import { debounce, sample } from 'rxjs/operators';
import { obs } from 'src/app/interface';

@Component({
  selector: 'app-debounce',
  templateUrl: './debounce.component.html',
  styles: [],
})
export class DebounceComponent implements OnInit, AfterViewInit {
  public s: Subscription = new Subscription();
  constructor() {}

  ngOnInit(): void {
    const interval$ = interval(4000);
    const keyvent$ = fromEvent(document, 'keypress')
      .pipe(debounce((el) => interval$))
      .subscribe(obs);
    this.s.add(keyvent$);
  }
  ngAfterViewInit() {
    const fe$ = fromEvent(document.getElementById('button_debounce')!, 'click');

    this.s.add(fe$.pipe(debounce((value) => interval(5000))).subscribe(obs));
  }
  ngOnDestroy() {
    this.s.unsubscribe();
  }
}
