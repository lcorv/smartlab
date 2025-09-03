import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { GestisciOperatoriComponent } from "../gestisci-operatori/gestisci-operatori.component";
import { GestisciServiziComponent } from '../gestisci-servizi/gestisci-servizi.component';
import { AlertService } from '../services/alert.service';
import { SiteInfoComponent } from "../site-info/site-info.component";
import { GestisciOrariComponent } from "../gestisci-orari/gestisci-orari.component";

@Component({
  selector: 'app-admin',
  imports: [CommonModule, MatButtonModule, RouterModule, MatTabsModule, GestisciOperatoriComponent, GestisciServiziComponent, SiteInfoComponent, GestisciOrariComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
auth = inject(AuthService);
route = inject(Router);
alertService = inject(AlertService)
user;
ngOnInit(){
  this.auth.getUser().subscribe({
    next: (info)=>{
      this.user = info;
      console.log(this.user)
    }
  })
}
 showSuccess(message): void {
    this.alertService.showSuccess(message);
  }
logout(){
  this.auth.logout();
  this.showSuccess('Logout eseguito')
  this.route.navigateByUrl('home')
}
}
