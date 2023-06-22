import { Component, OnInit } from '@angular/core';
import { Observable, Subject, map, mergeMap, take, tap, zip } from 'rxjs';
interface Order {
  amount: number;
  customId: number;
}
interface Delivery {
  order: Order;
  product: Sanguche;
}
type Sanguche = ['Pan', 'Queso', 'Jamon'];
@Component({
  selector: 'app-switch-map-vs-merge-map',
  templateUrl: './switch-map-vs-merge-map.component.html',
  styleUrls: ['./switch-map-vs-merge-map.component.css'],
})
export class SwitchMapVsMergeMapComponent implements OnInit {
  public _order$: Subject<Order> = new Subject();
  public _sanguche$: Observable<Sanguche> = new Observable();
  public delivery$: Observable<Delivery> = new Observable();
  public pan$: Subject<'Pan'> = new Subject();
  public queso$: Subject<'Queso'> = new Subject();
  public jamon$: Subject<'Jamon'> = new Subject();
  public custommerId: number = 0;
  constructor() {}

  ngOnInit(): void {
    this._sanguche$ = zip(this.pan$, this.queso$, this.jamon$).pipe(
      tap((result) => {
        console.log('Enjoy sanguche');
      })
    );
    this.delivery$ = this._order$.pipe(
      tap((order) => {
        console.log('order==>', order);
      }),
      mergeMap<Order, Observable<Delivery>>((order) => {
        return this._sanguche$.pipe(
          take(order.amount),
          map((sanguche: Sanguche) => {
            return {
              order,
              product: sanguche,
            };
          })
        );
      }),
      tap((delivery) => {
        console.log(
          `Delivery===> cliente: ${delivery.order.customId}, cantidad: ${delivery.order.amount}`
        );
      })
    );
  }

  public ordenar() {
    const randomNumber = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    this.custommerId++;
    this._order$.next({ amount: randomNumber, customId: this.custommerId });
  }
}
