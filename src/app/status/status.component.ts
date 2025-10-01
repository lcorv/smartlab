import { Component, inject, OnInit } from '@angular/core';
import { OrariService, WeeklySchedule } from '../services/orari.service';
import { CommonModule } from '@angular/common';
import { AvvisiService } from '../services/avvisi.service';
import { tipoAvviso } from '../shared/avviso';

@Component({
  selector: 'app-status',
  imports: [CommonModule],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent implements OnInit {
  private orariService = inject(OrariService);
  private avvisiService = inject(AvvisiService);
  status: { status: 'aperto' | 'chiuso'; nextTime: string; class: string };
  prossimaRiapertura: Date | undefined;

  ngOnInit() {
    this.avvisiService.getAvvisi().subscribe({
      next: (res)=>{
        let riaperture = res.filter((avviso)=>
          avviso.tipo==tipoAvviso.chiusura&&avviso.attivo)
        .filter((avviso)=>new Date(avviso.data_fine!).getTime()>new Date().getTime())
        .filter((avviso)=>new Date(avviso.data_inizio!).getTime()<new Date().getTime())
        .map((avviso)=>avviso.data_fine)
        riaperture.sort();
        if(riaperture.length>0)
        this.prossimaRiapertura = riaperture[0]
        console.log(riaperture)
      }
    })
    this.orariService.getOrari().subscribe({
      next: (data) => {
        const weeklySchedule: WeeklySchedule = {
          lunedì: this.orariService.convertRawSchedule(data[0]),
          martedì: this.orariService.convertRawSchedule(data[1]),
          mercoledì: this.orariService.convertRawSchedule(data[2]),
          giovedì: this.orariService.convertRawSchedule(data[3]),
          venerdì: this.orariService.convertRawSchedule(data[4]),
          sabato: this.orariService.convertRawSchedule(data[5]),
          domenica: this.orariService.convertRawSchedule(data[6]),
        };
        // Utilizzo per il momento attuale
        const now = new Date();
        const status = this.orariService.checkStoreStatus(weeklySchedule, now);
        this.status = status;
      }
    })
  }

}
