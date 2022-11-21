import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Autenticacao} from "../model/login.model";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private HttpClient: HttpClient) { }

  login(autenticacao: Autenticacao){
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/x-www-urlencoded'
      })
    };

    let login = autenticacao.login;
    let senha = autenticacao.senha;
    let body = `login=${login}&senha=${senha}`;

    return this.HttpClient.post<any>('http://localhost:8080/api/autenticacao', body, httpOptions);

  }
}
