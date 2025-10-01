import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface MetaTagOptions {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  imageType?: string;
  imageWidth?: string;
  imageHeight?: string;
  ogDescription?: string;
  pageUrl: string;
  type?: string;
  robots?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private meta = inject(Meta);
  private titleService = inject(Title);

  constructor() { }

  updateMetaTags(options: MetaTagOptions) {
    this.titleService.setTitle(options.title);

    // Standard Meta Tags
    this.meta.updateTag({ name: 'description', content: options.description });

    // Open Graph Meta Tags
    this.meta.updateTag({ property: 'og:title', content: options.title});
    this.meta.updateTag({ property: 'og:description', content: options.ogDescription || options.description });
    this.meta.updateTag({ property: 'og:image', content: options.imageUrl });
    this.meta.updateTag({ property: 'og:image:secure_url', content: options.imageUrl });
    this.meta.updateTag({ property: 'og:image:type', content: options.imageType || 'image/jpeg' });
    this.meta.updateTag({ property: 'og:image:width', content: options.imageWidth || '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: options.imageHeight || '630' });
    this.meta.updateTag({ property: 'og:image:alt', content: options.imageAlt });
    this.meta.updateTag({ property: 'og:url', content: options.pageUrl });
    this.meta.updateTag({ property: 'og:type', content: options.type || 'website'});


    this.meta.updateTag({ property: 'robots', content: options.robots || 'index, follow' });
  }
}