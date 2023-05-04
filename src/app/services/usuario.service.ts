import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

declare const google:any;
const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient,
               private router:Router,
               private ngZone:NgZone ) { }

   logout(){
      localStorage.removeItem('token');
      google.accounts.id.revoke( 'breisonmendez778@gmail.com' , () => {
        this.ngZone.run( () => {
          this.router.navigateByUrl("/Login");
        }) 
      });
   }


  validarToken(): Observable<boolean>{
    const token = localStorage.getItem("token") || "";

    return this.http.get(`${base_url}/login/renew` , {
      headers: {
        'x-token': token
      }
    }).pipe( 
      tap( ( resp: any ) => {
        localStorage.setItem('token' , resp.token );
      }),
      //Si lla respuesta es correcta retorna true
      map( resp => true),
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
