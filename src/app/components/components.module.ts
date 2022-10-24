import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule } from '@angular/forms'
import { IncrementatorComponent } from './incrementator/incrementator.component';
import { DonaComponent } from './dona/dona.component';

import { NgChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [  
    IncrementatorComponent, DonaComponent
  ],
  exports:[
    IncrementatorComponent,
    DonaComponent,
    NgChartsModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ]
})
export class ComponentsModule { }
