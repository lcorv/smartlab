import { Component } from '@angular/core';
import { ORARI } from '../shared/orari';
import { CommonModule } from '@angular/common';
import { AbbreviaPipe } from "../pipes/abbrevia.pipe";

@Component({
  selector: 'app-orari',
  imports: [CommonModule, AbbreviaPipe],
  templateUrl: './orari.component.html',
  styleUrl: './orari.component.scss'
})
export class OrariComponent {
  orari = ORARI;
  get today() {
    const days = ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'];
    const d = new Date();
    return days[d.getDay()];
  }
}
