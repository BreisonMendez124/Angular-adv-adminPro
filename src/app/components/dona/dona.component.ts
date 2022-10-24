import { Component , Input} from '@angular/core';
import { ChartConfiguration , Color} from 'chart.js';


@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css']
})
export class DonaComponent {

  @Input() title:string = "Sin titulo";
  @Input('titulosPedazos') doughnutChartLabels: string[] = ['No contiene informacion'];
  @Input('dataDona') doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
      { data: [123], label: 'Hola' }
    ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false
  };

}
