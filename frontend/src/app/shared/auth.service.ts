import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// User interface
export class User {
  name!: String;
  email!: String;
  password!: String;
  password_confirmation!: String;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiURL = `${environment.apiURL}`;


  constructor(private http: HttpClient) { }
  // User registration
  register(user: User): Observable<any> {
    return this.http.post(this.apiURL + '/register', user);
  }
  // Login
  signin(user: User): Observable<any> {
    return this.http.post<any>(this.apiURL + '/login', user);
  }
  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get(this.apiURL + '/me');
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/destroy/${id}`);
  }

  editUser(id: number, user: User): Observable<any> {
    return this.http.post(`${this.apiURL}/update/${id}`, user);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiURL}/index`);
  }
}
