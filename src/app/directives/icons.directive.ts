import { afterNextRender, Directive, ElementRef, inject } from '@angular/core';
import { PlatformService } from '../services/platform.service';

@Directive({
  selector: '[appIcons]'
})
export class IconsDirective {
  platform = inject(PlatformService);
  observer;
  constructor(
    private el: ElementRef
  ) { }
  ngOnInit() {
    if(this.platform.isBrowser()){
      this.observer = new IntersectionObserver((entries) => {
        this.el.nativeElement.classList.toggle('animicon', !entries[0].isIntersecting)
      })
      this.observer.observe(this.el.nativeElement)
    }
  }
}
