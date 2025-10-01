import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { flyInHome } from '../animations/enterAnimations';
import { SkillsComponent } from "../skills/skills.component";
import { CommonModule } from '@angular/common';
import { TextAnimationDirective } from '../directives/text-animation.directive';
import { EnterDirective } from '../directives/enter.directive';
import { RouterModule } from '@angular/router';
import { ParallaxDirective } from '../directives/parallax.directive';
import { CarouselComponent } from '../carousel/carousel.component';
import { Icons } from '../shared/icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SiteInfo } from '../shared/siteInfo';
import { SiteInfoService } from '../services/site-info.service';
import { AnimatedLogoComponent } from '../animated-logo/animated-logo.component';
import { AnalyticsService } from '../services';
import { ReviewsComponent } from "../reviews/reviews.component";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from '@angular/material/core';
import { environment } from '../../environments/environment';
import { MetaTagOptions, TagService } from '../services/tag-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [flyInHome()],
  imports: [SkillsComponent, MatRippleModule, AnimatedLogoComponent, FontAwesomeModule, CarouselComponent, RouterModule, CommonModule, TextAnimationDirective, EnterDirective, ParallaxDirective, ReviewsComponent, MatButtonModule],
})
export class HomeComponent implements OnInit {
  init: boolean = true;
  icons = Icons;
  constants: SiteInfo;
  infoService = inject(SiteInfoService);
  analytics = inject(AnalyticsService);
  private tagService = inject(TagService);
  private meta = inject(Meta);
  private titleService = inject(Title);

  tagOptions: MetaTagOptions = {
    title: 'Smartlab riparazioni - Home',
    description: 'Riparazione e assistenza per cellulari, smartphone e tablet a Tavullia vicino Pesaro. Siamo anche il tuo punto di riferimento per contratti di telefonia mobile, fissa, Internet, luce e gas.',
    imageUrl: `${environment.baseUrl}images/logo_testo.jpg`,
    ogDescription: 'Il tuo punto di riferimento a Tavullia per la riparazione di smartphone, tablet e PC. Offriamo anche contratti di telefonia, Internet, luce e gas.',
    imageType: 'image/jpeg',
    imageWidth: '1200',
    imageHeight: '630',
    imageAlt: 'logo smartlab',
    pageUrl: `${environment.baseUrl}home`,
    type: 'website',
    robots: 'index, follow'
  }

  constructor() {
    this.updateMetaTags();
  }

  ngOnInit(): void {
    this.infoService.getSiteInfo().subscribe({
      next: (data) => this.constants = data
    })
    this.analytics.trackEvent('page_view', 'pagina_home_caricata', 'page_load')
    this.init = true;
  }
  ngAfterViewInit() {

  }

  updateMetaTags() {
    this.titleService.setTitle('Smartlab riparazioni - Home');

    // Standard Meta Tags
    this.meta.addTag({ name: 'description', content: 'Riparazione e assistenza per cellulari, smartphone e tablet a Tavullia vicino Pesaro. Siamo anche il tuo punto di riferimento per contratti di telefonia mobile, fissa, Internet, luce e gas.' });

    // Open Graph Meta Tags
    this.meta.addTag({ property: 'og:title', content: 'Smartlab riparazioni - Home' }, true);
    this.meta.updateTag({ property: 'og:description', content: 'Il tuo punto di riferimento a Tavullia per la riparazione di smartphone, tablet e PC. Offriamo anche contratti di telefonia, Internet, luce e gas.' });
    this.meta.updateTag({ property: 'og:image', content: `${environment.baseUrl}images/logo_testo.jpg` });
    this.meta.updateTag({ property: 'og:image:secure_url', content: `${environment.baseUrl}images/logo_testo.jpg` });
    this.meta.updateTag({ property: 'og:image:type', content: 'image/jpeg' });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:image:alt', content: 'logo smartlab' });
    this.meta.updateTag({ property: 'og:url', content: `${environment.baseUrl}home` });
    this.meta.updateTag({ property: 'og:type', content: 'website' });


    this.meta.addTag({ property: 'robots', content: 'index, follow' })
  }
}
