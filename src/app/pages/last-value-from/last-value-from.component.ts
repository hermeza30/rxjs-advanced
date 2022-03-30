import { Component, OnInit } from '@angular/core';
// import { interval, lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-last-value-from',
  templateUrl: './last-value-from.component.html',
  styleUrls: ['./last-value-from.component.css']
})
export class LastValueFromComponent implements OnInit {
  //Basicamente este operador convierte un observable en promsea
  //espera hata que el ultimo valor sea entregado y se complete el observable
  //hay que tener cuidado de que el observable se complete
  constructor() { }

  ngOnInit(): void {
  }

  async generateLastValue(){
    // await lastValueFrom()
  }
}
