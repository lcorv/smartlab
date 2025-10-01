import { Component, inject, ViewChild } from '@angular/core';
import { Icons } from './shared/icons';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { routeAnim } from './animations/routeAnimation';
import { filter, map, mergeMap, Subscription } from 'rxjs';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProgressDirective } from './directives/progress.directive';
import { NavbarDirective } from './directives/navbar.directive';
import { MatRippleModule } from '@angular/material/core';
import { NgcCookieConsentService, NgcInitializationErrorEvent, NgcInitializingEvent, NgcNoCookieLawEvent, NgcStatusChangeEvent } from 'ngx-cookieconsent';
import { AnalyticsService } from './services';
import { PlatformService } from './services/platform.service';
import { CommonModule } from '@angular/common';
import { StatusComponent } from "./status/status.component";
import { AvvisiComponent } from './avvisi/avvisi.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: { ngSkipHydration: 'true' },
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatRippleModule, RouterModule, FooterComponent, FontAwesomeModule, MatButton, ProgressDirective, NavbarDirective, StatusComponent, AvvisiComponent],
  animations: [routeAnim()]
})
export class AppComponent {
  @ViewChild('outlet') outlet: RouterOutlet;
  @ViewChild('sidenavContent') sidenav;

  private cookieService = inject(NgcCookieConsentService);
  private analytics = inject(AnalyticsService);
  private platform = inject(PlatformService);


  private popupOpenSubscription!: Subscription;
  private popupCloseSubscription!: Subscription;
  private initializingSubscription!: Subscription;
  private initializedSubscription!: Subscription;
  private initializationErrorSubscription!: Subscription;
  private statusChangeSubscription!: Subscription;
  private revokeChoiceSubscription!: Subscription;
  private noCookieLawSubscription!: Subscription;

  Icons = Icons;

  faBars = Icons.faBars
  page: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {

    if (this.platform.isBrowser()) {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd), // Only get the event of NavigationEnd
        map(() => this.activatedRoute), // Listen to activateRoute
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)  // get the data
      ).subscribe((page) => {
        this.page = page['name'];
        this.scrollTop();
      })

      // subscribe to cookieconsent observables to react to main events
      this.popupOpenSubscription = this.cookieService.popupOpen$.subscribe(
        () => {
          console.log('popup')
          // you can use this.cookieService.getConfig() to do stuff...
        });

      this.popupCloseSubscription = this.cookieService.popupClose$.subscribe(
        () => {
          // you can use this.cookieService.getConfig() to do stuff...
        });

      this.initializingSubscription = this.cookieService.initializing$.subscribe(
        (event: NgcInitializingEvent) => {
          // the cookieconsent is initilializing... Not yet safe to call methods like `NgcCookieConsentService.hasAnswered()`
          console.log(`initializing: ${JSON.stringify(event)}`);
        });

      this.initializedSubscription = this.cookieService.initialized$.subscribe(
        () => {
          // the cookieconsent has been successfully initialized.
          // It's now safe to use methods on NgcCookieConsentService that require it, like `hasAnswered()` for eg...
          console.log(`initialized: ${JSON.stringify(event)}`);
        });

      this.initializationErrorSubscription = this.cookieService.initializationError$.subscribe(
        (event: NgcInitializationErrorEvent) => {
          // the cookieconsent has failed to initialize... 
          console.log(`initializationError: ${JSON.stringify(event.error?.message)}`);
        });

      this.statusChangeSubscription = this.cookieService.statusChange$.subscribe(
        (event: NgcStatusChangeEvent) => {
          console.log('status', event)
          if (event.status == 'allow' && !event.chosenBefore) {
            this.analytics.allConsenseGranted();
            this.analytics.trackEvent('page_view', 'pagina_home_caricata', 'page_load')
          }
          if (event.status == 'deny' && !event.chosenBefore) {
            this.analytics.allConsenseRevoked();
          }
          // you can use this.cookieService.getConfig() to do stuff...
        });

      this.revokeChoiceSubscription = this.cookieService.revokeChoice$.subscribe(
        () => {
          console.log('revoked')
          // you can use this.cookieService.getConfig() to do stuff...
        });

      this.noCookieLawSubscription = this.cookieService.noCookieLaw$.subscribe(
        (event: NgcNoCookieLawEvent) => {
          // you can use this.cookieService.getConfig() to do stuff...
        });
    }
  }

  ngOnDestroy() {
    // unsubscribe to cookieconsent observables to prevent memory leaks
    if (this.platform.isBrowser()) {
      this.popupOpenSubscription.unsubscribe();
      this.popupCloseSubscription.unsubscribe();
      this.initializingSubscription.unsubscribe();
      this.initializedSubscription.unsubscribe();
      this.initializationErrorSubscription.unsubscribe();
      this.statusChangeSubscription.unsubscribe();
      this.revokeChoiceSubscription.unsubscribe();
      this.noCookieLawSubscription.unsubscribe();
    }
  }

  scrollTop() {
    this.sidenav.nativeElement.scrollTo(0, 0)
  }
  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated) {
      return outlet.activatedRouteData["tab"]
    }
    else {
      return 1;
    }
  }
}
