import { Component, ViewChild } from '@angular/core';
import { Icons } from './shared/icons';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { routeAnim } from './animations/routeAnimation';
import { filter, map, mergeMap } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProgressDirective } from './directives/progress.directive';
import { NavbarDirective } from './directives/navbar.directive';
import { EnterDirective } from "./directives/enter.directive";
import { StaggerDirective } from "./directives/stagger.directive";
import { MatRippleModule } from '@angular/material/core';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [MatToolbarModule, MatSidenavModule, MatRippleModule, RouterModule, FooterComponent, FontAwesomeModule, MatButton, ProgressDirective, NavbarDirective, EnterDirective, StaggerDirective],
  animations: [routeAnim()]
})
export class AppComponent {
  @ViewChild('outlet') outlet: RouterOutlet;
  @ViewChild('sidenavContent') sidenav;
  Icons = Icons;

  faBars = Icons.faBars
  title = 'samniumprojects';
  page: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute){
  }
  ngOnInit(){
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
    ).subscribe((page)=>{
      this.page = page['name'];
      this.scrollTop();
    })
  }
  scrollTop(){
    this.sidenav.nativeElement.scrollTo(0,0)
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
