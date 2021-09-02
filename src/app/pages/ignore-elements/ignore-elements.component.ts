import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { ignoreElements } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-ignore-elements',
  templateUrl: './ignore-elements.component.html',
  styles: [
  ]
})
export class IgnoreElementsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    of(1,2,3,4).pipe(ignoreElements()).subscribe(obs)
  }

}
