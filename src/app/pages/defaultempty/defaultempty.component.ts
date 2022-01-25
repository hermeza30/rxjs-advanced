import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { defaultIfEmpty } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-defaultempty',
  templateUrl: './defaultempty.component.html',
  styleUrls: ['./defaultempty.component.css']
})
export class DefaultemptyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let source$:Observable<number>=of();
    source$.pipe(defaultIfEmpty(10)).subscribe(obs)
  }

}
