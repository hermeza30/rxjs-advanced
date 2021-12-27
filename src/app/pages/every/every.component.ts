import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { every } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-every',
  templateUrl: './every.component.html',
  styleUrls: ['./every.component.css']
})
export class EveryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let source$=of(1,2,3,4,5,6);
    //valida si el source observable y todos sus valores cumplen la condicion
    source$.pipe(every(v=>v>4)).subscribe(obs)
  }

}
