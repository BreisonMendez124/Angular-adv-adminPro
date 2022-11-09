import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public element = document.querySelector('#theme');
  
  constructor() {
    const currentlyTheme = localStorage.getItem('theme') || `./assets/css/colors/default-dark.css`;    
    this.element?.setAttribute('href',currentlyTheme);
  }

  changeTheme(theme:string){
    
    const url = `./assets/css/colors/${theme}.css`;
    this.element?.setAttribute('href',url);
    localStorage.setItem('theme',url);
    this.changeCheckCurrentTheme();

  }

  changeCheckCurrentTheme(){
    //Si se requiere , la llamada al dom puede hacerce en el componente para no estar llamando a cada rato al DOM en cada cambio de tema
    const links = document.querySelectorAll('.selector');
    links.forEach((elem)=>{

      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnUrl = `./assets/css/colors/${btnTheme}.css`;
      const urlCurrent = this.element?.getAttribute('href');
      if(urlCurrent === btnUrl){
        elem.classList.add('working');
      }

    });

    
  }

  

  

  
}
