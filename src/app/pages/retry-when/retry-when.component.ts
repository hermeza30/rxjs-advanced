import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { delay, retryWhen, tap } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-retry-when',
  templateUrl: './retry-when.component.html',
  styleUrls: ['./retry-when.component.css']
})
export class RetryWhenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //Hlanding Error
    //Retrywhen sirve para catchear errores y en caso de que ocurra uno hacer un retry.

    let userData={
      responseStatus:'500',
      users:[
        {id:1,name:'tony'},
        {id:2,name:'tony2'}
      ]
    }

    of(...userData.users).pipe(delay(1000),tap((user)=>{
      console.log('user')
      if(!userData.responseStatus.startsWith('2')){
        throw  userData.responseStatus;//Retorna 500
      }

    }),retryWhen((error)=>{
      return error.pipe(tap((status:any)=>{
        console.log("Status",status);
        if(!status.startsWith('5')){//Sigue loopeando hasta que se cumple la condiciongit
          throw 'ok';
        }
        console.log("Retrying")
      }))
    })).subscribe(obs)


    setTimeout(()=>{
      userData.responseStatus='200';
    },5000)

  }

}
