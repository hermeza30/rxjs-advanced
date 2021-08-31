import { Observer } from "rxjs"

export const obs:Observer<any>={
    next:(val:any)=>console.log('next',val),
    error:(err:any)=>console.log('error',err),
    complete:()=>console.log('complete')
};