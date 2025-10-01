
import { Directive, ElementRef, inject, Inject, DOCUMENT } from '@angular/core';
import { PlatformService } from '../services/platform.service';

@Directive({
  selector: '[appNavbar]'
})
export class NavbarDirective {
  scrollWhatcher: HTMLDivElement;
  navObserver: IntersectionObserver;
    platform = inject(PlatformService);

  constructor(
    private el: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) { }
  ngOnInit() {
    if(this.platform.isBrowser()){
      this.init();
    }
  }
  ngAfterViewInit() {
    if(this.platform.isBrowser()){
      this.set();
    }
  }
  init() {
      this.scrollWhatcher = this.document.createElement('div');
      this.scrollWhatcher.setAttribute('data-scroll-watcher', '');
      if (!window) return
      this.navObserver = new IntersectionObserver((entries) => {
        this.el.nativeElement.classList.toggle('sticking', !entries[0].isIntersecting)
      })
  }
  set() {
      this.el.nativeElement.before(this.scrollWhatcher);
      this.navObserver.observe(this.scrollWhatcher)
  }
}
