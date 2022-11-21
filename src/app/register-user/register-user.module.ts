import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterUserRoutingModule } from './register-user-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {VetsRoutingModule} from "../vets/vets-routing.module";
import {RegisterUserComponent} from "./register-component/register-user.component";


@NgModule({
  declarations: [
    RegisterUserComponent
  ],
  imports: [
    CommonModule,
    RegisterUserRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  exports:[
    RegisterUserComponent
  ]
})
export class RegisterUserModule { }
