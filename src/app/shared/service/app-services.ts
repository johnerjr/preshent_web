import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class AppServices {

  private apiURL: any = environment.apiURL;
  private apiAImlURL: any = environment.apiAIMLURL;

  constructor(
    private http: HttpClient
  ) {}

  fetch(endpoint: string) {
    return this.http.get(`${this.apiURL + endpoint}`, httpOptions ).pipe(catchError(
      this.handleError('getData', []))
    );
  }

  get(endpoint: string, param: any) {
    return this.http.get(`${this.apiURL + endpoint + param}`, httpOptions ).pipe(catchError(
      this.handleError('getData', []))
    );
  }

  getAIML(endpoint: string, param: any) {
    return this.http.get(`${this.apiAImlURL + endpoint + param}`, httpOptions ).pipe(catchError(
      this.handleError('getData', []))
    );
  }

  postAIML(endpoint: string, data: any ) {
    // console.log('services:::', data);
    // return this.http.post(`${this.apiAImlURL + endpoint}`, data, httpOptions).pipe(catchError(
    //   this.handleError('getData', []))
    // );

    return this.http.post(`${this.apiAImlURL + endpoint}`, data, httpOptions).pipe(catchError(
      this.handleError('getData', []))
    );
  }

  post(endpoint: string, data: any ) {
    // console.log('services:::', data);
    return this.http.post(`${this.apiURL + endpoint}`, data, httpOptions).pipe(catchError(
      this.handleError('getData', []))
    );
  }

  update(endpoint: string, data: any) {
    return this.http.put(`${this.apiURL + endpoint}`, data, httpOptions).pipe(catchError(
      this.handleError('getData', []))
    );
  }

  delete(endpoint: string, param: any ) {
    return this.http.delete(`${this.apiURL + endpoint + param}`, httpOptions ).pipe(catchError(
      this.handleError('getData', []))
    );
  }

  observErrorHandler(error: any): void {
    return error;
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}

