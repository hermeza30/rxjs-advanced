import { Component, OnInit } from '@angular/core';
import PouchDb from 'pouchdb';
import {
  firstValueFrom,
  from,
  interval,
  map,
  of,
  race,
  tap,
  timestamp,
  fromEvent,
} from 'rxjs';
import {
  mergeMap,
  concatMap,
  bufferCount,
  buffer,
  bufferWhen,
  bufferTime,
  raceWith,
  filter,
} from 'rxjs/operators';
import { obs } from '../interface';
import { lastValueFrom } from 'rxjs';
class Transaction {
  constructor(
    private name: any,
    private type: any,
    private amount: any,
    private from: any,
    private to: any = null
  ) {
    this.name = name;
    this.type = type;
    this.amount = amount;
    this.from = from;
    this.to = to;
  }
}

class Account {
  constructor(
    public _id: string,
    public name: string,
    public type: string,
    public balance: number
  ) {
    this._id = _id;
    this.name = name;
    this.type = type;
    this.balance = balance;
  }
  get id() {
    return this._id;
  }
}

@Component({
  selector: 'app-database-react',
  templateUrl: './database-react.component.html',
  styleUrls: ['./database-react.component.css'],
})
export class DatabaseReactComponent implements OnInit {
  public db = new PouchDb('transaction');
  public db2 = new PouchDb('accounts');
  constructor() {}

  ngOnInit(): void {
    // this.populatingDataBase();
    this.generandoTransaccion();
  }
  getTranscactionArray() {
    return [
      new Transaction('brendan eich', 'withdraw', 600, 'checking'),
      new Transaction('george lucas', 'deposit', 800, 'saving'),
      new Transaction('Emmet Brown', 'transfer', 600, 'checking', 'saving'),
      new Transaction('Bjarne Stroustrup', 'transfer', 1000, 'savings', 'CD'),
    ];
  }

  populatingDataBase() {
    const tx: Transaction | null = new Transaction(
      'brendan eich',
      'withdraw',
      600,
      'checking'
    );

    from(this.getTranscactionArray())
      .pipe(
        // buffer(interval(5000)),
        bufferWhen(
          () =>
            //Almacena en el buffer hasta que
            race(interval(3000), fromEvent(window, 'beforeunload')) //ACUMULA LA CREACION DE ELEMENTOS Y SI ESCUCHA UN EVENTO INTERVAL O FROMEVENT RECIEN EMITE
        ),
        tap((x) => console.log('In tap', x)),
        mergeMap(this.writeObservable) // bufferCount(3),
      )
      .subscribe(obs);
  }
  writeObservable = (tx: Transaction[]) => {
    return of(tx).pipe(
      timestamp(),
      map((objs: any) => {
        return objs.value?.map((tx: any) => ({
          ...objs.value,
          timestamp: objs.timestamp,
        }));
      }),
      mergeMap(async (obj) => await firstValueFrom(of(this.db.bulkDocs(obj))))
    );
  };

  /**Ejemplo de Account transfer with Pouchdb */
  iniciarAccounts() {
    return [
      new Account('1', 'Emmet Brown', 'savings', 1000),
      new Account('2', 'Emmet Brown', 'checking', 2000),
      new Account('3', 'Emmet Brown', 'CD', 20000),
    ];
  }

  withDrawal$({ ...otros }: Account) {
    return from(this.db2.get(otros._id)).pipe(
      tap(console.log),
      tap((doc: any) => {
        console.log(
          doc.balance < otros.balance
            ? 'WARN:Esta operacion te dejara en la ruina'
            : 'Saldo suficiente'
        );
      }),
      mergeMap((doc: any) => {
        return from(
          this.db2.put({
            ...doc,
            _id: doc._id,
            _rev: doc._rev,
            balance: doc.balance - otros.balance,
          })
        ).pipe(
          filter((r: any) => r.ok),
          concatMap((a: any) => {
            return this.writeObservable([
              new Transaction(name, 'withdraw', otros.balance, otros.type),
            ]);
          })
        );
      })
    );
  }

  async generandoTransaccion() {
    await this.db2.bulkDocs(this.iniciarAccounts());
    this.withDrawal$(
      new Account('3', 'Emmet Brown', 'checking', 1000)
    ).subscribe(obs);
  }
}
