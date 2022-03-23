import { Component, OnInit } from '@angular/core';
import { fromEvent, interval } from 'rxjs';
import { shareReplay, skipUntil, take, first, tap } from 'rxjs/operators';
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
    this.problemaPlanteado()
  }
  problemaPlanteado(){
    /**Problema que se plantea es repetir la misma peticion varias veces, enttonces queremos hacerla una vez
     * y realizamos 2 subscibe
     */
    for (let i = 1; i <= 2; i++) {
      this.getHttp().subscribe(obs);
    }
  }
  getHttp() {
    return this.http.get(
      `https://jsonplaceholder.typicode.com/comments`
    ).pipe(tap(()=>console.log("http request")));
  }
  solucion(){
   const result$=this.getHttpSharedReplay().pipe(shareReplay())
   for (let i = 1; i <= 4; i++) {
    result$.subscribe(obs);
  }
  }
  getHttpSharedReplay() {
    return this.http.get(
      `https://jsonplaceholder.typicode.com/comments/`
    ).pipe(tap(()=>console.log("http shared")));
  }
}
