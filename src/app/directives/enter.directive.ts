import { Directive, ElementRef, inject, Input } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Directive({
  selector: '[appEnter]'
})
export class EnterDirective {
  scrollWhatcher: HTMLDivElement;
  navObserver: IntersectionObserver;
  @Input() delay: number = 0;
  @Input() direction: string = 'top';
  duration = 0.5;

  constructor(
    private el: ElementRef
  ) { }
  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);
    setTimeout(() => {
      this.startGsap();
    }, 150);
  }
  ngOnDestroy() {
    let scrollTriggers = ScrollTrigger.getAll();
    scrollTriggers.forEach((trigger) => {
      trigger.kill();
    })
  }
  startGsap() {
    switch (this.direction) {
      case 'top':
        this.enterTop();
        break
      case 'right':
        this.enterRight();
        break
      case 'bottom':
        this.enterBottom();
        break
      case 'left':
        this.enterLeft();
        break
      case 'batch':
        this.enterBatch();
        break
    }

  }

  enterTop() {
    gsap.fromTo(this.el.nativeElement,
      { autoAlpha: 0, y: -100 },
      {
        autoAlpha: 1,
        y: 0,
        duration: this.duration,
        ease: 'power3.out',
        delay: this.delay,
        scrollTrigger: {
          scroller: '.sidenav-content',
          trigger: this.el.nativeElement,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }

  enterBatch() {
    ScrollTrigger.batch(this.el.nativeElement.children, {
      scroller: '.sidenav-content',
      start: 'top bottom',
      end: 'bottom start',
      onEnter: batch => gsap.fromTo(
        batch,
        {
          opacity: 0,
          y: -100,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: 'power1.out',
          duration: 0.4
        }),
    })
  }

  enterRight() {
    gsap.fromTo(this.el.nativeElement,
      { autoAlpha: 0, x: 100 },
      {
        autoAlpha: 1,
        x: 0,
        duration: this.duration,
        ease: 'power3.out',
        delay: this.delay,
        scrollTrigger: {
          scroller: '.sidenav-content',
          trigger: this.el.nativeElement,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }

  enterBottom() {
    gsap.fromTo(this.el.nativeElement,
      { autoAlpha: 0, y: 100 },
      {
        autoAlpha: 1,
        y: 0,
        duration: this.duration,
        ease: 'power3.out',
        delay: this.delay,
        scrollTrigger: {
          scroller: '.sidenav-content',
          trigger: this.el.nativeElement,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }

  enterLeft() {
    gsap.fromTo(this.el.nativeElement,
      { autoAlpha: 0, x: -100 },
      {
        autoAlpha: 1,
        x: 0,
        duration: this.duration,
        ease: 'power3.out',
        delay: this.delay,
        scrollTrigger: {
          scroller: '.sidenav-content',
          trigger: this.el.nativeElement,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }

}