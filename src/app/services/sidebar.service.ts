import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu:any[] = [
    {
      'titulo':"DashboardDinamico",
      'icono':'mdi mdi-gauge',
      subMenuItems:[
        {  'titulo':"Main",'url':'/' },
        {  'titulo':"Rxjs",'url':'rxjs' },
        {  'titulo':"Progress",'url':'progress' },
        {  'titulo':"Graficas",'url':'grafica1' },
        {  'titulo':"Promesas",'url':'promesas' }
      ]
    }
  ]
  constructor() { }
}
