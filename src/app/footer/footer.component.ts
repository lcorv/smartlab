import { Component, inject, OnInit } from '@angular/core';
import { Icons } from '../shared/icons';
import { CONSTANTS } from '../shared/constants';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { IconsDirective } from '../directives/icons.directive';
import { OrariComponent } from '../orari/orari.component';
import { SiteInfo } from '../shared/siteInfo';
import { SiteInfoService } from '../services/site-info.service';
import { AnalyticsService } from '../services';
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [AnalyticsService],
  imports: [FontAwesomeModule, CommonModule, IconsDirective, OrariComponent, RouterLink, RouterModule]
})
export class FooterComponent implements OnInit {
  constants: SiteInfo;
  infoService = inject(SiteInfoService);
  analytics = inject(AnalyticsService);
  Icons = Icons;
  date = new Date(Date.now());
  constructor() { }

  ngOnInit(): void {
    this.infoService.getSiteInfo().subscribe({
      next:(data)=> this.constants = data
    })
    this.analytics.trackEvent('footer caricato','test footer caricato','caricamenti');
  }

}
