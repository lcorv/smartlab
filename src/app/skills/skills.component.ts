import { Component, OnInit } from '@angular/core';
import { Icons } from '../shared/icons';
import { SKILLS } from '../shared/skills';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StaggerDirective } from "../directives/stagger.directive";

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  imports: [FontAwesomeModule, StaggerDirective],
})
export class SkillsComponent implements OnInit {
  faClock = Icons.faClock;
  skills = SKILLS;

  constructor() { }

  ngOnInit(): void {
  }

}
