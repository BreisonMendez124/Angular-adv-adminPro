import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';


const routes: Routes = [
    {
        path:'Dashboard', 
        component:PagesComponent,
        canActivate:[ AuthGuard ],
        children:[
         { path:'', component:DashboardComponent, data: { titulo:'Dashboard' }},
         { path:"grafica1", component:Grafica1Component, data: { titulo:'grafica #1' } },
         { path:"progress", component:ProgressComponent, data: { titulo:'Progreso' }},
         { path:"promesas", component:PromesasComponent, data: { titulo:'Promesas' }},
         { path:"rxjs", component:RxjsComponent , data: { titulo:'RxJs' }},
         { path:"account-settings", component:AccountSettingsComponent, data: { titulo:'Configuracion de cuenta' }},
         { path:"perfil", component:PerfilComponent, data: { titulo:'Perfil de usuario' } },
         
        ]
       },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRouterModule {}
