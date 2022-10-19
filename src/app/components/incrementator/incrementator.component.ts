import { Component, Input, Output , EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'app-incrementator',
  templateUrl: './incrementator.component.html',
  styles: [
  ]
})
export class IncrementatorComponent implements OnInit{

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }
  //@Input('valor') progreso:number = 10; -> de esta manera se puede renombrar una variable, en la referencia deberia de llamarC como la renombramos

   @Input() btnClass: string = 'btn-primary';
   @Input() progreso:number = 10;
   @Output() sendValueIncrementator:EventEmitter<number> = new EventEmitter();

  changeValueProgress( value:number ){
    if(this.progreso >= 100 && value >= 100){
      this.sendValueIncrementator.emit(100);
      this.progreso = 100;
    }

    if(this.progreso <= 0 && value < 0){
      this.sendValueIncrementator.emit(0);
      this.progreso = 0;
    }
   this.progreso = this.progreso + value;
   this.sendValueIncrementator.emit( this.progreso );
   return;
  }

  onChange( valor:number ){
    if(valor >= 100){
      this.progreso = 100;
    }
    if(valor <= 0){
      this.progreso = 0;
    }
   this.sendValueIncrementator.emit( this.progreso );
  }

}
