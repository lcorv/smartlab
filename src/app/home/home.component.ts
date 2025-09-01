import { Component, OnInit, ViewChild } from '@angular/core';
import { flyInHome } from '../animations/enterAnimations';
import { delay } from 'rxjs';
import { SkillsComponent } from "../skills/skills.component";
import { ContactusComponent } from "../contactus/contactus.component";
import { CommonModule } from '@angular/common';
import { TextAnimationDirective } from '../directives/text-animation.directive';
import { BackgroundColorDirective } from '../directives/background-color.directive';
import { EnterDirective } from '../directives/enter.directive';
import { RouterModule } from '@angular/router';
import { ParallaxDirective } from '../directives/parallax.directive';
import { CarouselComponent } from '../carousel/carousel.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CONSTANTS } from '../shared/constants';
import { Icons } from '../shared/icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StaggerDirective } from "../directives/stagger.directive";
import { ScrubDirective } from "../directives/scrub.directive";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[flyInHome()],
  imports: [SkillsComponent, FontAwesomeModule, CarouselComponent, RouterModule, ContactusComponent, CommonModule, TextAnimationDirective, BackgroundColorDirective, EnterDirective, StaggerDirective, ParallaxDirective, StaggerDirective, ScrubDirective],
})
export class HomeComponent implements OnInit {
init:boolean = true;
constants = CONSTANTS;
icons = Icons;

  constructor() { }

  ngOnInit(): void {
    console.log('home init');
    this.init = true;
  }
  ngAfterViewInit(){
 
  }
 

}
