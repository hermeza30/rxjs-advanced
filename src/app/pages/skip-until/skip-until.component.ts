import { Component, OnInit } from '@angular/core';
import { interval, fromEvent, Observable } from 'rxjs';
import { skipUntil, tap } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-skip-until',
  templateUrl: './skip-until.component.html',
  styles: [
  ]
})
export class SkipUntilComponent implements OnInit {
  
  public showButton$:Observable<Event>=new Observable();
  constructor() { }

  ngOnInit(): void {
    this.showButton$=fromEvent(document.getElementById('showbutton')!,'click');
    interval(500).pipe(
    skipUntil(this.showButton$)).subscribe(obs)
  }
}
