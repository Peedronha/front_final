import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {VisitEditComponent} from './visit-edit.component';
import {FormsModule} from '@angular/forms';
import {VisitService} from '../visit.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteStub, RouterStub} from '../../testing/router-stubs';
import {Visit} from '../visit';
import {Observable, of} from 'rxjs';
import {Pet} from '../../pets/pet';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import Spy = jasmine.Spy;
import {OwnerService} from '../../owners/owner.service';
import {PetService} from '../../pets/pet.service';

class VisitServiceStub {
  getVisitById(visitId: string): Observable<Visit> {
    return of();
  }
}

class OwnerServiceStub {
}

class PetServiceStub {
  getPetById(petId: string): Observable<Pet> {
    return of();
  }
}

describe('VisitEditComponent', () => {
  let component: VisitEditComponent;
  let fixture: ComponentFixture<VisitEditComponent>;
  let visitService: VisitService;
  let testVisit: Visit;
  let testPet: Pet;
  let spy: Spy;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [VisitEditComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, MatDatepickerModule, MatMomentDateModule],
      providers: [
        {provide: VisitService, useClass: VisitServiceStub},
        {provide: OwnerService, useClass: OwnerServiceStub},
        {provide: PetService, useClass: PetServiceStub},
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitEditComponent);
    component = fixture.componentInstance;
    testPet = {
      id: 1,
      ownerId: 1,
      name: 'Leo',
      birthDate: '2010-09-07',
      type: {id: 1, name: 'cat'},
      owner: {
        id: 1,
        firstName: 'George',
        lastName: 'Franklin',
        address: '110 W. Liberty St.',
        city: 'Madison',
        telephone: '6085551023',
        pets: []
      },
      visits: []
    };
    testVisit = {
      id: 1,
      date: '2016-09-07',
      description: '',
      pet: testPet,
      petId: 1
    };

    visitService = fixture.debugElement.injector.get(VisitService);
    spy = spyOn(visitService, 'getVisitById')
      .and.returnValue(of(testVisit));

    fixture.detectChanges();
  });

  it('should create VisitEditComponent', () => {
    expect(component).toBeTruthy();
  });
});
