import { Component, OnInit } from '@angular/core';
import { of, zip } from 'rxjs';
import { obs } from '../../interface';

@Component({
  selector: 'app-zip',
  templateUrl: './zip.component.html',
  styleUrls: ['./zip.component.css']
})
export class ZipComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.zipNormal();
  }
  zipNormal(){
    let source1$ = of(1,2,3,4,5,6);//El 6 no matchea con ninguo, nunca va a tener una salida esa emision
    let source2$ = of('a','b','c','e');
    let source3$ = of(100,200,300,400);
    zip(source1$,source2$,source3$).subscribe(obs);
  }
  zipConFuncionModificadora()
  {
    //Deprecado
    let source1$ = of(1,2,3,4,5,6);//El 6 no matchea con ninguo, nunca va a tener una salida esa emision
    let source2$ = of('a','b','c','e');
    let source3$ = of(100,200,300,400);
    zip([source1$,source2$,source3$],(v1:any,v2:any,v3:any)=>{
        return v1+', '+v2+'-'+v3
    }).subscribe(obs);
  }

}
