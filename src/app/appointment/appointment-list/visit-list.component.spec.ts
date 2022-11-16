import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {VisitListComponent} from './visit-list.component';
import {FormsModule} from '@angular/forms';
import {AppointmentService} from '../appointment.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteStub, RouterStub} from '../../testing/router-stubs';
import {Appointment} from '../appointment';
import {Pet} from '../../pets/pet';
import {Observable, of} from 'rxjs';
import Spy = jasmine.Spy;

class VisitServiceStub {
  deleteVisit(visitId: string): Observable<number> {
    return of();
  }
}

describe('VisitListComponent', () => {
  let component: VisitListComponent;
  let fixture: ComponentFixture<VisitListComponent>;
  let visitService: AppointmentService;
  let testVisits: Appointment[];
  let testPet: Pet;
  let spy: Spy;
  let responseStatus: number;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [VisitListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule],
      providers: [
        {provide: AppointmentService, useClass: VisitServiceStub},
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitListComponent);
    component = fixture.componentInstance;
    testPet = {
      id: 1,
      name: 'Leo',
      birthDate: '2010-09-07',
      type: {id: 1, name: 'cat'},
    };
    testVisits =  [{
      id: 1,
      date: '2016-09-07',
      description: '',
      pet: 0,
      owner: 1
    }];

    visitService = fixture.debugElement.injector.get(AppointmentService);
    responseStatus = 204; // success delete return NO_CONTENT
    component.visits = testVisits;

    spy = spyOn(visitService, 'deleteVisit')
      .and.returnValue(of(responseStatus));

    fixture.detectChanges();
  });

  it('should create VisitListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteVisit() method', () => {
    fixture.detectChanges();
    component.deleteVisit(component.visits[0]);
    expect(spy.calls.any()).toBe(true, 'deleteVisit called');
  });

});
