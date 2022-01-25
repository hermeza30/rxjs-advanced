import { Component, OnInit, AfterViewInit } from '@angular/core';
import { fromEvent, of, throwError } from 'rxjs';
import { filter, first, map, mergeAll, take } from 'rxjs/operators';
import { obs } from 'src/app/interface';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styles: [],
})
export class MapComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit(): void {
    this.throwErrorInMap();
  }
  ngAfterViewInit() {
    //this.functionMap();
  }
  functionMap() {
    of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
      .pipe(
        filter((v) => v % 2 === 0),
        map((x) => x)
      )
      .subscribe(obs);
    const fd$ = fromEvent<MouseEvent>(
      document.getElementById('buttonmap')!,
      'click'
    ).pipe(first());
    fd$.pipe(map(({ x, y }) => ({ x, y }))).subscribe(obs);
  }
  throwErrorInMap() {
    of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
      .pipe(
        filter((v) => v % 2 === 0),
        map((x) => throwError('la pucha que error'))
      )
      .subscribe(obs);
  }
}
