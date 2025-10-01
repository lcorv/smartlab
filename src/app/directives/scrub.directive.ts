import { Directive, HostListener, ElementRef, afterNextRender, inject } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PlatformService } from '../services/platform.service';

@Directive({
  selector: '[appScrub]'
})
export class ScrubDirective {
  scrollWatcher: HTMLElement | null;
  cover: HTMLElement | null;
  actualPosition: number;
  platform = inject(PlatformService);

  constructor(
    private el: ElementRef
  ) { }
  ngOnInit() {
  }

  ngAfterViewInit() {
    if(this.platform.isBrowser()){
      gsap.registerPlugin(ScrollTrigger);
      setTimeout(() => {
        this.setGsapRight();
        this.setGsapLeft();
      })
    }
  }

  ngOnDestroy() {
    let scrollTriggers = ScrollTrigger.getAll();
    scrollTriggers.forEach((trigger) => {
      trigger.kill();
    })
  }

  setGsapRight() {
    gsap.from('.scrub-left', {
      opacity: 0,
      x: "-200",
    })
    gsap.to('.scrub-left', {
      x: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: '.scrub-left',
        scroller: '.sidenav-content',
        start: 'top bottom',
        end: 'center center',
        scrub: true,
      }
    })
  }

  setGsapLeft() {
    gsap.from('.scrub-right', {
      opacity: 0,
      x: "200",
    })
    gsap.to('.scrub-right', {
      x: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: '.scrub-right',
        scroller: '.sidenav-content',
        start: 'top bottom',
        end: 'center center',
        scrub: true,
      }
    })
  }
}
