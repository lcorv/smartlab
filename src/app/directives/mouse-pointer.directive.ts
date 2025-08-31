import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appMousePointer]'
})
export class MousePointerDirective {
  pointer;
  x;
  y;
  interval;
  constructor() {
  }
  ngAfterViewInit() {
    this.pointer = document.querySelector('.pointer-follow');
  }
  @HostListener('mousemove', ['$event']) onMousemove(e: MouseEvent) {
    let x = e.clientX;
    let y = e.clientY;
    if (this.pointer) {
        this.pointer.style.transition = 'all 0.2s ease-out'
        this.pointer.style.left = x + 'px';
        this.pointer.style.top = y + 'px';
    }

  }

}
