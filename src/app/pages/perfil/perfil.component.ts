import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public usuario!: Usuario;
  public perfilForm!: FormGroup ;
  public imagenSubir!: File;
  public imgTemp:any = '';

  constructor( private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private fileUploadService: FileUploadService ) {
                this.usuario = usuarioService.usuario;

  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group( {
      nombre: [ this.usuario.nombre, Validators.required ],
      email: [ this.usuario.email , [ Validators.required , Validators.email ] ],
    });
  }

  actualizarPerfil(){
    this.usuarioService.actualizarPerfil( this.perfilForm?.value )
                        .subscribe( resp => {
                          const { email  , nombre } = this.perfilForm?.value
                          this.usuario.nombre = nombre;
                          this.usuario.email = email;
                          Swal.fire('Guardado' , 'Cambios fueron guardados' , 'success');
                        },( err ) => {
                          Swal.fire('Error' , err.error.msg , 'error');
                        })
  }

  cambiarImagen( file:File ){
    this.imagenSubir = file;

    if( !file){ 
      this.imgTemp = null
      return;
     }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }


  subirImagen(){
    this.fileUploadService.actualizarFoto( 
      this.imagenSubir,
      "usuarios",
      String( this.usuario.uid ) )
      .then( img => {
        this.usuario.img = img;
        Swal.fire('Guardado' , 'Imange de usuario actualizada' , 'success');
      }).catch( err => {
        console.log( err );
        Swal.fire('Error' , 'No se pudo subir la imagen' , 'error');

      })
  }

}
