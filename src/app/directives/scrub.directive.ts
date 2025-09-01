import { Directive, HostListener, ElementRef } from '@angular/core';
import { gsap } from 'gsap/gsap-core';
import { ScrollTrigger } from 'gsap/all';

@Directive({
  selector: '[appScrub]'
})
export class ScrubDirective {
  scrollWatcher: HTMLElement | null;
  cover: HTMLElement | null;
  actualPosition: number;
  constructor(
    private el: ElementRef
  ) { }
  ngOnInit() {
  }
  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    setTimeout(() => {

      this.setGsap();
    })
  }
  ngOnDestroy() {
    let scrollTriggers = ScrollTrigger.getAll();
    scrollTriggers.forEach((trigger) => {
      trigger.kill();
    })
  }
  setGsap() {
    gsap.from('.scrub', {
      opacity: 0,
      x: -100,
    })
    gsap.to('.scrub', {
      x: 0,
            opacity: 1,
      scrollTrigger: {
        trigger: '.scrub',
        scroller: '.sidenav-content',
        start: 'top bottom',
        end: 'center center',
        scrub: true,
      }
    })

  }
}
