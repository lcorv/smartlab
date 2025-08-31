import { Directive, ElementRef } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Directive({
  selector: '[appNavbar]'
})
export class NavbarDirective {
  scrollWhatcher: HTMLDivElement;
  navObserver: IntersectionObserver;
  constructor(
    private el: ElementRef,
  ) { }
ngOnInit(){
  this.scrollWhatcher = document.createElement('div');
  this.scrollWhatcher.setAttribute('data-scroll-watcher','');
  this.navObserver = new IntersectionObserver((entries)=>{
    this.el.nativeElement.classList.toggle('sticking', !entries[0].isIntersecting)
  })
  }
ngAfterViewInit(){
  this.el.nativeElement.before(this.scrollWhatcher);
  this.navObserver.observe(this.scrollWhatcher)
}
}
