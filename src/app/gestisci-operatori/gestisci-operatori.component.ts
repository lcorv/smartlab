import { Component, inject, OnInit } from '@angular/core';
import { ServiziDialog } from '../carousel/carousel.component';
import { Operatore } from '../shared/operatore';
import { OperatoriService } from '../services/operatori.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'; import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TipoOperatore } from '../shared/operatori';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { Icons } from '../shared/icons';
import { CreateOperatoreComponent } from '../create-operatore/create-operatore.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-gestisci-operatori',
  imports: [MatIconModule, MatButtonModule, CommonModule, FontAwesomeModule],
  templateUrl: './gestisci-operatori.component.html',
  styleUrl: './gestisci-operatori.component.scss'
})
export class GestisciOperatoriComponent implements OnInit {
  icons = Icons;

  operatori: Operatore[] = [];
  tipiOperatori = Object.values(TipoOperatore);
  operatoriService = inject(OperatoriService);
  dialog = inject(MatDialog);
  location = inject(Location);
  alert = inject(AlertService);

  params = {
    orderBy: 'nome',
    dir: 'ASC'
  }

  order(orderBy:string){
    let dir = this.params.dir=='ASC'?'DESC':'ASC';
    this.params = {
      orderBy: orderBy,
      dir: dir
    }
    this.getOperatori(this.params)
  }


  ngOnInit(): void {
    this.getOperatori(this.params);
  }

  getOperatori(params?): void {
    this.operatoriService.getOperatori(params).subscribe({
      next: (data) => {
        this.operatori = data;
      },
      error: (err) => {
        console.error('Errore durante il recupero degli operatori:', err);
      }
    });
  }

  openPreview(servizio) {
    this.dialog.open(ServiziDialog, { data: servizio })
  }

  onCreate(): void {
    console.log('Crea operatore');
    this.dialog.open(CreateOperatoreComponent).afterClosed()
      .subscribe(res => {
        if (res) {
          this.alert.showSuccess('Operatore creato con successo.')
          this.operatoriService.getOperatori().subscribe({
            next: (data) => this.operatori = data,
            error: (err) => console.log(err)
          })
        }
      })
  }

  onEdit(operatore: Operatore): void {
    console.log('Modifica operatore:', operatore);
    this.dialog.open(ModificaOperatoreDialog, {
      data: operatore
    }).afterClosed().subscribe(res => {
      if (res) {
        this.alert.showSuccess(`${operatore.nome} aggiornato con successo.`)
        this.operatoriService.getOperatori().subscribe({
          next: (data) => this.operatori = data,
          error: (err) => console.log(err)
        })
      }
    })
    // Aggiungi qui la logica per modificare l'operatore
  }

  onDelete(operatore: Operatore): void {
    let id = operatore.id;
    this.dialog.open(ConfirmationComponent, {
      data: {
        nome: operatore.nome
      }
    }).afterClosed()
      .subscribe((res) => {
        if (res) {
          this.operatoriService.deleteOpertatore(id).subscribe(
            {
              next: (res) => {
                this.alert.showSuccess(`Operatore ${operatore.nome} eliminato.`)
                this.operatori = this.operatori.filter((operatore) =>
                  operatore.id !== id
                )
              },
            }
          )
        }
      })
  }

  goBack() {
    this.location.back()
  }
}

@Component({
  selector: 'gestisci-operatori-dialog',
  templateUrl: 'gestisci-operatori-dialog.html',
  imports: [MatDialogTitle, MatButtonModule, MatDialogContent, MatFormFieldModule, FormsModule, CommonModule, MatSelectModule, ReactiveFormsModule, MatInputModule],
})
export class ModificaOperatoreDialog {
  operatore: Operatore = inject(MAT_DIALOG_DATA);
  fb = inject(FormBuilder);

  dialogRef = inject(MatDialogRef<ModificaOperatoreDialog>);

  operatoriService = inject(OperatoriService);

  tipiOperatori = Object.values(TipoOperatore);

  formData: FormGroup;


  ngOnInit() {
    console.log(this.operatore);
    this.formData = this.fb.group({
      id: [this.operatore.id],
      nome: [this.operatore.nome, Validators.required],
      tipo: [this.operatore.tipo],
      descrizione: [this.operatore.descrizione],
      descrizione_breve: [this.operatore.descrizione_breve]
    })
  }


  onSubmit(): void {

    this.operatoriService.updateOperatore(this.formData.value).subscribe({
      next: (response) => {
        console.log('Operatore aggiornato con successo:', response);
        this.dialogRef.close(true)
      },
      error: (err) => {
        console.error('Errore durante l\'aggiornamento dell\'operatore:', err);
      }
    });
  }

  onCancel(): void {
    console.log('Modifica annullata');
    // Chiudi il dialog o aggiungi altra logica
    this.dialogRef.close(false)

  }
}
