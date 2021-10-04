import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { interval, of } from 'rxjs';
import { mergeMap, concatMap, switchMap, exhaustMap, take, filter } from 'rxjs/operators';
import { obs } from 'src/app/interface';

@Component({
  selector: 'app-switchvsmergevsexhaustvsconcat',
  templateUrl: './switchvsmergevsexhaustvsconcat.component.html',
  styleUrls: ['./switchvsmergevsexhaustvsconcat.component.css']
})
export class SwitchvsmergevsexhaustvsconcatComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    // this.mergeMap();
    // this.concatMap();
    // this.switchmap();
    this.exhaustmap();

  }
  mergeMap(){
    let podIs=of(1,2,3,4,5);
    podIs.pipe(mergeMap((id)=>{
      return this.http.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    })).subscribe((data)=>{
      console.log("MergeMap",data)
    });
  }
  concatMap(){
    let podIs=of(1,2,3,4,5);
    podIs.pipe(concatMap((id)=>{
      return this.http.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    })).subscribe((data)=>{
      console.log("ConcatMap",data)
    });
  }
  switchmap(){
    let podIs=of(1,2,3,4,5);
    podIs.pipe(switchMap((id)=>{
      return this.http.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    })).subscribe((data)=>{
      console.log("Switchmap",data)
    });
  }
  exhaustmap(){
    let podIs=interval(10).pipe(filter((val)=>val>0),take(5));
    podIs.pipe(exhaustMap((id)=>{
      return this.http.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    })).subscribe((data)=>{
      console.log("exhaustMap",data)
    });
  }
}
