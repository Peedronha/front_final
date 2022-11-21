import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup,Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Autenticacao} from "./model/login.model";
import {RegisterService} from "./service/register.service";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
}) class RegisterUserComponent implements OnInit {

  hide:any;
  email:any;
  invalid:any;

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

  registro(){

  }


}

export class RegisterUserModule {

}
