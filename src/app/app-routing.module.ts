import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { ProgressComponent } from './pages/progress/progress.component';


const router: Routes = [
  //Paginas autenticadas -> despues de un login

  {
   path:'', 
   component:PagesComponent,
   children:[
    { path:"Dashboard", component:DashboardComponent},
    { path:"Grafica1", component:Grafica1Component},
    { path:"Progress", component:ProgressComponent},
    { path:"", redirectTo:"Dashboard",pathMatch:'full'}
   ]
  },

  //Paginas principales
  
  { path:"Login", component:LoginComponent},
  { path:"Register", component:RegisterComponent},
  { path:"**", component:NopagefoundComponent},

]



@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(router) ],
  exports:[ RouterModule ]
})
export class AppRoutingModule { }
