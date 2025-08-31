import { Directive, ElementRef, HostListener } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from 'animejs/lib/anime.es.js';
@Directive({
  selector: '[appDashoffset]'
})
export class DashoffsetDirective {
  actualPosition: number;
  constructor(
    private el: ElementRef,
    private router: Router
  ) { }
  ngAfterViewInit(){
    gsap.registerPlugin(ScrollTrigger);
    this.startGsap();
    
    this.router.events.forEach((e)=>{
      if(e instanceof NavigationStart){
        let scrollTriggers = ScrollTrigger.getAll();
      scrollTriggers.forEach((trigger)=>{
        trigger.kill();
      })
      this.startGsap();

      }
    })
    }
    startGsap(){
      setTimeout(() => {
        gsap.to( this.el.nativeElement.querySelectorAll('.logo-element'), {
          strokeDashoffset: '2',
          scrollTrigger:{
            trigger:'.cover',
            scroller: '.sidenav-content',
            scrub: true,
            start: 'center center',
            end: 'bottom center', 
            onLeave:()=>{
              this.fromLogo();
              setTimeout(()=>{
                this.toLogo();
              }, 1000)
            }
          }
        })
    }, 1000);
    }
    fromLogo(){
      anime.timeline({})
      .add({
        targets: '.logo-body',
        points: '23,37.8 50.1,24.9 77.3,37.8 77.3,64.8 77.3,76.4 23,76.4',
        duration: 500
      })
      .add({
        targets: '.logo-circle',
        cx:'50',
        cy:'63.3',
        r:"13.3",
        fill: "#fff"
      },'-=500')
    }
    @HostListener('mouseenter') onMouseEnter(){
      this.fromLogo();
    }
    toLogo(){
      anime.timeline({})
      .add({
        targets: '.logo-body',
        points: '1.5,14.5 54.6,60.3 98.5,35 98.1,60.2 54.6,85.5 1.5,39.5',
        duration: 500
      })
      .add({
        targets: '.logo-circle',
        cx:"54.2", 
        cy:"52.7", 
        r:"18.3",
        fill: "#111"
      },'-=500')
    }
    @HostListener('mouseleave') onMouseLeave(){
      this.toLogo();
    }
}
