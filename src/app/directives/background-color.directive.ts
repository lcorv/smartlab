import { Directive } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Directive({
  selector: '[appBackgroundColor]'
})
export class BackgroundColorDirective {
  gsap: GSAP;

  constructor() { }
  ngAfterViewInit(){
    gsap.registerPlugin(ScrollTrigger);
    
    setTimeout(() => {
        gsap.to( '.content, .navbar', {
          keyframes:{
            "0%":{
              backgroundColor: ''
            },
            "15%":{
              backgroundColor: '#ed7b49',
            },
            "40%":{
              backgroundColor: '#a6d07d',
            },
            "70%":{
              backgroundColor: 'rgb(103, 103, 254)',
            },
        

          },
          scrollTrigger:{
            trigger:'.content',
            scroller: '.sidenav-content',
            scrub: true,
            start: 'top center',
            end: 'bottom center', 
          }
        })
    }, 1000);
    }
    ngOnDestroy(){
    ScrollTrigger.getAll().forEach((trigger)=>{
      trigger.kill();
    })
  }

}
