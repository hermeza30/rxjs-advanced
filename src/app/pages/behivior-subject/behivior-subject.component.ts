import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { obs } from '../../interface';

@Component({
  selector: 'app-behivior-subject',
  templateUrl: './behivior-subject.component.html',
  styleUrls: ['./behivior-subject.component.css']
})
export class BehiviorSubjectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
     //this.normalSubject();
    this.behaviorSubject();
  }
  normalSubject(){
    let subject$=new Subject();
    subject$.subscribe((data)=>{
      console.log('ObservrA  '+data)
    });
    subject$.next(1);

    subject$.subscribe((data)=>{
        console.log('ObsB  '+data)//Este observable pierde el valor 1
        //lo pierde porque la subscripcion se hace despues de el primer next
        //no storea la data.
      });

    subject$.next(2);
    setTimeout(()=>{
      subject$.subscribe((data)=>{

        console.log("Obs alos 2seg",data)//No trae nada porque el nex se hizo antes de esta subscriocion
      })
    },2000)
  }
  behaviorSubject(){
    let bs$=new BehaviorSubject(0);
    bs$.subscribe((data)=>{
      console.log('ObservrA  '+data)
    });
    bs$.next(1);
    bs$.next(2);

    bs$.subscribe((data)=>{
        console.log('ObsB  '+data)//Toma el ultimo valor emitido.
      });

    bs$.next(3);
    bs$.complete();//jugar sacando y poniendo esta linea.
    //Fijate como a los 2 segundos no trae nada si antes de una subscripcion completo el observable,
    //si yo lo saco al complete, si me va atraer datos porque no se completo el observable y mantiene el dato almacenado.
    //A diferencia de el ReplaySubject, por mas que se complete antes, si hago una subscripcion posterior, sí me va a traer el dato.
    //Curioso.
    setTimeout(()=>{
      bs$.subscribe((data)=>{

        console.log("Obs alos 2seg",data)//No trae nada porque el nex se hizo antes de esta subscriocion
      })
    },2000)
  }

}
