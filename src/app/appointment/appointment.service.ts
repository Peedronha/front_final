import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Appointment} from './appointment';
import {environment} from '../../environments/environment';
import {HandleError, HttpErrorHandler} from '../error.service';
import {HttpClient} from '@angular/common/http';
import { catchError } from 'rxjs';

@Injectable()
export class AppointmentService {

  private entityUrl = environment.REST_API_URL + 'visits';

  private readonly handlerError: HandleError;

  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {
    this.handlerError = httpErrorHandler.createHandleError('OwnerService');
  }

  getVisits(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.entityUrl)
      .pipe(
        catchError(this.handlerError('getVisits', []))
      );
  }

  getVisitById(visitId: string): Observable<Appointment> {
    return this.http.get<Appointment>(this.entityUrl + '/' + visitId)
      .pipe(
        catchError(this.handlerError('getVisitById', {} as Appointment))
      );
  }

  addVisit(visit: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.entityUrl, visit)
      .pipe(
        catchError(this.handlerError('addVisit', visit))
      );
  }

  updateVisit(visitId: string, visit: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(this.entityUrl + '/' + visitId, visit)
      .pipe(
        catchError(this.handlerError('updateVisit', visit))
      );
  }

  deleteVisit(visitId: string): Observable<number> {
    return this.http.delete<number>(this.entityUrl + '/' + visitId)
      .pipe(
        catchError(this.handlerError('deleteVisit', 0))
      );

  }


}
