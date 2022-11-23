import {Injectable} from '@angular/core';
import {Features, Permission, UsuarioModel} from "../register-user/register-component/model/usuario.model";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor() { }

  checkPermission(user: UsuarioModel, feature: Features, permission: Permission): boolean{
   const featurePermission = user.roles.find(f => f.feature === feature);

   if (!!featurePermission){
     switch (permission){
       case Permission.View:
         return featurePermission.permission !== Permission.None;
       case Permission.Admin:
         return featurePermission.permission === Permission.Admin;
     }
   }
   return false;
  }
}
