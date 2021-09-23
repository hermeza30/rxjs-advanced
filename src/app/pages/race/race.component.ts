import { Component, OnInit } from '@angular/core';
import { interval, race } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let source1$=interval(1000).pipe(map((v)=>'fast one'+v),take(5));
    let source2$=interval(3000).pipe(tap((v)=>{
      throw Error
    }),map((v)=>'fast dos'+v));
    let source3$=interval(5000).pipe(map((v)=>'fast tres'+v));
    race([source1$,source2$,source3$]).subscribe(obs);
  }

}
