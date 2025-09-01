import { Directive, ElementRef } from '@angular/core';
import { gsap } from 'gsap/gsap-core';
import { ScrollTrigger } from 'gsap/all';

@Directive({
  selector: '[appStagger]'
})
export class StaggerDirective {

  scrollWhatcher: HTMLDivElement;
  navObserver: IntersectionObserver;
  constructor(
    private el: ElementRef
  ) { }
  ngAfterViewInit(){
    gsap.registerPlugin(ScrollTrigger);
      setTimeout(()=>{
        this.startGsap();
      })
    }
    ngOnDestroy(){
      let scrollTriggers = ScrollTrigger.getAll();
      scrollTriggers.forEach((trigger)=>{
        trigger.kill();
      })
    }
  startGsap(){
    setTimeout(() => {
      gsap.from('.stagger',{
        opacity:0, y:-100,
      })
      ScrollTrigger.batch( '.stagger', {
          scroller: '.sidenav-content',
          start: 'top 70%',
          end: 'bottom start',
          onEnter:batch => gsap.to(batch, {
            opacity:1, 
            y:0, 
            stagger: 0.1, 
            ease: 'power1.out', 
            duration: 0.4
            }) ,
      })
  });
  }

}
