import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Producto } from './producto';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

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

  getAll(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(this.apiURL + '/producto/index')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(data: any): Observable<any> {

    const formData: FormData = new FormData()
    formData.append('Nombre', data.nombre);
    formData.append('Descripcion', data.descripcion);
    formData.append('Precio', data.precio);
    formData.append('Stock', data.stock);
    formData.append('file', data.file, data.file.name);

    return this.httpClient.post(this.apiURL + '/producto/store', formData, { observe: 'response' })
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

  find(id: any): Observable<Producto> {
    return this.httpClient.get<Producto>(this.apiURL + '/producto/show/' + id)
      .pipe(catchError(this.errorHandler))
  }

  update(id: any, person: any): Observable<Producto> {
    return this.httpClient.post<Producto>(this.apiURL + '/producto/update/' + id, JSON.stringify(person), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id: any) {
    return this.httpClient.delete<Producto>(this.apiURL + '/producto/destroy/' + id, this.httpOptions)
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

  shopping(model: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + '/shopping/shopp', JSON.stringify(model), this.httpOptions)
      .pipe(catchError(this.errorHandler)
      )
  }

}
