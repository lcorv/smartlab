import { Component, inject } from '@angular/core';
import { AnalyticsService } from '../services';

@Component({
  selector: 'app-privacy-policy',
  imports: [],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {
  analytics = inject(AnalyticsService);
  ngOnInit(){
    this.analytics.trackEvent('page_view', 'pagina_privacy_policy_caricata', 'page_load')
  }

}
