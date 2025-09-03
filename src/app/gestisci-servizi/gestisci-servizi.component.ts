import { Component, inject, OnInit } from '@angular/core';
import { Servizio } from '../shared/servizio';
import { ServiziService } from '../services/servizi.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CreateServizioComponent } from '../create-servizio/create-servizio.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ServiziDialog } from '../servizi/servizi.component';
import { AlertService } from '../services/alert.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
@Component({
  selector: 'app-gestisci-servizi',
  templateUrl: './gestisci-servizi.component.html',
  styleUrls: ['./gestisci-servizi.component.scss'],
  imports: [MatIconModule, MatButtonModule, CommonModule, CommonModule]
})
export class GestisciServiziComponent implements OnInit {
  servizi: Servizio[] = [];
  alert = inject(AlertService);
  serviziService = inject(ServiziService);
  dialog = inject(MatDialog);

  params = {
    orderBy : 'titolo',
    dir: 'ASC'
  }

  order(orderBy:string){
    let dir = this.params.dir=='ASC'?'DESC':'ASC';
    this.params = {
      orderBy: orderBy,
      dir: dir
    }
    this.getServizi(this.params)
  }

  ngOnInit(): void {
    this.getServizi(this.params);
  }

  getServizi(params): void {
    this.serviziService.getServizi(params).subscribe({
      next: (data) => {
        this.servizi = data;
      },
      error: (err) => {
        console.error('Errore durante il recupero dei servizi:', err);
      }
    });
  }

  onCreate(): void {
    this.dialog.open(CreateServizioComponent).afterClosed().subscribe(res => {
      if (res) {
        this.alert.showSuccess('Servizio creato con successo.')
        this.getServizi(this.params);
      }
    });
  }

  onEdit(servizio: Servizio): void {
    this.dialog.open(ModificaServizioDialog, {
      data: servizio
    }).afterClosed().subscribe(res => {
      if (res) {
        this.alert.showSuccess(`${servizio.titolo} aggiornato con successo.`)
        this.getServizi(this.params);
      }
    });
  }

  openPreview(servizio) {

    this.dialog.open(ServiziDialog, { data: servizio })
  }

  onDelete(servizio: Servizio): void {
    let id = servizio.id;
    this.dialog.open(ConfirmationComponent, {
      data: {
        nome: servizio.titolo
      }
    }).afterClosed()
      .subscribe((res) => {
        if (res) {
          this.serviziService.deleteServizio(id).subscribe(
            {
              next: (res) => {
                this.alert.showSuccess(`Servizio ${servizio.titolo} eliminato.`)
                this.servizi = this.servizi.filter((servizio) =>
                  servizio.id !== id
                )
              },
            }
          )
        }
      })
  }
}

@Component({
  selector: 'gestisci-servizi-dialog',
  templateUrl: 'gestisci-servizi-dialog.html',
  imports: [MatDialogTitle, MatButtonModule, MatDialogContent, MatFormFieldModule, FormsModule, CommonModule, MatSelectModule, ReactiveFormsModule, MatInputModule],
})
export class ModificaServizioDialog {
  servizio: Servizio = inject(MAT_DIALOG_DATA);
  fb = inject(FormBuilder);

  dialogRef = inject(MatDialogRef<ModificaServizioDialog>);

  serviziService = inject(ServiziService);

  formData: FormGroup;


  ngOnInit() {
    this.formData = this.fb.group({
      id: [this.servizio.id],
      titolo: [this.servizio.titolo, Validators.required],
      sottotitolo: [this.servizio.sottotitolo],
      descrizione: [this.servizio.descrizione],
      testo: [this.servizio.testo]
    })
  }


  onSubmit(): void {

    this.serviziService.updateServizio(this.formData.value).subscribe({
      next: (response) => {
        console.log('servizio aggiornato con successo:', response);
        this.dialogRef.close(true)
      },
      error: (err) => {
        console.error('Errore durante l\'aggiornamento dell\'servizio:', err);
      }
    });
  }

  onCancel(): void {
    console.log('Modifica annullata');
    // Chiudi il dialog o aggiungi altra logica
    this.dialogRef.close(false)

  }
}