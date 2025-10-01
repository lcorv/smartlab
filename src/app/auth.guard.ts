import { Inject, Injectable, PLATFORM_ID, TransferState } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, @Inject(PLATFORM_ID)private platformID: Object, private transferState: TransferState) {}

   canActivate(): boolean {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const expirationDate = new Date(decodedToken.exp * 1000);
        if (expirationDate > new Date()) {
          return true;
        }
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
}