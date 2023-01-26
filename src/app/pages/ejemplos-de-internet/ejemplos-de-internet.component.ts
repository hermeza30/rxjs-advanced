import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  Observable,
  combineLatest,
  startWith,
  of,
  Subject,
  interval,
} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-ejemplos-de-internet',
  templateUrl: './ejemplos-de-internet.component.html',
  styleUrls: ['./ejemplos-de-internet.component.css'],
})
export class EjemplosDeInternetComponent implements OnInit {
  public tags = new FormControl([]);
  public post$ = new Observable();
  constructor(private activateRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.autoComplete();
  }

  autoComplete() {
    this.post$ = combineLatest([
      this.tags.valueChanges.pipe(startWith([])),
      this.activateRoute.paramMap,
    ]).pipe(
      switchMap(([tags, params]) => {
        return of(JSON.stringify({ tags, page: params.get('page') }));
      })
    );
  }
}
