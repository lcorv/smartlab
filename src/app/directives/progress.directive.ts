import { Directive, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';
import { PlatformService } from '../services/platform.service';


@Directive({
  selector: '[appProgress]'
})
export class ProgressDirective {

  private scrollspy;
  scrollHeight: number;
  platform = inject(PlatformService);


  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    if(this.platform.isBrowser()){
      this.scrollspy = document.querySelector('.scrollspy');
      this.scrollHeight = this.el.nativeElement.scrollHeight;
    }
  }

  @HostListener('scroll') onScroll() {
    if(this.platform.isBrowser()){
      let scrollTop = this.el.nativeElement.scrollTop;
      let height = this.el.nativeElement.scrollHeight - this.el.nativeElement.clientHeight;
      let scrollValue = Math.round((scrollTop * 100) / height);
      if (scrollTop > 0) {
        this.renderer.removeClass(this.scrollspy, 'scrollspy-hidden')
      }
      else {
        this.renderer.addClass(this.scrollspy, 'scrollspy-hidden')
      }
      this.renderer.setStyle(this.scrollspy, 'background', `conic-gradient(#03CC65 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`);
    }
  }
}
