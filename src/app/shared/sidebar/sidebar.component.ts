import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  menu:any[] = [];
  public usuario?:Usuario;
  public imgUrl:any = '';
  public nameUser:any = '';
  constructor(private sideBarService:SidebarService , 
              private usuarioService:UsuarioService) { 
    this.menu = sideBarService.menu;
    this.usuario = usuarioService.usuario;
    //this.imgUrl = this.usuarioService.usuario?.imagenUrl;
    //this.nameUser = this.usuarioService.usuario?.nombre;
  }

  ngOnInit(): void {
  }

}
