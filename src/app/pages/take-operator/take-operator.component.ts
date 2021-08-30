import { Component, OnInit } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-take-operator',
  templateUrl: './take-operator.component.html',
  styles: [
  ]
})
export class TakeOperatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    interval(500).pipe(take(5)).subscribe((
      data)=>console.log(data),
      (err)=>console.log(err),
      ()=>{
        console.log("Compete")
      })
  }

}
