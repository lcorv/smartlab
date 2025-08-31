import { Component } from '@angular/core';
import { SERVIZI } from '../shared/servizi';
import { CommonModule } from '@angular/common';
import { flyIn } from '../animations/enterAnimations';
import { ParallaxDirective } from '../directives/parallax.directive';
import { StaggerDirective } from '../directives/stagger.directive';
import { EnterDirective } from "../directives/enter.directive";
import { MatRippleModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-servizi',
  imports: [ParallaxDirective, CommonModule, StaggerDirective, EnterDirective, MatRippleModule, RouterModule],
  animations: [flyIn()],
  templateUrl: './servizi.component.html',
  styleUrl: './servizi.component.scss'
})
export class ServiziComponent {
  servizi = SERVIZI;
  init = false;

  ngOnInit() {
    this.init = true;
  }

}
