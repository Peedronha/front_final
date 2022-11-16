import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import {AppointmentService} from './appointment.service';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('VisitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      providers: [AppointmentService]
    });
  });

  it('should ...', waitForAsync(inject([HttpTestingController], (visitService: AppointmentService, http: HttpClient) => {
    expect(visitService).toBeTruthy();
  })));
});
