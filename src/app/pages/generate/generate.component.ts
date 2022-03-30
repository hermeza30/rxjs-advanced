import { Component, OnInit } from '@angular/core';
import { generate, asyncScheduler, Observable, merge, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { GenerateOptions } from 'rxjs/internal/observable/generate';
import { mergeAll, mergeMap, catchError, tap, retry } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css'],
})
export class GenerateComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {

    this.generateWithArrayObservable();
  }
  public generateNormal(){
    console.log("Start")
    let generateOption:GenerateOptions<number,number>={
      initialState:0,
      condition:x=>x<3,
      iterate:(x)=>x+1,
      resultSelector:(x)=>x
    }
    let generateOption2:GenerateOptions<string,number>={
      initialState:0,
      condition:x=>x<3,
      iterate:(x)=>x+1,
      resultSelector:(x)=>"tony "+x,
      scheduler:asyncScheduler
    }
    let source$ = generate(
      generateOption
    );
    let source2$ = generate(
      generateOption2
    );
    source$.subscribe(obs)
    source2$.subscribe(obs)
    console.log("End")
  }
  public generateWithArrayObservable():void{
    const numberArray = 4;
    let generateOption:GenerateOptions<Observable<any>,number>={
      initialState:0,
      condition:x=>x<numberArray,
      iterate:(x)=>x+1,
      resultSelector:(x)=>ajax.getJSON(`https://jsonplaceholder.typicode.com/posts/${x}`).pipe(tap(()=>{},(e)=>console.log("Fall el",e)),retry(1))
    }
    generate<Observable<any>,any>(generateOption).pipe(catchError((e)=>of(e)),mergeAll()).subscribe(obs)
  }
}
