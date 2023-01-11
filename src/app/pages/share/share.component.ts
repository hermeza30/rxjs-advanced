import { publishFacade } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { interval, observable, ConnectableObservable } from 'rxjs';
import { map, publish, refCount, share, take, tap } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css'],
})
export class ShareComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    /**Para convertir un Colud OBs en un Hot Observable
     * podemos usar el publish
     */
    // this.usandoPublish();//DEPRECATED
    // this.usandoPublishConRefCount()//DEPRECATED
    // this.usandoSHARE()
    this.shareDataMulsticast();
  }
  usandoPublish() {
    let source$ = interval(1000).pipe(
      publish()
    ) as ConnectableObservable<number>;

    source$.subscribe((data) => {
      console.log('Observabl1', data);
    });

    setTimeout(() => {
      source$.subscribe((data) => {
        console.log('Obs2', data);
      });
    }, 3000);
    source$.connect();
  }
  usandoPublishConRefCount() {
    let source$ = interval(1000).pipe(publish(), refCount());

    source$.subscribe((data) => {
      console.log('Observabl1', data);
    });

    setTimeout(() => {
      source$.subscribe((data) => {
        console.log('Obs2', data);
      });
    }, 3000);
  }
  usandoSHARE() {
    let source$ = interval(1000).pipe(take(10), share());

    source$.subscribe(
      (data) => {
        console.log('Observabl1', data);
      },
      () => {},
      () => {
        console.log('Completed');
      }
    );

    setTimeout(() => {
      source$.subscribe((data) => {
        console.log('Obs2', data);
      });
    }, 3000);
  }

  shareDataMulsticast() {
    //const source=interval(1000).pipe(tap(x=>console.log("procesando")),map(x=>x*x),take(6))
    const source = interval(1000).pipe(
      tap((x) => console.log('procesando')),
      map((x) => x * x),
      take(6),
      share()
    );
    source.subscribe(obs);
    setTimeout(() => {
      source.pipe(tap(() => console.log('pepe'))).subscribe(obs);
    }, 4000);
  }
}
