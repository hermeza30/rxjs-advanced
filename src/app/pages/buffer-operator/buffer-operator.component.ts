import { AfterViewInit, Component, OnInit } from '@angular/core';
import { fromEvent, interval, Observable, of, Subject, timer, ReplaySubject } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { buffer, tap, bufferCount, mergeAll, mergeMap, bufferToggle } from 'rxjs/operators';
import { obs } from 'src/app/interface';

@Component({
  selector: 'app-buffer-operator',
  templateUrl: './buffer-operator.component.html',
  styleUrls: ['./buffer-operator.component.css'],
})
export class BufferOperatorComponent implements OnInit, AfterViewInit {
  intervalData: number[] = [];
  showData$!: Observable<Event>;

  constructor() {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.showData$ = fromEvent(document.getElementById('showButton')!, 'click');
  }

  startInterval() {
    interval(1000)
      .pipe(
        tap((data) => console.log(data)),
        buffer(this.showData$)
      )
      .subscribe((data: number[]) => {
        this.intervalData.push(...data);
      });
  }
}
