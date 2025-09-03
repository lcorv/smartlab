import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.api;
  private endpoint = 'user';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post(`${this.apiUrl}${this.endpoint}/?action=login`, loginData).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('authToken', response.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    console.log('User logged out.');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getUser(){
    return this.http.get(`${this.apiUrl}${this.endpoint}/?action=get_user`)
  }

  getInfo(): Observable<any>{
    let token = this.getToken();
    return of(jwtDecode(token!))
  }


}