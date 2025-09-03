import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormField, MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule, MatInputModule, MatFormField, MatButtonModule],
  
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  alert = inject(AlertService);
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.alert.showSuccess(`Login effettuato, ciao ${response.user.username}`);
        console.log(response)
        this.router.navigate(['/admin-smartlab']); // Naviga alla dashboard o altra pagina protetta
      },
      error: (err) => {
        this.alert.showError(`Login non riuscito, ${err.error}`);
        this.errorMessage = `${err.error} Riprova.`;
      }
    });
  }
}