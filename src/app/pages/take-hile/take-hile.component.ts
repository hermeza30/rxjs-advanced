import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-take-hile',
  templateUrl: './take-hile.component.html',
  styles: [
  ]
})
export class TakeHileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    interval(500).pipe(takeWhile(x=>x<5,true)).subscribe((data)=>{
      console.log(data);
    },(err)=>{
      console.log("Err",err)
    },()=>{
      console.log("complete")
    })
  }

}
