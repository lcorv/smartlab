import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbbreviaPipe } from "../pipes/abbrevia.pipe";
import { Orario } from '../shared/orario';
import { OrariService } from '../services/orari.service';

@Component({
  selector: 'app-orari',
  imports: [CommonModule, AbbreviaPipe],
  templateUrl: './orari.component.html',
  styleUrl: './orari.component.scss'
})
export class OrariComponent {
  orari:Orario[];
  orariService = inject(OrariService);
  ngOnInit(){
    this.getOrari()
  }
  getOrari(){
    this.orariService.getOrari().subscribe({
      next: (data)=>{
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
