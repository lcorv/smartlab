import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appShowmore]'
})
export class ShowmoreDirective {

  constructor(
    private el: ElementRef,
  ) { }
@HostListener('click') onclick(){
  let content = this.el.nativeElement.previousSibling.children[0];
  this.el.nativeElement.previousSibling.classList.toggle('hidden');
  if(this.el.nativeElement.previousSibling.classList.contains('hidden')){
    this.el.nativeElement.previousSibling.style.height = '0px';
    this.el.nativeElement.innerHTML= 'Mostra di più..';
  }
  else{
    this.el.nativeElement.innerHTML = 'Mostra meno';
    this.el.nativeElement.previousSibling.style.height = content.clientHeight+'px';
    console.log(content.clientHeight+'px')
  }
}

}
