import { Component , AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent implements AfterViewInit{
  
  @ViewChild('googleBtn') googleBtn!: ElementRef;

  //Breison@test.com
  //123456
  public loginForm = this.fb.group({
    email:[localStorage.getItem('email') || "" , [ Validators.required , Validators.email ] ],
    password:[ '' , Validators.required ],
    remember: [ false ]
  });

  constructor( private router:Router ,
               private fb:FormBuilder ,
               private usuarioService: UsuarioService,
               private ngZone:NgZone ) { }

  ngAfterViewInit(): void {
      this.googleInit()
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: "539439713240-6otutpooe0a7b0eg8438arbs8sgoo5gh.apps.googleusercontent.com",
      callback: ( response:any ) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      //document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse( response: any ){
    //console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle( response.credential )
        .subscribe( resp => {
          //console.log({ "login": resp });
          this.ngZone.run( ( ) => {
            this.router.navigateByUrl("/")
          });
        });
  }

  login(){
    this.usuarioService.login( this.loginForm.value ).subscribe( resp => {
      if( this.loginForm.get('remember')?.value ){
        localStorage.setItem( 'email' , this.loginForm.get('email')?.value || " ");
      }else{
        localStorage.removeItem( 'email');
      }
      //navegar al dashboard
       this.router.navigateByUrl("/")
    } , (err) => {
      console.log(err)
      Swal.fire( 'Error' , err.error.msg, 'error');
    })
    console.log( this.loginForm.value );

  }

}
