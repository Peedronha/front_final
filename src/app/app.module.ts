import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {OwnersModule} from './owners/owners.module';
import {PetsModule} from './pets/pets.module';
import {AppointmentModule} from "./appointment/appointment.module";
import {PetTypesModule} from './pettypes/pettypes.module';
import {VetsModule} from './vets/vets.module';
import {PartsModule} from './parts/parts.module';
import {RegisterUserModule} from "./register-user/register-user.module";
import {SpecialtiesModule} from './specialties/specialties.module';
import {HttpErrorHandler} from './error.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    OwnersModule,
    PetsModule,
    AppointmentModule,
    PetTypesModule,
    VetsModule,
    RegisterUserModule,
    SpecialtiesModule,
    PartsModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    HttpErrorHandler,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
