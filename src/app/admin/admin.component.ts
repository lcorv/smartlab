import { Component, Inject, inject, makeStateKey, PLATFORM_ID, TransferState } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { GestisciOperatoriComponent } from "../gestisci-operatori/gestisci-operatori.component";
import { GestisciServiziComponent } from '../gestisci-servizi/gestisci-servizi.component';
import { AlertService } from '../services/alert.service';
import { SiteInfoComponent } from "../site-info/site-info.component";
import { GestisciOrariComponent } from "../gestisci-orari/gestisci-orari.component";
import { GestisciAvvisiComponent } from "../gestisci-avvisi/gestisci-avvisi.component";

const dataKey = makeStateKey<any>('data')

@Component({
  selector: 'app-admin',
  imports: [CommonModule, MatButtonModule, RouterModule, MatTabsModule, GestisciOperatoriComponent, GestisciServiziComponent, SiteInfoComponent, GestisciOrariComponent, GestisciAvvisiComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  constructor(@Inject(PLATFORM_ID) private platformID: Object, private transferState: TransferState) { }
  auth = inject(AuthService);
  route = inject(Router);
  alertService = inject(AlertService)
  user;
  ngOnInit() {
      this.auth.getUser().subscribe({
        next: (info) => {
          this.user = info;
          console.log(this.user);
          this.transferState.set(dataKey,info)

        }
      })
  }
  showSuccess(message): void {
    this.alertService.showSuccess(message);
  }
  logout() {
    this.auth.logout();
    this.showSuccess('Logout eseguito')
    this.route.navigateByUrl('home')
  }
}
