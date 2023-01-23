import { Component, OnInit } from '@angular/core';
import { of, zip, zipWith, Observable, combineLatest } from 'rxjs';
import { obs } from '../../interface';

@Component({
  selector: 'app-zip',
  templateUrl: './zip.component.html',
  styleUrls: ['./zip.component.css'],
})
export class ZipComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // this.zipNormal();
    // this.zipRecords();
    this.combineLatestVsZip();
  }
  zipNormal() {
    let source1$ = of(1, 2, 3, 4, 5, 6); //El 6 no matchea con ninguo, nunca va a tener una salida esa emision
    let source2$ = of('a', 'b', 'c', 'e');
    let source3$ = of(100, 200, 300, 400);
    zip(source1$, source2$, source3$).subscribe(obs);
  }
  zipConFuncionModificadora() {
    //Deprecado
    let source1$ = of(1, 2, 3, 4, 5, 6); //El 6 no matchea con ninguo, nunca va a tener una salida esa emision
    let source2$ = of('a', 'b', 'c', 'e');
    let source3$ = of(100, 200, 300, 400);
    zip([source1$, source2$, source3$], (v1: any, v2: any, v3: any) => {
      return v1 + ', ' + v2 + '-' + v3;
    }).subscribe(obs);
  }
  zipRecords() {
    zip(['RecordA', 'RecordB', 'RecordC'], ['1', '2', '3']).subscribe(obs);
  }

  combineLatestVsZip() {
    /**As you can see, zip() sticks to the array definition, merges both events, and matches the corresponding indexes between the streams.
     * In this case, s1$ continues to emit more values, but because s2$ doesn’t,
     * zip() ignores them—both have to emit events.
     * On the other hand, combineLatest() just merges the latest event of s1$ with what- ever is the latest value emitted by s2$. */
    const s2$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9);
    const s1$ = of('a', 'b', 'c', 'd', 'e');
    zip(s1$, s2$).subscribe(obs);
    /**
 next (2) ['a', 1]
 next (2) ['b', 2]
 next (2) ['c', 3]
 next (2) ['d', 4]
 next (2) ['e', 5] */

    combineLatest([s1$, s2$]).subscribe(obs);
    /**Combine latets
 next (2) ['e', 1]
 next (2) ['e', 2]
 next (2) ['e', 3]
 next (2) ['e', 4]
 next (2) ['e', 5]
 next (2) ['e', 6]
 next (2) ['e', 7]
 next (2) ['e', 8]
 next (2) ['e', 9] */
  }
}
