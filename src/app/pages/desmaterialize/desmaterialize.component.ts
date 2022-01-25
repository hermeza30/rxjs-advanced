import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { dematerialize, materialize, tap } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-desmaterialize',
  templateUrl: './desmaterialize.component.html',
  styleUrls: ['./desmaterialize.component.css']
})
export class DesmaterializeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.comun()
  }
  comun(){
    let source$=of(1,2,3,4,5);
    source$.pipe(materialize(),tap((n)=>{
      console.log("Mater",n)
    }),dematerialize()).subscribe(obs)
  }
}
