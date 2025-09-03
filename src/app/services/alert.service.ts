import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string, duration: number = 3000): void {
    this.snackBar.open(message, 'Chiudi', {
      duration: duration,
      panelClass: ['alert-success']
    });
  }

  showError(message: string, duration: number = 3000): void {
    this.snackBar.open(message, 'Chiudi', {
      duration: duration,
      panelClass: ['alert-error']
    });
  }

  showInfo(message: string, duration: number = 3000): void {
    this.snackBar.open(message, 'Chiudi', {
      duration: duration,
      panelClass: ['alert-info']
    });
  }
}