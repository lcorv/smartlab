import { Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appIcons]'
})
export class IconsDirective {
observer;
  constructor(
    private el: ElementRef
  ) { }
  ngOnInit(){
    this.observer = new IntersectionObserver((entries)=>{
        this.el.nativeElement.classList.toggle('animicon', !entries[0].isIntersecting)
    })
    this.observer.observe(this.el.nativeElement)
    }
  }
