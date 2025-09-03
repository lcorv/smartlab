import { Component, inject } from '@angular/core';
import { Operatore } from '../shared/operatore';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TipoOperatore as TipoOperatore } from '../shared/operatori';
import { MatSelectModule } from '@angular/material/select';
import { OperatoriService } from '../services/operatori.service';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-create-operatore',
  imports: [MatFormField, MatButton, MatDialogModule, CommonModule, FormsModule, MatInputModule, MatSelectModule],
  templateUrl: './create-operatore.component.html',
  styleUrl: './create-operatore.component.scss'
})
export class CreateOperatoreComponent {
  operatoreService = inject(OperatoriService);
  selectedFile: File | null = null;
  dialogRef = inject(MatDialogRef<CreateOperatoreComponent>)

  operatore: Operatore = {
    id: 0,
    nome: '',
    immagine: '',
    descrizione: '',
    descrizione_breve: '',
    tipo: ''
  };

  tipiOperatori = Object.values(TipoOperatore);

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file; // Salva il file selezionato
      console.log('File selezionato:', file);
    }
  }

  onSubmit(): void {
    if (!this.selectedFile) {
      console.error('Nessun file selezionato.');
      return;
    }

    const formData = new FormData();
    formData.append('id', this.operatore.id.toString());
    formData.append('nome', this.operatore.nome);
    formData.append('descrizione', this.operatore.descrizione);
    formData.append('descrizione_breve', this.operatore.descrizione_breve);
    formData.append('tipo', this.operatore.tipo);
    formData.append('immagine', this.selectedFile); // Aggiungi il file immagine

    this.operatoreService.saveOperatore(formData).subscribe({
      next: (response) => {
        console.log('Operatore creato con successo:', response);
        this.dialogRef.close(true)
      },
      error: (err) => {
        console.error('Errore durante la creazione dell\'operatore:', err);
      }
    });
  }

  onCancel(): void {
    console.log('Operazione annullata');
    // Aggiungi qui la logica per annullare l'operazione
    this.dialogRef.close(false)
  }
}
