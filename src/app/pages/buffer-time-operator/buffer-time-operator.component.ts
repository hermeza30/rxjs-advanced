import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { interval, fromEvent, combineLatest } from 'rxjs';
import { obs } from '../../interface';
import {
  bufferTime,
  map,
  filter,
  buffer,
  take,
  tap,
  combineLatestWith,
} from 'rxjs/operators';

@Component({
  selector: 'app-buffer-time-operator',
  templateUrl: './buffer-time-operator.component.html',
  styleUrls: ['./buffer-time-operator.component.css'],
})
export class BufferTimeOperatorComponent implements OnInit, AfterViewInit {
  @ViewChild('password') password!: ElementRef<any>;
  @ViewChild('submit') submit!: ElementRef<any>;
  @ViewChild('outputfield') outputfield!: ElementRef<any>;
  constructor() {}

  ngOnInit(): void {
    // this.exampleInterval()
  }
  ngAfterViewInit() {
    const password$ = fromEvent(this.password.nativeElement, 'keyup').pipe(
      map(({ keyCode }: any) => {
        return keyCode - 48;
      }),
      filter((v) => 0 <= v && v >= 9),
      bufferTime(7000)
    );

    const submit$ = fromEvent(this.submit.nativeElement, 'click').pipe();

    password$
      .pipe(combineLatestWith(submit$))
      .pipe(take(2))
      .subscribe((v) => {
        if (v[0].join('') === '17352022') {
          console.log(v[0]);
          this.outputfield.nativeElement.value = 'passowrd correcto';
        } else {
          this.outputfield.nativeElement.value = 'passowrd incorrecto';
        }
      });
  }
  private exampleInterval() {
    interval(1000)
      .pipe(bufferTime(2000, 1000))
      .subscribe((data) => {
        console.log(data);
      });
  }
}
