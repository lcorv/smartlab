import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EnterDirective } from '../directives/enter.directive';
import { Icons } from '../shared/icons';
import { CommonModule } from '@angular/common';
import { ParallaxDirective } from '../directives/parallax.directive';
import { flyIn } from '../animations/enterAnimations';

@Component({
  selector: 'app-about',
  animations: [flyIn()],
  imports: [FontAwesomeModule, EnterDirective, ParallaxDirective, CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  Icons = Icons;
  init = false

  ngAfterViewInit() {
    setTimeout(() => {
      this.init = true
    }, 100);
  }
}
