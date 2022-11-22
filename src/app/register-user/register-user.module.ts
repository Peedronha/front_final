import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterUserRoutingModule } from './register-user-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {VetsRoutingModule} from "../vets/vets-routing.module";
import {RegisterUserComponent} from "./register-component/register-user.component";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatRadioModule} from "@angular/material/radio";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButton, MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    RegisterUserComponent,
  ],
  imports: [
    CommonModule,
    RegisterUserRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  exports:[
    RegisterUserComponent
  ]
})
export class RegisterUserModule { }
