import { afterNextRender, Inject, Injectable, PLATFORM_ID, } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gtag } from './analytics';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  grantConsense() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('consent_cookies', 'true');
    }
  }

  allConsenseRevoked() {
    if (isPlatformBrowser(this.platformId)) {
      gtag('consent', 'default', {
        'ad_storage': 'allowed',
        'ad_user_data': 'allowed',
        'ad_personalization': 'allowed',
        'analytics_storage': 'allowed'
      })
    }
  }

  allConsenseGranted() {
    if (isPlatformBrowser(this.platformId)) {
      gtag('consent', 'update', {
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'ad_storage': 'granted',
        'analytics_storage': 'granted'
      });
    }
  }

  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts != undefined && parts.length === 2) {
      return parts.pop()!.split(';').shift();
    }
    else {
      return null;
    }
  }

  get granted() {
    let granted;
    if (isPlatformBrowser(this.platformId)) {
      granted = this.getCookie('cookieconsent_status')
    }
    console.log('allow_cookie', granted)
    if (granted == 'allow') {
      this.allConsenseGranted();
      return true;
    }
    else {
      this.allConsenseRevoked();
      return false
    }
  }

  trackEvent(eventName: string, eventDetails: string, eventCategory: string) {

    let consent = this.granted;
    if (!consent) {
      return
    }

    gtag('event', eventName, {
      // event Type - example: 'SCROLL_TO_TOP_CLICKED'
      'event_category': eventCategory,
      // the label that will show up in the dashboard as the events name
      'event_label': eventName,
      // a short description of what happened
      'value': eventDetails
    })
  }
}