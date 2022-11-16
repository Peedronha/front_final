import { Injectable } from '@angular/core';
import { Owner } from './owner';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from '../error.service';
import {Pet} from "../pets/pet";

@Injectable()
export class OwnerService {
  entityUrl = environment.REST_API_URL + 'owners';

  private readonly handlerError: HandleError;

  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {
    this.handlerError = httpErrorHandler.createHandleError('ErrorService');
  }

  getOwners(): Observable<Owner[]> {
    return this.http
      .get<Owner[]>(this.entityUrl)
      .pipe(catchError(this.handlerError('getOwners', [])));
  }

  getOwnerById(ownerId: number): Observable<Owner> {
    return this.http
      .get<Owner>(this.entityUrl + '/' + ownerId)
      .pipe(catchError(this.handlerError('getOwnerById', {} as Owner)));
  }

  addOwner(owner: Owner): Observable<Owner> {
    return this.http
      .post<Owner>(this.entityUrl, owner)
      .pipe(catchError(this.handlerError('addOwner', owner)));
  }


  updateOwner(ownerId: string, owner: Owner): Observable<{}> {
    return this.http
      .put<Owner>(this.entityUrl + '/' + ownerId, owner)
      .pipe(catchError(this.handlerError('updateOwner', owner)));
  }

  deleteOwner(ownerId: string): Observable<{}> {
    return this.http
      .delete<Owner>(this.entityUrl + '/' + ownerId)
      .pipe(catchError(this.handlerError('deleteOwner', [ownerId])));
  }

  searchOwners(lastName: string): Observable<Owner[]> {
    let url = this.entityUrl;
    if (lastName !== undefined) {
      url += '?lastName=' + lastName;
    }
    return this.http
      .get<Owner[]>(url)
      .pipe(catchError(this.handlerError('searchOwners', [])));
  }

  getOwnerByPetId(id: number) {
    return this.http
      .get<Owner>(environment.REST_API_URL + 'pets')
      .pipe(catchError(this.handlerError('getbyPet', {} as Owner)));
  }
  updateOwnerPet(petId:number, ownerId: number, owner: Owner){
    return this.http.put<Owner>(this.entityUrl + '/' + ownerId + '/' + petId, owner)
      .pipe(catchError((this.handlerError('updateOwnerPet', {} as Owner))));
  }
}
