import { Component, OnInit } from '@angular/core';
import { asapScheduler, asyncScheduler, merge, of, queueScheduler } from 'rxjs';
import { obs } from '../../interface';

@Component({
  selector: 'app-schedulers',
  templateUrl: './schedulers.component.html',
  styleUrls: ['./schedulers.component.css']
})
export class SchedulersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.schedulerExample();
  }
  schedulerExample(){
    console.log("Script Starting")
    let qscheduler$=of('queuescheduler',queueScheduler)
    let asyncscheduler$=of('asyncscheduler',asyncScheduler)
    let asapscheduler$=of('asapscheduler',asapScheduler)
    merge(asyncscheduler$,asapscheduler$,qscheduler$).subscribe(obs)
    console.log("Script Ending")
  }
}
