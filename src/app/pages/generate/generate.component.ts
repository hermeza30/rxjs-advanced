import { Component, OnInit } from '@angular/core';
import { generate, asyncScheduler } from 'rxjs';
import { GenerateOptions } from 'rxjs/internal/observable/generate';
import { obs } from '../../interface';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css'],
})
export class GenerateComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
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
}
