import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  fromEvent,
  interval,
  Observable,
  of,
  Subject,
  timer,
  ReplaySubject,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  buffer,
  tap,
  bufferCount,
  mergeAll,
  mergeMap,
  bufferToggle,
  map,
  filter,
} from 'rxjs/operators';
import { obs } from 'src/app/interface';

@Component({
  selector: 'app-buffer-operator',
  templateUrl: './buffer-operator.component.html',
  styleUrls: ['./buffer-operator.component.css'],
})
export class BufferOperatorComponent implements OnInit, AfterViewInit {
  @ViewChild('amount') amount!: ElementRef<any>;
  intervalData: number[] = [];
  showData$!: Observable<Event>;
  constructor() {}

  ngOnInit(): void {
    // this.emitBufferFiftyMs();
  }

  ngAfterViewInit() {
    this.showData$ = fromEvent(document.getElementById('showButton')!, 'click');
    this.bufferWithKeyPress();
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
  bufferWithKeyPress() {
    if (this.amount) {
      fromEvent(this.amount.nativeElement, 'keyup')
        .pipe(
          bufferCount(5),
          map((e: any) => {
            return e && e[0].target.value;
          }),
          tap(console.log),
          map((v) => parseInt(v, 10)),
          filter((v) => !Number.isNaN(v))
        )

        .subscribe(console.log);
    }
  }

  emitBufferFiftyMs() {
    /**el timer va a emitir cada 50ms
     * pero el buffer a los 500ms va a cerrarse,
     * entonces 500/50. Solo 10 elementos se van a estorears
     */
    timer(0, 50)
      .pipe(buffer(timer(500)))
      .subscribe(console.log);
  }
}
