import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
//import swal from 'sweetalert';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls:['./register.component.css']
})
export class RegisterComponent{

  public submitted:boolean = false;

  public registerForm = this.fb.group({
    nombre:[ 'Breison' , Validators.required ],    
    email:[ 'Breison@test.com' , [ Validators.required , Validators.email ] ],
    password:[ '123456' , Validators.required ],
    password2:[ '123456' , Validators.required ],
    terminos:[ true , Validators.requiredTrue ]
  }, {
    validators: this.passwordsIguales( 'password' , 'password2')
  });

  constructor( private fb:FormBuilder ,
               private usuarioService: UsuarioService,
               private router:Router ) { }
  
  crearUsuarios(){
    this.submitted = true
    console.log( this.registerForm.value );
    if( this.registerForm.invalid ){
      return;
    };

    //Realizar posteo
    this.usuarioService.crearUsuario( this.registerForm.value )
                        .subscribe( resp => {
                              console.log("usuario creado")
                              console.log(resp)
                              this.router.navigateByUrl("/")
                            }, ( err ) => {
                              //Si sucede un error
                              Swal.fire('Error' , err.error.msg , 'error');
                            });
  }

  validarCampo( campo:string ):boolean {
    if( this.registerForm.get( campo )?.invalid && this.submitted ){
      return true;
    }else{
      return false;
    }
  }

  contrasenaNoValida():boolean {
   const pass1 = this.registerForm.get('password')?.value 
   const pass2 = this.registerForm.get('password2')?.value;

   if( ( pass1 !== pass2 ) && this.submitted ){
    return true;
   }else{
    return false;
   }
  }

  passwordsIguales( campo1Name:string , campo2Name:string ){
    
    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get( campo1Name );
      const pass2Control = formGroup.get( campo2Name );

      if( pass1Control?.value === pass2Control?.value ){
        pass2Control?.setErrors( null );
      }else{
        pass2Control?.setErrors( { noEsIgual: true } );
      }

    }

  }

}
