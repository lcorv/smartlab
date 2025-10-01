import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbbreviaPipe } from "../pipes/abbrevia.pipe";
import { Orario } from '../shared/orario';
import { OrariService } from '../services/orari.service';
import { StatusComponent } from '../status/status.component';




@Component({
  selector: 'app-orari',
  imports: [CommonModule, AbbreviaPipe, StatusComponent],
  templateUrl: './orari.component.html',
  styleUrl: './orari.component.scss'
})
export class OrariComponent {
  orari: Orario[];
  orariService = inject(OrariService);
  status: { status: 'aperto' | 'chiuso'; nextTime: string; class: string };

  constructor(@Inject(PLATFORM_ID) private platformID: Object) { }

  ngOnInit() {
    this.orariService.getOrari().subscribe({
      next: (data) => {
        this.orari = data;
      }
    })
  }

  get today() {
    const days = ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'];
    const d = new Date();
    return days[d.getDay()];
  }

}
