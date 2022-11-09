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
        {  'titulo':"Progress",'url':'progress' },
        {  'titulo':"Graficas",'url':'grafica1' }
      ]
    }
  ]
  constructor() { }
}
