import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {VisitAddComponent} from './visit-add.component';
import {FormsModule} from '@angular/forms';
import {AppointmentService} from '../appointment.service';
import {PetService} from '../../pets/pet.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteStub, RouterStub} from '../../testing/router-stubs';
import {Pet} from '../../pets/pet';
import {Observable, of} from 'rxjs';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import Spy = jasmine.Spy;
import {OwnerService} from '../../owners/owner.service';

class PetServiceStub {
  addPet(pet: Pet): Observable<Pet> {
    return of();
  }
  getPetById(petId: string): Observable<Pet> {
    return of();
  }
}

class OwnerServiceStub {
}

class VisitServiceStub {
}

describe('VisitAddComponent', () => {
  let component: VisitAddComponent;
  let fixture: ComponentFixture<VisitAddComponent>;
  let petService: PetService;
  let visitService: AppointmentService;
  let testPet: Pet;
  let spy: Spy;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [VisitAddComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, MatDatepickerModule, MatMomentDateModule],
      providers: [
        {provide: PetService, useClass: PetServiceStub},
        {provide: AppointmentService, useClass: VisitServiceStub},
        {provide: OwnerService, useClass: OwnerServiceStub},
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitAddComponent);
    component = fixture.componentInstance;
    testPet = {
      id: 1,
      name: 'Leo',
      birthDate: '2010-09-07',
      type: {id: 1, name: 'cat'},
    };
    petService = fixture.debugElement.injector.get(PetService);
    visitService = fixture.debugElement.injector.get(AppointmentService);
    spy = spyOn(petService, 'addPet')
      .and.returnValue(of(testPet));

    fixture.detectChanges();
  });

  it('should create VisitAddComponent', () => {
    expect(component).toBeTruthy();
  });
});
