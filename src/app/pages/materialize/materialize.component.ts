import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { map, materialize } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-materialize',
  templateUrl: './materialize.component.html',
  styleUrls: ['./materialize.component.css']
})
export class MaterializeComponent implements OnInit {

  constructor() { }
// Results in the following:
// - Notification {kind: "N", value: "A", error: undefined, hasValue: true}
// - Notification {kind: "N", value: "B", error: undefined, hasValue: true}
// - Notification {kind: "E", value: undefined, error: TypeError:
//   x.toUpperCase is not a function at MapSubscriber.letters.map.x
//   [as project] (http://1…, hasValue: false}
  ngOnInit(): void {
    this.conError();
  }
  comun(){
    let source$=of(1,2,3,4,5);
    source$.pipe(materialize()).subscribe(obs)
  }
  conError(){
    let source$=of(1,2,3,4,5);
    source$.pipe(map((data)=>{
        throw 'algo a salido mal'
    }),materialize()).subscribe(obs)
  }
}
