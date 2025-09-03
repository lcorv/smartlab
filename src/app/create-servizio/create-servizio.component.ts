import { Component, inject } from '@angular/core';
import { Servizio } from '../shared/servizio';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ServiziService } from '../services/servizi.service';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-create-servizio',
  imports: [MatFormField, MatButton, MatDialogModule, CommonModule, FormsModule, MatInputModule, MatSelectModule],
  templateUrl: './create-servizio.component.html',
  styleUrls: ['./create-servizio.component.scss']
})
export class CreateServizioComponent {
  serviziService = inject(ServiziService);
  selectedFile: File | null = null;
  dialogRef = inject(MatDialogRef<CreateServizioComponent>);
  alert = inject(AlertService);

  servizio: Servizio = {
    id: 0,
    titolo: '',
    sottotitolo: '',
    descrizione: '',
    immagine: '',
    testo: ''
  };

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file; // Salva il file selezionato
      console.log('File selezionato:', file);
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('id', this.servizio.id.toString());
    formData.append('titolo', this.servizio.titolo);
    formData.append('sottotitolo', this.servizio.sottotitolo || '');
    formData.append('descrizione', this.servizio.descrizione || '');
    formData.append('testo', this.servizio.testo || '');

    if (this.selectedFile) {
      formData.append('immagine', this.selectedFile); // Aggiungi il file immagine
    }

    this.serviziService.saveServizio(formData).subscribe({
      next: (response) => {
        console.log('Servizio creato con successo:', response);
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Errore durante la creazione del servizio:', err);
      }
    });
  }

  onCancel(): void {
    console.log('Operazione annullata');
    this.dialogRef.close(false);
  }
}