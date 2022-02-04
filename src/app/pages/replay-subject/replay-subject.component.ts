import { Component, OnInit } from '@angular/core';
import { forkJoin, ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-replay-subject',
  templateUrl: './replay-subject.component.html',
  styleUrls: ['./replay-subject.component.css']
})
export class ReplaySubjectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
   // this.replaySubjectWithParameter();
    // this.replaySubjectWithError();
    this.replaySubjectOutParameter();
  }
  replaySubjectOutParameter(){
    let rps$=new ReplaySubject(1);
    rps$.next(1);
    rps$.subscribe((data)=>{
      console.log("ObserverA",data)
    });
    rps$.next(2);
    rps$.next(3);
    rps$.next(4);

    setTimeout(()=>{
      rps$.subscribe((data)=>{
        console.log("Obb a los 2seg",data)
      });
      //**completando el observable */
      rps$.complete();
    },2000)
    forkJoin([rps$.pipe(take(1))]).subscribe(obs)//Si el replaySubject nunca tira un complete, el forkJoin nunca va a finalizar
    //para eso hay q o poner un take 1, para que traiga y complete el observable interno,
    //eso no quiere decir que el rps original se complete. por ejemplo si pongo
    //rps$.subscribe(obs) me va a traer los ultimos valores
    //pero si yo agarro y hago un rps$.complete() ** tambien va a traer el valor
    setTimeout(()=>{
      rps$.subscribe((data)=>{
        console.log("Obb a los 3seg",data)
      });
    },4000)
  }
  replaySubjectWithParameter(){
    //2 como parametro solo permitira ver el 3 y 4 y 5
    //cuanto dura storeado los oldvalues 1 segundo
    // let rps$=new ReplaySubject(2);
    // let rps$=new ReplaySubject();
    let rps$=new ReplaySubject(2,500);//Probar con 0 1 2 3
    // let rps$=new ReplaySubject(2,1000);//Probar con 0 1 2 3
    // let rps$=new ReplaySubject(2,500);//Probar con 0 1 2 3
    // let rps$=new ReplaySubject(1);//Probar con 0 1 2 3
    // let rps$=new ReplaySubject(2);//Probar con 0 1 2 3
    rps$.next(1);
    rps$.subscribe((data)=>{
      console.log("ObserverA",data)
    },(err)=>{console.log(err)});
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
  replaySubjectWithParameter2(){
    // let rps$=new ReplaySubject();
    let rps$=new ReplaySubject();//Muestra todos los valores
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
    },(err)=>{console.log(err)});
    rps$.next(2);
    rps$.next(3);
    //No importa si se genera un error antes de la 2da subscripcion, emite los ultimos values
    rps$.error('Error ocurred');
    rps$.next(4);

    setTimeout(()=>{
      rps$.subscribe((data)=>{
        console.log("Obb",data)
      },(err)=>{console.log(err)});
    },2000)
  }

}
