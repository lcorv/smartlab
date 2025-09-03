import { Component, inject } from '@angular/core';
import { Orario } from '../shared/orario';
import { OrariService } from '../services/orari.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { DateAdapter } from '@angular/material/core';
import { AlertService } from '../services/alert.service';


@Component({
  selector: 'app-gestisci-orari',
  imports: [CommonModule, MatIconModule, MatSlideToggleModule, MatTimepickerModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './gestisci-orari.component.html',
  styleUrl: './gestisci-orari.component.scss'
})
export class GestisciOrariComponent {
  private readonly _adapter = inject<DateAdapter<unknown, unknown>>(DateAdapter);
  orariService = inject(OrariService);
  orari: Orario[];
  fb = inject(FormBuilder);
  alert = inject(AlertService);

  formData: FormGroup;

  ngOnInit(): void {
    this.getOrari();
    this.createForm();
    this._adapter.setLocale('it-IT');
  }

  saveOrario() {
    let orario = this.formData.value;
    if (orario.apertura_mattina)
      orario.apertura_mattina = this.estraiOra(orario.apertura_mattina);
    if (orario.chiusura_mattina)
      orario.chiusura_mattina = this.estraiOra(orario.chiusura_mattina);
    if (orario.apertura_pomeriggio)
      orario.apertura_pomeriggio = this.estraiOra(orario.apertura_pomeriggio);
    if (orario.chiusura_pomeriggio)
      orario.chiusura_pomeriggio = this.estraiOra(orario.chiusura_pomeriggio);
    this.orariService.updateOrari(this.formData.value).subscribe({
      next:(res)=>{ 
        this.alert.showSuccess(res.message);
        this.formData.reset();
        this.getOrari();
      }
    })
  }

  createForm() {
    this.formData = this.fb.group({
      giorno_settimana: ['', Validators.required],
      aperto: ['', Validators.required],
      apertura_mattina: [''],
      chiusura_mattina: ['',],
      apertura_pomeriggio: [''],
      chiusura_pomeriggio: [''],

    })
  }

  getOrari(): void {
    this.orariService.getOrari().subscribe({
      next: (data) => {
        this.orari = data;
      },
      error: (err) => {
        console.error('Errore durante il recupero degli orari:', err);
      }
    });
  }

  estraiOra(date: Date) {
    let o = date.getHours();
    let m = date.getMinutes();
    let ora = `${o}:${m}:00`;
    return ora
  }

  format(hour) {
    let format = hour.split(':');
    let date = new Date();
    date.setHours(format[0], format[1], 0);
    return date;
  }

  rimuoviOrario(control) {
    this.formData.get(control)!.reset() // formControl reset 

  }

  onEdit(data: Orario) {
    let orario = JSON.parse(JSON.stringify(data));
    if (orario.apertura_mattina)
      orario.apertura_mattina = this.format(orario.apertura_mattina);
    if (orario.apertura_pomeriggio)
      orario.apertura_pomeriggio = this.format(orario.apertura_pomeriggio);
    if (orario.chiusura_mattina)
      orario.chiusura_mattina = this.format(orario.chiusura_mattina);
    if (orario.chiusura_pomeriggio)
      orario.chiusura_pomeriggio = this.format(orario.chiusura_pomeriggio);
    console.log(orario)
    this.formData.patchValue(orario)
  }

}
