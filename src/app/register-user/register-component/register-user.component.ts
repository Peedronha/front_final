import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup,Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Autenticacao} from "./model/login.model";
import {RegisterService} from "./service/register.service";
import {UsuarioModel} from "./model/usuario.model";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
}) export class RegisterUserComponent implements OnInit {

  register:boolean = false
  showRegister($event){
    this.register = !this.register;
  }

  hide: any;



  email: string = '';
  username: string = '';
  senha: string = '';

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private registerService:RegisterService, private router:Router) { }

  ngOnInit() {

    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      senha: new FormControl('',Validators.required)
    })
  }

  /*
  *    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email)
    })
  * */

  login(){
    if (this.loginForm.valid){
      let autenticacao = new Autenticacao();
      autenticacao.login = this.loginForm.get('login')?.value;
      autenticacao.senha = this.loginForm.get('password')?.value;

      this.registerService.login(autenticacao).subscribe(
        response => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/welcome']);
        }
      )
    }
  }

  registro() {


      let usuario = new UsuarioModel();

      usuario.username = this.username;
      usuario.email = this.email;
      usuario.senha = this.senha;
      usuario.roles = [];
      this.registerService.registro(usuario).subscribe(usuarioRetorno => {
        console.log('workin on it');
      }, err => {
        console.log(err);
      });
    }
}

export class RegisterUserModule {

}
