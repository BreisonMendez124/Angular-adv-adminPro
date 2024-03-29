import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent{
  public usuario?:Usuario;
  constructor( private usuarioService:UsuarioService) {
    //this.imgUrl = this.usuarioService.usuario?.imagenUrl;
    //this.nameUser = this.usuarioService.usuario?.nombre;
    this.usuario = usuarioService.usuario;
   }

  logout(){
    this.usuarioService.logout();
  }

}
