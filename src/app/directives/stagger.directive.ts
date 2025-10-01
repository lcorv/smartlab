import { Directive, ElementRef, inject } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PlatformService } from '../services/platform.service';

@Directive({
  selector: '[appStagger]'
})
export class StaggerDirective {

  scrollWhatcher: HTMLDivElement;
  navObserver: IntersectionObserver;
  platform = inject(PlatformService);
  constructor(
    private el: ElementRef
  ) { }
  ngAfterViewInit() {
    if(this.platform.isBrowser()){
      gsap.registerPlugin(ScrollTrigger);
      setTimeout(() => {
        this.startGsap();
      })
    }
  }
  ngOnDestroy() {
    let scrollTriggers = ScrollTrigger.getAll();
    scrollTriggers.forEach((trigger) => {
      trigger.kill();
    })
  }
  startGsap() {
    setTimeout(() => {
      gsap.from('.stagger', {
        opacity: 0, y: -100,
      })
      ScrollTrigger.batch('.stagger', {
        scroller: '.sidenav-content',
        start: 'top 70%',
        end: 'bottom start',
        onEnter: batch => gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: 'power1.out',
          duration: 0.4
        }),
      })
    });
  }

}
