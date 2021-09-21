import { Component, OnInit } from '@angular/core';
import { from, of, partition } from 'rxjs';
import { mergeAll, concatMap, toArray } from 'rxjs/operators';
import { obs } from 'src/app/interface';

@Component({
  selector: 'app-partition',
  templateUrl: './partition.component.html',
  styleUrls: ['./partition.component.css']
})
export class PartitionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let source$=of(1,2,3,4,5,6,7,8);
    let data=partition(source$,(value=>value%2===0));
    console.log("Data",data);
    console.log("///DATA[0]")
    data[0].subscribe(obs);
    console.log("///DATA[1]")
    data[1].subscribe(obs)
    console.log("///FROM")
    from(data).pipe(concatMap((val)=>{
      //Entra un observable

      return val.pipe(toArray())//Convierte el observable en un array de valores. Haciendo un flaten del mismo
    })).subscribe(obs)

  }

}
