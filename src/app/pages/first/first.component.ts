import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { first } from 'rxjs/operators';
import { obs } from 'src/app/interface';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styles: [
  ]
})
export class FirstComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // interval(2000).pipe(first()).subscribe(obs)
    interval(2000).pipe(first((v)=>v*2===10)).subscribe(obs)

  }

}
