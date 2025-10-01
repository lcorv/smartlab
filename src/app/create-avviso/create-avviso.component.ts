import { Component, inject } from '@angular/core';
import { AvvisiService } from '../services/avvisi.service';
import { MatDialogRef, MatDialogContent } from '@angular/material/dialog';
import { Avviso, tipoAvviso } from '../shared/avviso';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-create-avviso',
  imports: [CommonModule, MatButtonModule, MatSlideToggleModule, MatDialogContent, MatInputModule, MatSelectModule, ReactiveFormsModule, FormsModule, MatDatepickerModule],
  templateUrl: './create-avviso.component.html',
  styleUrl: './create-avviso.component.scss'
})
export class CreateAvvisoComponent {
  avvisoService = inject(AvvisiService);
  formData: FormGroup;
  fb = inject(FormBuilder);
  selectedFile: File | null = null;
  dialogRef = inject(MatDialogRef<CreateAvvisoComponent>)


  tipiAvvisi = Object.values(tipoAvviso);

  ngOnInit() {
    this.formData = this.fb.group({
      id: [],
      attivo: [],
      titolo: ['', Validators.required],
      tipo: ['', Validators.required],
      testo: [],
      immagine: [],
      descrizione: [],
      data_inizio: [],
      data_fine: [],
    })
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file; // Salva il file selezionato
      console.log('File selezionato:', file);
    }
  }

  onSubmit(): void {

    const data = new FormData();
    data.append('attivo', this.formData.value.attivo);
    data.append('titolo', this.formData.value.titolo);
    data.append('tipo', this.formData.value.tipo);
    if (this.formData.value.testo)
      data.append('testo', this.formData.value.testo);
    if (this.formData.value.descrizione)
      data.append('descrizione', this.formData.value.descrizione);
    if (this.formData.value.data_inizio)
      data.append('data_inizio', this.formData.value.data_inizio);
    if (this.formData.value.data_fine)
      data.append('data_fine', this.formData.value.data_fine);

    if (this.selectedFile) {
      data.append('image', this.selectedFile);
    }
    console.log(data)
    this.avvisoService.saveAvviso(data).subscribe({
      next: (response) => {
        console.log('Avviso creato con successo:', response);
        this.dialogRef.close(true)
      },
      error: (err) => {
        console.error('Errore durante la creazione dell\'avviso:', err);
      }
    });
  }

  onCancel(): void {
    console.log('Operazione annullata');
    // Aggiungi qui la logica per annullare l'operazione
    this.dialogRef.close(false)
  }
}
