import { Component, OnInit } from '@angular/core';
import { concat, forkJoin, interval, merge, of, Subject, take } from 'rxjs';
import { obs } from '../../interface';

@Component({
  selector: 'app-combine-obs-like-pro',
  templateUrl: './combine-obs-like-pro.component.html',
  styleUrls: ['./combine-obs-like-pro.component.css'],
})
export class CombineObsLikeProComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // this.mergeWithColdAndObs();
    this.forkJoinObs();
  }
  mergeObs() {
    const obs1 = of(1, 2, 3, 4);
    const obs2 = of(1, 2, 3, 4);
    merge(obs1, obs2).subscribe();
  }
  mergeWithColdAndObs() {
    //Podemos usar el merge con coldObservable y con hotObservable
    const coldObser = interval(1000).pipe(take(3));
    const hotObs = new Subject();
    merge(coldObser, hotObs).subscribe(obs);
    hotObs.next(10);
    hotObs.next(11);
  }
  concatObs() {
    //Concat espera a que el obs1 termine hasta que pueda comensar con el segundo observable
    const obs1 = of(1, 2, 3, 4);
    const obs2 = of(5, 6, 7, 8);
    concat(obs1, obs2).subscribe(obs);
  }

  forkJoinObs() {
    const breadcumb = of(
      'oldestBreadcrumbValue',
      'oldBreadcrumbValue',
      'newBreadcrumbValue'
    );
    const route = of('oldestURL', 'previousURL', 'currentURL');
    const combine = forkJoin([breadcumb, route]);
    combine.subscribe(obs);
  }
}
