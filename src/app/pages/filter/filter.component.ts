import { Component, OnInit } from '@angular/core';
import { of, fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { obs } from 'src/app/interface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styles: [
  ]
})
export class FilterComponent implements OnInit {
  public subs:Subscription=new Subscription();
  constructor() { }

  ngOnInit(): void {



    /**........... */
    let arrra=Array.from(Array(10).keys());
    of(...arrra).pipe(filter(x=>x>=3)).subscribe(obs)
    of(...arrra).pipe(filter(x=>x===50)).subscribe(obs)
    /**........... */
    this.subs=fromEvent(document,'click').pipe(filter((e:any)=>{
      return (e.target as HTMLElement).tagName==='A'
    })).subscribe(obs)
  }
ngOnDestroy(){
  this.subs.unsubscribe();
}
}
