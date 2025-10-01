import { Component, inject, OnInit } from '@angular/core';
import { Avviso, tipoAvviso } from '../shared/avviso';
import { AvvisiService } from '../services/avvisi.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { AlertService } from '../services/alert.service';
import { Location } from '@angular/common';
import { CreateAvvisoComponent } from '../create-avviso/create-avviso.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-gestisci-avvisi',
  templateUrl: './gestisci-avvisi.component.html',
  styleUrls: ['./gestisci-avvisi.component.scss'],
  imports: [ FormsModule, MatIconModule, MatButtonModule, CommonModule, MatSlideToggleModule]
})
export class GestisciAvvisiComponent implements OnInit {
  avvisi: Avviso[] = [];
  tipiAvviso = Object.values(tipoAvviso);
  avvisiService = inject(AvvisiService);
  dialog = inject(MatDialog);
  alert = inject(AlertService);
  location = inject(Location);

  params = {
    orderBy: 'titolo',
    dir: 'ASC'
  };

  ngOnInit(): void {
    this.getAvvisi(this.params);
  }

  getAvvisi(params?): void {
    this.avvisiService.getAvvisi(params).subscribe({
      next: (data) => {
        this.avvisi = data;
      },
      error: (err) => {
        console.error('Errore durante il recupero degli avvisi:', err);
      }
    });
  }

  onCreate(): void {
    this.dialog.open(CreateAvvisoComponent).afterClosed().subscribe((res) => {
      if (res) {
        this.alert.showSuccess('Avviso creato con successo.');
        this.getAvvisi(this.params);
      }
    });
  }

  toggleAvviso(avviso:Avviso){
    console.log('attivo',avviso.attivo)
    avviso.attivo = !avviso.attivo;
    let attivazione = avviso.attivo?'attivato':'disattivato';
    this.avvisiService.updateAvviso(avviso).subscribe({
      next: (res)=> this.alert.showSuccess(`Avviso ${attivazione}`)
    })
  }

  onEdit(avviso: Avviso): void {
    this.dialog.open(ModificaAvvisoDialog, {
      data: avviso
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.alert.showSuccess(`${avviso.titolo} aggiornato con successo.`);
        this.getAvvisi(this.params);
      }
    });
  }

  onDelete(avviso: Avviso): void {
    const id = avviso.id;
    this.dialog.open(ConfirmationComponent, {
      data: {
        nome: avviso.titolo
      }
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.avvisiService.deleteAvviso(id).subscribe({
          next: () => {
            this.alert.showSuccess(`Avviso ${avviso.titolo} eliminato.`);
            this.avvisi = this.avvisi.filter((a) => a.id !== id);
          },
          error: (err) => {
            console.error('Errore durante l\'eliminazione dell\'avviso:', err);
          }
        });
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}

@Component({
  selector: 'gestisci-avvisi-dialog',
  templateUrl: 'gestisci-avvisi-dialog.html',
  imports: [MatDialogTitle, MatButtonModule, MatDialogContent, MatDatepickerModule, MatFormFieldModule, FormsModule, CommonModule, MatSelectModule, ReactiveFormsModule, MatInputModule],
})
export class ModificaAvvisoDialog {
  avviso: Avviso = inject(MAT_DIALOG_DATA);
  fb = inject(FormBuilder);

  dialogRef = inject(MatDialogRef<ModificaAvvisoDialog>);

  avvisiService = inject(AvvisiService);

  tipoAvvisi = Object.values(tipoAvviso);

  formData: FormGroup;


  ngOnInit() {
    console.log(this.avviso);
    this.formData = this.fb.group({
      id: [this.avviso.id],
      attivo: [this.avviso.attivo],
      titolo: [this.avviso.titolo, Validators.required],
      tipo: [this.avviso.tipo, Validators.required],
      testo: [this.avviso.testo],
      descrizione: [this.avviso.descrizione],
      data_inizio: [this.avviso.data_inizio],
      data_fine: [this.avviso.data_fine],
    })
  }


  onSubmit(): void {
    console.log(this.formData.value)
    this.avvisiService.updateAvviso(this.formData.value).subscribe({
      next: (response) => {
        console.log('Avviso aggiornato con successo:', response);
        this.dialogRef.close(true)
      },
      error: (err) => {
        console.error('Errore durante l\'aggiornamento dell\'avviso:', err);
      }
    });
  }

  onCancel(): void {
    console.log('Modifica annullata');
    // Chiudi il dialog o aggiungi altra logica
    this.dialogRef.close(false)

  }
}
