import { Component, OnDestroy } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { retry , take,map,filter} from 'rxjs/operators'

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription
  constructor() { 

   /* this.retornarObservable().pipe(
      retry(2)
    ).subscribe(
      valor => console.log('subs', valor),
      error => console.error('ocurrio algo',error),
      () => console.log('observable finalizado con exito')
    );
    */
   this.intervalSubs = this.retornalInterval().subscribe(console.log)
  }
  ngOnDestroy(): void {//Destruye el observable (se descuscribe) y por ende al cambiar de pagina y volver inicia desde 0
    this.intervalSubs.unsubscribe();
  }

  retornalInterval(): Observable<number>{
    return interval(5000)
    .pipe(
      take(4),
      map( valor => valor + 1),
      filter(valor => (valor % 2 === 0) ? true : false)
    )
  };
  

  retornarObservable():Observable<number>{
    let i = -1;
    return new Observable<number> (observer => {
      const intervalo = setInterval(()=>{
        i++;
        observer.next(i); //valor que retorna
        if(i == 4){
          clearInterval(intervalo);
          observer.complete();//Terminamos la llamada el observable
        }

        if(i == 2){
          i = 0;
          observer.error('llego al error de 2')
        }

        
      },1000);
    });
    
  }
}
