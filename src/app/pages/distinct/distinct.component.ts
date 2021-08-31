import { Component, OnInit } from '@angular/core';
import { from, of } from 'rxjs';
import { distinct } from 'rxjs/operators';
import { obs } from 'src/app/interface';

@Component({
  selector: 'app-distinct',
  templateUrl: './distinct.component.html',
  styles: [
  ]
})
export class DistinctComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
    // of(1,2,3,4,5,1,2,3,4).pipe(distinct()).subscribe(obs);
    
    //KeySelector
    var employe=[{id:1,name:'tony'},{id:2,name:'elias'},{id:3,name:'padre'},{id:4,name:'tony'},{id:4,name:'pepe'}]
    from(employe).pipe(distinct(x=>x.name)).subscribe(obs);
  }

}
