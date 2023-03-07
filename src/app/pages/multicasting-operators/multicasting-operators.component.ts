import { Component, OnInit } from '@angular/core';
import { interval, take, tap, Subject } from 'rxjs';
import {
  map,
  publishReplay,
  refCount,
  share,
  shareReplay,
} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-multicasting-operators',
  templateUrl: './multicasting-operators.component.html',
  styleUrls: ['./multicasting-operators.component.css'],
})
export class MulticastingOperatorsComponent implements OnInit {
  public obsv = this.getData();
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.usingSharOperator();
    // this.usingShareWithHttp();
    // this.usingShareReplay();
    // this.usingPublishReplay();
    // this.diferenciaShareReplayVsPublish();
    this.usingSubject();
  }
  /**HOt using share operator */
  usingSharOperator() {
    /**Problem una subscripcion aparte para cada subscriber */
    // const obs = interval(2000).pipe(
    //   take(2),
    //   tap(() => console.log('observble executing'))
    // );

    // obs.subscribe((x) => {
    //   console.log('Subscriber A', x);
    // });

    // obs.subscribe((x) => {
    //   console.log('Subscriber B', x);
    // });

    // obs.subscribe((x) => {
    //   console.log('Subscriber C', x);
    // });
    /**Solution
     *
     * El operador Share crea internamente un Subject que se suscribe a la fuente observable
     * y los observadores se suscriben al Subject.Cuando se emite un valor, el Subject notifica el valor a todos sus suscriptores.
     * El operador devuelve un observable caliente y mientras haya al menos un suscriptor este observable estará suscrito y emitiendo datos. Cuando todos los suscriptores se hayan dado de baja se dará de baja del Observable fuente.

    Share operator is same as using publish()+refCount() with a small difference.

      Compartir operador es lo mismo que utilizar publish()+refCount() con una pequeña diferencia.
      =>Si el observable se completa, en caso de que haya nuevos suscriptores la función publish()+refCount()
      emitirá sólo notificaciones completas a los nuevos suscriptores, mientras que la función share() se
      resuscribirá a la fuente del observable utilizando un nuevo Subject y ejecutará el observable de nuevo.

=>Si el observable no se completa, en caso de que haya nuevos suscriptores tanto publish()+refCount()
como share() se resuscribirán a la fuente del observable utilizando un nuevo Subject y ejecutarán el observable de nuevo.
     */

    const obs = interval(1000).pipe(
      take(2),
      tap(() => console.log('observble executing')),
      share()
    );
    obs.subscribe((x) => console.log('A' + x));
    setTimeout(() => {
      console.log('After 1 second');
      obs.subscribe((x) => {
        console.log('Subscriber B', x);
      });
    }, 1000);

    setTimeout(() => {
      console.log('After 2 second');
      obs.subscribe((x) => {
        console.log('Subscriber C', x);
      });
    }, 2000);

    setTimeout(() => {
      console.log('After 3 second');
      obs.subscribe((x) => {
        console.log('Subscriber D', x);
      });
    }, 3000);
  }

  usingShareWithHttp() {
    /**Ahora vamos a tomar un
     *  ejemplo real de cómo podemos evitar múltiples peticiones
     *  http cuando 2 componentes angulares están suscritos para recibir los mismos datos. */
    /**
     * Este tipo de arreglo no es necesario si el método solo se llama una vez y el observable
     *  devuelto se suscribe varias veces en un componente.

Pero en nuestro ejemplo, necesitaríamos acceder al
 observable desde 2 componentes diferentes. Cada vez que llamo al método, estoy creando un nuevo observable que activará una nueva solicitud http.

En cambio, me gustaría ejecutar el método una vez y almacenar el observable caliente devuelto en obsv.
El valor emitido por el observable se compartirá con los suscriptores a través del operador compartido.
     *
     */
    /**Tanto observador1 como observador 2 comparten la request http generada una sola vez. */
    const observador1 = this.obsv.subscribe((x) => console.log(x));
    const observador2 = this.obsv.subscribe((x) => console.log(x));
  }
  getData() {
    return this.http.get('https://jsonplaceholder.typicode.com/todos').pipe(
      tap(() => console.log('Executing')),
      share()
    );
  }

  usingShareReplay() {
    /**shareReplay() usa internamente ReplaySubject para hacer un hot observable y es útil si desea que los
     * suscriptores tardíos reciban los valores emitidos anteriormente.
     *  Si no se proporciona ningún argumento, el operador reproducirá todos los valores emitidos previamente a los suscriptores tardíos. */
    const obs = interval(1000).pipe(
      take(2),
      tap(() => console.log('observble executing')),
      shareReplay() //Esto hace que pueda escuchar storear valores y compartirlos a nuevos subscriptiores
    );
    obs.subscribe((x) => console.log('A ' + x));
    setTimeout(() => {
      console.log('After 1 second');
      obs.subscribe((x) => {
        console.log('B ', x);
      });
    }, 1000);

    setTimeout(() => {
      console.log('After 2 second');
      obs.subscribe((x) => {
        console.log('C ', x);
      });
    }, 2000);

    setTimeout(() => {
      console.log('After 5 second');
      obs.subscribe((x) => {
        console.log('D ', x);
      });
    }, 5000);
  }
  usingPublishReplay() {
    /**Antes de proceder con los 3 operadores restantes es necesario saber ¿por qué necesitamos refCount?

Sin un refCount en uso, los operadores publish,publishLast,publishBehavior y publishReplay devolverán un ConnectableObservable
que no emitirá ningún valor a menos que se llame a connect() sobre él.
Para automatizar este proceso, hemos añadido un refCount que hará que el ConnectableObservable parezca un observable ordinario.

refCount cuenta el número de suscripciones al observable y se suscribe
(sólo una vez) a la fuente llamando a connect() si el número de suscripciones es mayor que 0.
 Si el número de suscripciones es menor que 1, se desuscribe de la fuente. */

    /**publishReplay utiliza internamente ReplaySubject para hacer el observable caliente.
 * Este sujeto se suscribe a la fuente observable fría. Los observadores se suscriben a este sujeto interno que
 * les notifica cualquier valor emitido desde la fuente.

Un ReplaySubject retransmite el número especificado de valores a
los suscriptores tardíos. Si no se proporciona ningún valor como argumento, transmite todos los valores a los suscriptores tardíos. */

    const sharedobsv = interval(1000).pipe(
      take(2),
      tap((x) => console.log('executing! Value emitted: ' + x)),
      publishReplay(2),
      refCount()
    );
    sharedobsv.subscribe((x) => console.log('A ' + x));
    setTimeout(() => {
      console.log('after 1 secs');
      sharedobsv.subscribe((x) => console.log('B ' + x));
    }, 1000);
    setTimeout(() => {
      console.log('after 2 secs');
      sharedobsv.subscribe((x) => console.log('C ' + x));
    }, 2000);
    setTimeout(() => {
      console.log('after 4 secs');
      sharedobsv.subscribe((x) => console.log('D ' + x));
    }, 4000);
  }
  diferenciaShareReplayVsPublish() {
    /**Como puedes ver, ambos suscriptores se han dado de baja del observable cuando éste emite el valor 2.
     * Incluso después de eso, el RelaySubject interno sigue suscrito a la fuente observable y el observable continúa
     * emitiendo los valores 3 y 4. Incluso después de eso,
     * el RelaySubject interno permanece suscrito a la fuente observable y el observable continúa emitiendo los valores 3 y 4. */
    // const sharedobsv = interval(1000).pipe(
    //   take(5),
    //   tap((x) => console.log('executing! Value emitted: ' + x)),
    //   shareReplay()
    // );
    // let ob1 = sharedobsv.subscribe((x) => console.log('A ' + x));
    // let ob2 = sharedobsv.subscribe((x) => console.log('B ' + x));
    // setTimeout(() => {
    //   console.log('A unsubscribes');
    //   ob1.unsubscribe();
    // }, 2000);
    // setTimeout(() => {
    //   console.log('B unsubscribes');
    //   ob2.unsubscribe();
    // }, 3000);

    /**Usando Publish reaplay */
    const pubReplaydobsv = interval(1000).pipe(
      take(5),
      tap((x) => console.log('executing! Value emitted: ' + x)),
      publishReplay(),
      refCount()
    );
    let ob1 = pubReplaydobsv.subscribe((x) => console.log('A ' + x));
    let ob2 = pubReplaydobsv.subscribe((x) => console.log('B ' + x));
    setTimeout(() => {
      console.log('A unsubscribes');
      ob1.unsubscribe();
    }, 2000);
    setTimeout(() => {
      console.log('B unsubscribes');
      ob2.unsubscribe();
    }, 3000);
    /**Una vez que tanto A como B se dan de baja, refCount,
     * que lleva la cuenta de las suscripciones, se da de baja del observable de origen y no se emiten más valores. */
  }

  usingSubject() {
    /**Los Subjects son calientes, es decir, cualquier valor emitido por el Subject
     *  será compartido entre los suscriptores. Se ejecutará sólo una vez por cada valor emitido
     *  y ese valor se compartirá con todos los suscriptores.Otra palabra para este comportamiento es multicasting.

Los Subjects emiten valores independientemente de si hay suscriptores o no.

Los objetos son muy útiles para permitir la comunicación entre componentes.
 Por ejemplo, puede comunicar un mensaje de error http a todos los componentes suscritos. */
    /**Cuando ves la salida, no parece que el Subject esté caliente porque se está ejecutando para cada valor emitido
  * pero el valor no se comparte entre los suscriptores.

 ¿Por qué necesitaría share() o cualquier otro operador de multidifusión con Subjects cuando ya está caliente?
    Imagina que quiero hacer algunas modificaciones al valor emitido antes de compartirlo con los suscriptores.
    const subobs2 = sub.asObservable().pipe(
      map((v: number) => v * 2),
      tap(() => console.log('subject executing'))
    );

La razón de esto es que hemos canalizado operadores como map y tap a la fuente del sujeto.
 Estos operadores devuelven un observable frío y todo el propósito de usar sujetos se pierde aquí.
 In order to make observable hot, we need to use share() as below.
 */
    const sub = new Subject();
    const subobsv = sub.asObservable().pipe(
      tap(() => console.log('subject executing')),
      share() //Sacar esto y vemos como el observable se convierte en frio ejecutando el observable de cero
    );
    sub.next(1);
    subobsv.subscribe((x) => {
      console.log('Subscriber A', x);
    });
    sub.next(2);
    subobsv.subscribe((x) => {
      console.log('Subscriber B', x);
    });
    subobsv.subscribe((x) => {
      console.log('Subscriber C', x);
    });
    sub.next(3);
    setTimeout(() => {
      sub.next(5);
    }, 5000);
  }
}
