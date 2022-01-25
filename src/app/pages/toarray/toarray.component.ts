import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { toArray, take } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-toarray',
  templateUrl: './toarray.component.html',
  styleUrls: ['./toarray.component.css'],
})
export class ToarrayComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    let source$ = of(1, 2, 3, 4, 5);
    source$.pipe(take(3), toArray()).subscribe(obs);
  }
}
