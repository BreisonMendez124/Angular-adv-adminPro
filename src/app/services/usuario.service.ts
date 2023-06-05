import { HttpClient } from '@angular/common/http';
import { Injectable, Input, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';

declare const google:any;
const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  public usuario!:Usuario;

  constructor( private http: HttpClient,
               private router:Router,
               private ngZone:NgZone ) { 
               }

   logout(){
      localStorage.removeItem('token');
      google.accounts.id.revoke( 'breisonmendez778@gmail.com' , () => {
        this.ngZone.run( () => {
          this.router.navigateByUrl("/Login");
        }) 
      });
   }

   get token(): string{
    return localStorage.getItem("token") || "";
   }

   get uid():string{
    return this.usuario?.uid || "";
   }

  validarToken(): Observable<boolean>{


    return this.http.get(`${base_url}/login/renew` , {
      headers: {
        'x-token': this.token
      }
    }).pipe( 
      tap( ( resp: any ) => {
        //Primero es necesario instanciarlo para poder ejecutar los metodos
        const { email , google , nombre , role , img = ''  , uid } = resp.usuario;
        this.usuario = new Usuario( nombre , email , '' , img , google , role , uid );
        //usuario.imprimirUsuario(); usar en el login de google
        localStorage.setItem('token' , resp.token );
        return true;
      }),
      //El error se convierte en false
      catchError( error => of( false ))
    )

  }

  crearUsuario( formData: RegisterForm ){
    
    return this.http.post(`${base_url}/usuarios`, formData )
                .pipe(
                  tap(
                    ( resp: any ) => {
                      localStorage.setItem('token' , resp.token );
                    }
                  )
                )
    
    
  }

  actualizarPerfil( data: { email: string , nombre: string , role:string } ){
    data = {
      ...data,
      role: this.usuario?.role || ""
    }
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data , {
      headers: {
        'x-token': this.token
      }
    })

  }

  login( formData: any ){
    
    return this.http.post(`${base_url}/login`, formData )
                .pipe(
                  tap(
                    ( resp: any ) => {
                      localStorage.setItem('token' , resp.token );
                    }
                  )
                )
    
  };

  loginGoogle( token: string ){
    return this.http.post(`${base_url}/login/google`, { token } )
    .pipe(
      tap(
        ( resp: any ) => {
          localStorage.setItem('token' , resp.token );
        }
      )
    )
  }
}
