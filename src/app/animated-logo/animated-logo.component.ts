import { Component, Input } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-animated-logo',
  imports: [LottieComponent],
  templateUrl: './animated-logo.component.html',
  styleUrl: './animated-logo.component.scss'
})
export class AnimatedLogoComponent {
  @Input() path: string;
  options: AnimationOptions;
  ngOnInit(){
    this.options = {
      path: this.path,
      loop: false,
      renderer: 'svg',
    };

  }
  onAnimate(animationItem: AnimationItem): void {
  }
}
