import { Component, OnInit } from '@angular/core';
import { fromEvent, interval } from 'rxjs';
import {
  shareReplay,
  skipUntil,
  take,
  first,
  tap,
  share,
  map,
} from 'rxjs/operators';
import { obs } from '../../interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-share-replay',
  templateUrl: './share-replay.component.html',
  styleUrls: ['./share-replay.component.css'],
})
export class ShareReplayComponent implements OnInit {
  public interval$ = interval(2000);
  public click$ = fromEvent(document, 'click');

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    // this.solucion();
    // this.problemaPlanteado()
    // this.shareReplaySolo();
    // this.shareSolo();
    this.otroShareReplay();
  }
  problemaPlanteado() {
    /**Problema que se plantea es repetir la misma peticion varias veces, enttonces queremos hacerla una vez
     * y realizamos 2 subscibe
     */
    for (let i = 1; i <= 2; i++) {
      this.getHttp().subscribe(obs);
    }
  }
  getHttp() {
    return this.http
      .get(`https://jsonplaceholder.typicode.com/comments`)
      .pipe(tap(() => console.log('http request')));
  }
  solucion() {
    const result$ = this.getHttpSharedReplay().pipe(shareReplay());
    for (let i = 1; i <= 4; i++) {
      result$.subscribe(obs);
    }
  }

  getHttpSharedReplay() {
    return this.http
      .get(`https://jsonplaceholder.typicode.com/comments/`)
      .pipe(tap(() => console.log('http shared')));
  }
  shareReplaySolo() {
    /**Este operador permite compartir la emision de la primera susbscripcion
     * a los demas observables y ademas decirle la cantidad
     * de eventos en el buffer almacenar para compartirlo a la siguiente subscripcion
     * que se conecte a mi observable.
     * Ej emit 6 valores con shareReplay(3)
     * Obs1-  >   0-1-2-3-4-5
     * a los 10 segundos Obs2-> 3 4 5 6 7
     */
    const sharedReplay$ = interval(1000).pipe(take(6), shareReplay(3));
    sharedReplay$.subscribe((value) => {
      console.log('En la subscripcion A', value);
    });
    sharedReplay$.subscribe((value) => {
      console.log('En la subscripcion B', value);
    });
    setTimeout(() => {
      sharedReplay$.subscribe((value) => {
        console.log('en la subscripcion c', value); //a los 10 segundos comparte los valores pero sin ejecutar de nuevo el observable
      });
    }, 10000);
  }
  shareSolo() {
    const shared$ = interval(1000).pipe(
      take(10),
      map((x) => x * x),
      share()
    );
    shared$.subscribe((value) => {
      console.log('En la subscripcion A', value);
    });

    setTimeout(() => {
      shared$.subscribe((value) => {
        console.log('en la subscripcion B', value); //a los 3 segundos el observable comparte los valores generados por el observable padre.
      });
    }, 3000);
  }
  otroShareReplay() {
    console.log('Iniciando');
    const shareReplay$ = interval(1000).pipe(take(5), shareReplay(3)); //almacena 2,3,4
    shareReplay$.subscribe((v) => {
      console.log(`Obs1: ${v}`);
    });
    setTimeout(() => {
      console.log('<-----Transition----->');
      shareReplay$.pipe().subscribe((v) => {
        console.log(`Obs2: ${v}`); //Recibo 2,3,4
      });
    }, 6000); //1 segundo paso desde que se emitiron finalemnte los datos
  }
}
