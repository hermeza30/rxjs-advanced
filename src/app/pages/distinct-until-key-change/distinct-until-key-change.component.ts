import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { distinctUntilKeyChanged } from 'rxjs/operators';
import { obs } from 'src/app/interface';

@Component({
  selector: 'app-distinct-until-key-change',
  templateUrl: './distinct-until-key-change.component.html',
  styleUrls: ['./distinct-until-key-change.component.css']
})
export class DistinctUntilKeyChangeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //////1//////
    var employe:any[]=[
      {id:1,name:'tony'},
      {id:2,name:'tony2'},
      {id:3,name:'tony2'},//drop
      {id:3,name:'tony3'},
      {id:3,name:'tony3'},//drop
      {id:3,name:'tony2'},//pass
      ]
      // from(employe).pipe(distinctUntilKeyChanged('name')).subscribe(obs)
    //////2//////
       from(employe).pipe(distinctUntilKeyChanged('name',(prev:string,curr:string)=>{
        return   prev.substr(0,4)===curr.substr(0,4)
       })).subscribe(obs)

  }

}
