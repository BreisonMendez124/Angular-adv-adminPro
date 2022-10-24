import { Component } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})
export class Grafica1Component{
 
  tituloGrafica1:string = "Ventas";
  dataSet = [{ data: [ 200, 100, 280 ], label: 'Niuevoovo' }]
  titulos:string[] = ['Ventas octubre','Ventas enero','Ventas Febrero'];

}
