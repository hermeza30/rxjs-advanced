import { Component, OnInit } from '@angular/core';
import { of, withLatestFrom, combineLatest } from 'rxjs';
import { obs } from '../../interface';

@Component({
  selector: 'app-with-latest-form',
  templateUrl: './with-latest-form.component.html',
  styleUrls: ['./with-latest-form.component.css'],
})
export class WithLatestFormComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.simpleWithlastForm();
    this.withlastFormVsCombine();
  }
  simpleWithlastForm() {
    const obs$1 = of(1, 2, 3, 4);
    const obs$2 = of('a', 'b', 'c');
    obs$1.pipe(withLatestFrom(obs$2)).subscribe(obs);
    /**Este operador combina el ultimo elemento emitido por el innerObservable con el evento emitido
     * del source observable
     */
    /**
 next (2) [1, 'c']
 next (2) [2, 'c']
 next (2) [3, 'c']
 next (2) [4, 'c'] */
  }
  withlastFormVsCombine() {
    const obs$1 = of(1, 2, 3, 4);
    const obs$2 = of('a', 'b', 'c');
    combineLatest([obs$1, obs$2]).subscribe(obs);
    /**
      next (2) [4, 'a']
      next (2) [4, 'b']
      next (2) [4, 'c'] */
  }
}
