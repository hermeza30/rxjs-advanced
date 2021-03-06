import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { last, scan } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //Se puede usar el operador Last() para obtener solamente el ultimo valor generado por el observable
    let source$=of(1,2,3,4,5);
    source$.pipe(scan(this.acumulador)).subscribe(obs)
  }
  acumulador(acc:any,val:any){
    return acc+val;
  }
}
