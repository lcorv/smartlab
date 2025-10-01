import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EnterDirective } from '../directives/enter.directive';
import { Icons } from '../shared/icons';
import { CommonModule } from '@angular/common';
import { ParallaxDirective } from '../directives/parallax.directive';
import { flyIn } from '../animations/enterAnimations';
import { AnalyticsService } from '../services';
import { RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';
import { TagService } from '../services/tag-service';

@Component({
  selector: 'app-about',
  animations: [flyIn()],
  imports: [FontAwesomeModule, EnterDirective, ParallaxDirective, CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  Icons = Icons;
  init = false;
  analytics = inject(AnalyticsService);
  private tagService = inject(TagService);
  tagOptions = {
    title: 'Chi siamo - Smartlab riparazioni',
    description: 'Riparazione e assistenza per cellulari, smartphone e tablet a Tavullia vicino Pesaro. Siamo anche il tuo punto di riferimento per contratti di telefonia mobile, fissa, Internet, luce e gas.', 
    imageUrl: `${environment.baseUrl}images/about.jpg`,
    ogDescription: 'Il tuo punto di riferimento a Tavullia per la riparazione di smartphone, tablet e PC. Offriamo anche contratti di telefonia, Internet, luce e gas.',
    imageType: 'image/jpeg',
    imageWidth: '1200',
    imageHeight: '698',
    imageAlt: 'Chi siamo',
    pageUrl: `${environment.baseUrl}chi-siamo`,
    type: 'website', 
    robots: 'index, follow'
  }

  ngOnInit() {
    this.analytics.trackEvent('page_view', 'pagina_chi_siamo_caricata', 'page_load');
    this.tagService.updateMetaTags(this.tagOptions);
  }
  
  ngAfterViewInit() {
    setTimeout(() => {
      this.init = true
    }, 100);
  }
}
