import { Component, OnInit } from '@angular/core';
import {  interval,  
  ConnectableObservable, } from 'rxjs';

@Component({
  selector: 'app-connectable',
  templateUrl: './connectable.component.html',
  styleUrls: ['./connectable.component.css']
})
export class ConnectableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }
  couldObservable(){
    let source$=interval(1000);
    source$.subscribe(data=>{
      console.log("Cobservable1",data)
    })
    setTimeout(()=>{
        source$.subscribe(data=>{
           console.log("Cobs2",data)
        })

    },3000);
  }
  toHotObserableUsingConnectable(){
      // let source$=connectable(interval(1000));
      // source$.subscribe((data:any)=>{
      //   console.log("Cobservable1",data)
      // })
      // setTimeout(()=>{
      //     source$.subscribe((data:any)=>{
      //        console.log("Cobs2",data)
      //     })
  
      // },3000);
      // source$.connect();
      //DEPRECATEd
  }

}
