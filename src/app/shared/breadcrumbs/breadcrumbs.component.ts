import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{
  public tituloBread:String = '';
  public tituloSub$:Subscription;
  constructor(private router:Router) { 
    this.tituloSub$ = this.getArgumentosRuta()
                      .subscribe(  ({ titulo } ) => {
                        this.tituloBread = titulo;
                        document.title = `AdminPro - ${titulo}`;
                      }); 
  }
  
  ngOnDestroy(): void {
    this.tituloSub$.unsubscribe();
  };

  getArgumentosRuta(){
    return this.router.events.pipe(
      filter( (event): event is ActivationEnd => event instanceof ActivationEnd),
      filter( (event:ActivationEnd ) => event.snapshot.firstChild === null),
      map( (event:ActivationEnd ) => event.snapshot.data), 
      );
  }

}
