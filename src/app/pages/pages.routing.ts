import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';


const routes: Routes = [
    {
        path:'Dashboard', 
        component:PagesComponent,
        children:[
         { path:'', component:DashboardComponent},
         { path:"Grafica1", component:Grafica1Component},
         { path:"Progress", component:ProgressComponent}
        ]
       },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRouterModule {}
