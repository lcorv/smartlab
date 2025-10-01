import { Directive, ElementRef, inject } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PlatformService } from '../services/platform.service';

@Directive({
  selector: '[appParallax]'
})
export class ParallaxDirective {
  scrollWatcher: HTMLElement | null;
  cover: HTMLElement | null;
  actualPosition: number;
  platform = inject(PlatformService);
  constructor(
    private el: ElementRef
  ) { }
  ngOnInit() {

  }
  /*   @HostListener('document:scroll') scrollevent(){
      if(this.scrollWatcher){     
        let title = this.el.nativeElement.querySelector('.title');
        if( window.scrollY<400){
          this.el.nativeElement.style.backgroundPositionY = `${ this.actualPosition + window.scrollY/4}px`;
          if(title){
            title.style.color = `#fff${(Math.ceil((1 - window.scrollY/200)*16)).toString(16)}`
            title.style.backdropFilter = `blur(${window.scrollY/20}px)`
          }
        }
      }
    } */
  ngAfterViewInit() {
    if(this.platform.isBrowser()){
      gsap.registerPlugin(ScrollTrigger);
      setTimeout(() => {
        this.setGsap();
      })
    }else{
      console.log('Not browser')
    }
  }
  ngOnDestroy() {
    let scrollTriggers = ScrollTrigger.getAll();
    scrollTriggers.forEach((trigger) => {
      trigger.kill();
    })
  }
  setGsap() {
    gsap.to('.cover', {
      backgroundPositionY: '-100px',
      scrollTrigger: {
        trigger: '.cover',
        scroller: '.sidenav-content',
        start: 'center center',
        end: 'bottom top',
        scrub: true,
      }
    })
    gsap.to('.text-wrapper', {
      opacity: '0',
      scale: '1.2',
      scrollTrigger: {
        trigger: '.cover',
        scroller: '.sidenav-content',
        start: 'center center',
        end: 'bottom top',
        scrub: true,
      }
    })
  }
}
