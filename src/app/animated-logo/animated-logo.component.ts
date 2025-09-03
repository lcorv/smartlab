import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-animated-logo',
  imports: [LottieComponent],
  templateUrl: './animated-logo.component.html',
  styleUrl: './animated-logo.component.scss'
})
export class AnimatedLogoComponent {
  options: AnimationOptions = {
    path: '/images/logo.json',
    loop: false
  };
  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
}
