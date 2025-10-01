import { Directive, ElementRef, inject } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PlatformService } from '../services/platform.service';

@Directive({
  selector: '[appTextAnimation]'
})
export class TextAnimationDirective {

  platform = inject(PlatformService);

  constructor(private el: ElementRef) { }
  ngAfterViewInit() {
    if(this.platform.isBrowser()){
      gsap.registerPlugin(ScrollTrigger);
      setTimeout(() => {
        this.startGsap()
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
    gsap.to('.text-anim', {
      scrollTrigger: {
        trigger: this.el.nativeElement,
        scroller: '.sidenav-content',
        start: '-200px center',
        end: 'bottom center',
        onEnter: () => this.animateText()
      }
    })
  }
  
  animateText() {
    // Wrap every letter in a span      
    let textWrapper = this.el.nativeElement;
    let words = (textWrapper.textContent.toString().split(' '))
    let newArray = words.map((word) => `<span style='display: inline-block'>${word.replace(/\S/g, "<span class='letter' style='display:inline-block;'>$&</span>")}</span>`);
    textWrapper.innerHTML = newArray.join(' ');
    anime.timeline({ loop: false })
      .add({
        targets: this.el.nativeElement.parentElement,
        opacity: 1,
        duration: 100,
        delay: 100
      })
      .add({
        targets: this.el.nativeElement.querySelectorAll('.letter'),
        translateY: ["2em", 0],
        translateZ: 0,
        opacity: 1,
        duration: 750,
        delay: (el, i) => 50 * i
      }).add({
        targets: '.text-anim',
        opacity: 1,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
      });
  }
}
