import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { obs } from '../../interface';

@Component({
  selector: 'app-replay-subject',
  templateUrl: './replay-subject.component.html',
  styleUrls: ['./replay-subject.component.css']
})
export class ReplaySubjectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.replaySubjectWithParameter();
    // this.replaySubjectWithError();
  }
  replaySubjectOutParameter(){
    let rps$=new ReplaySubject();
    rps$.next(1);
    rps$.subscribe((data)=>{
      console.log("ObserverA",data)
    });
    rps$.next(2);
    rps$.next(3);
    rps$.next(4);
    
    setTimeout(()=>{
      rps$.subscribe((data)=>{
        console.log("Obb",data)
      });
    },2000)
  }
  replaySubjectWithParameter(){
    //2 como parametro solo permitira ver el 3 y 4
    //cuanto dura storeado los oldvalues 1 segundo
    // let rps$=new ReplaySubject(2);
    let rps$=new ReplaySubject(2,1000);
    rps$.next(1);
    rps$.subscribe((data)=>{
      console.log("ObserverA",data)
    });
    rps$.next(2);
    rps$.next(3);
    rps$.next(4);
    
    setTimeout(()=>{
      rps$.next(5);
      rps$.subscribe((data)=>{
        console.log("ObsB",data)
      });
    },3000)
  }
  replaySubjectWithError(){
    let rps$=new ReplaySubject();
    rps$.next(1);
    rps$.subscribe((data)=>{
      console.log("ObserverA",data)
    });
    rps$.next(2);
    rps$.next(3);
    rps$.next(4);
    //No importa si se genera un error antes de la 2da subscripcion, emite los ultimos values
    rps$.error('Error ocurred');
    setTimeout(()=>{
      rps$.subscribe((data)=>{
        console.log("Obb",data)
      });
    },2000)
  }

}
