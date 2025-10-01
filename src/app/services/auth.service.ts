import { PLATFORM_ID, afterNextRender, inject, Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
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


  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post(`${this.apiUrl}${this.endpoint}/?action=login`, loginData).pipe(
      tap((response: any) => {
        if (response && response.token) {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('authToken', response.token);
          }
        }
      })
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
    }
    console.log('User logged out.');
  }

  getToken(): string | null {
    let token: string | null = null;

    // Verifichiamo se l'applicazione sta girando nel browser prima di accedere a localStorage
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('authToken');
    }

    return token;
  }

  getUser() {
    return this.http.get(`${this.apiUrl}${this.endpoint}/?action=get_user`)
  }

  getInfo(): Observable<any> {
    let token = this.getToken();
    return of(jwtDecode(token!))
  }


}