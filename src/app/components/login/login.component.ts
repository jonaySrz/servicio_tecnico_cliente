import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;

  loginForm: FormGroup = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  usuarioError: boolean = false;
  passwordError: boolean = false;

  user: any = {};

  constructor(
    private service: LoginService,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')){
      localStorage.removeItem('token')
      localStorage.removeItem('rol')
      localStorage.removeItem('xyz')
    }
  }

  login(){
    this.user.usuario = this.loginForm.get('usuario')?.value;
    this.user.password = this.loginForm.get('password')?.value;

    this.service.login(this.user).subscribe(
      
      (data:any)=>{

      localStorage.setItem('token', data.token)
      localStorage.setItem('rol', data.rol)
      localStorage.setItem('xyz', data.xyz)

      if (data.rol == 'administrador'){
        window.location.href = '/admin/menu'
      }
      else {
        window.location.href = '/tecnico/lista/tareas'
      }
      },
      (error:any)=>{

        this.passwordError = false;
        this.usuarioError = false;
        
        if (error.error.includes('contraseña')){
          this.passwordError = true;
          (<HTMLInputElement>document.getElementById("password")).value = '';
          (<HTMLInputElement>document.getElementById("password")).focus()
        }

        if (error.error.includes('usuario')){
          this.usuarioError = true;
          (<HTMLInputElement>document.getElementById("usuario")).value = '';
          (<HTMLInputElement>document.getElementById("usuario")).focus()
        }
      })
  }

}
