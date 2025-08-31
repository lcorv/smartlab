import { Component, OnInit } from '@angular/core';
import { Icons } from '../shared/icons';
import { CONSTANTS } from '../shared/constants';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { IconsDirective } from '../directives/icons.directive';
import { OrariComponent } from '../orari/orari.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [FontAwesomeModule, CommonModule, IconsDirective, OrariComponent]
})
export class FooterComponent implements OnInit {
  constants = CONSTANTS;
  Icons = Icons;
  date = new Date(Date.now());
  constructor() { }

  ngOnInit(): void {
  }

}
