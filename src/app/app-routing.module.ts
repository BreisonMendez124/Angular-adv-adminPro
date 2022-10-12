import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { AuthRoutingModule } from './auth/auth.routing';


//MODULOS

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesRouterModule } from './pages/pages.routing';



const router: Routes = [
  //Paginas principales
  { path:"", redirectTo:"/Dashboard",pathMatch:'full'},
  { path:"**", component:NopagefoundComponent}

]



@NgModule({
  imports: [ 
              RouterModule.forRoot(router) ,
              PagesRouterModule,
              AuthRoutingModule 
            ],
  exports:[ RouterModule ]
})
export class AppRoutingModule { }
