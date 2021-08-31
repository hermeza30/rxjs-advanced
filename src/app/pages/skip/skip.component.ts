import { Component, OnInit } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { skip, take } from 'rxjs/operators';

@Component({
  selector: 'app-skip',
  templateUrl: './skip.component.html',
  styles: [
  ]
})
export class SkipComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    interval(500).pipe(take(20),skip(10)).subscribe(
      (data)=>console.log(data),
      err=>console.log(err),
      ()=>console.log("complete"))
  }

}
