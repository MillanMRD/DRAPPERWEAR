import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Noticia } from './noticia';
@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  private apiURL = `${environment.apiURL}`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  httpOptionsFormData = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Noticia[]> {
    return this.httpClient.get<Noticia[]>(this.apiURL + '/noticia/index')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(data: any): Observable<any> {

    const formData: FormData = new FormData()
    formData.append('titulo', data.titulo);
    formData.append('cuerpo', data.cuerpo);
    formData.append('file', data.file, data.file.name);

    return this.httpClient.post(this.apiURL + '/noticia/store', formData, { observe: 'response' })
      .pipe(
        map((resp: any) => {
          return resp;
        }),
        catchError(error => {
          console.log(error)
          return throwError(error.error.status);
        }),
      );
  }

  find(id: any): Observable<Noticia> {
    return this.httpClient.get<Noticia>(this.apiURL + '/noticia/show/' + id)
      .pipe(catchError(this.errorHandler))
  }

  update(id: any, person: any): Observable<Noticia> {
    return this.httpClient.post<Noticia>(this.apiURL + '/noticia/update/' + id, JSON.stringify(person), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id: any) {
    return this.httpClient.delete<Noticia>(this.apiURL + '/noticia/destroy/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
