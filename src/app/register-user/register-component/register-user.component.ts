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

  email: string = '';
  username: string = '';
  senha: string = '';

  loginForm = new FormGroup({
    login: new FormControl('', Validators.required),
    senha: new FormControl('',Validators.required)
  })

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email)
  })

  constructor(private registerService:RegisterService, private router:Router) { }

  ngOnInit() {
  }

  login(){
    if (this.loginForm.valid){
      let autenticacao = new Autenticacao();
      autenticacao.login = this.loginForm.get('login')?.value;
      autenticacao.senha = this.loginForm.get('senha')?.value;

      this.registerService.login(autenticacao).subscribe(
        response => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/welcome']);
        }
      )
    }
  }

  registro() {

    if (this.registerForm.valid) {

      let usuario = new UsuarioModel();

      usuario.email = this.registerForm.get('email')?.value;
      usuario.username = this.registerForm.get('username')?.value;
      usuario.senha = this.registerForm.get('password')?.value;


      this.registerService.registro(usuario).subscribe(usuarioRetorno => {
        console.log('workin on it');
      }, err => {
        console.log(err);
      });
    }
  }
}

export class RegisterUserModule {

}
