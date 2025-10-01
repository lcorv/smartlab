import { Component, Inject, inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { Avviso } from '../shared/avviso';
import { CommonModule } from '@angular/common';
import { MatButton } from "@angular/material/button";
import { AvvisiService } from '../services/avvisi.service';

@Component({
  selector: 'app-avvisi',
  imports: [],
  templateUrl: './avvisi.component.html',
  styleUrl: './avvisi.component.scss'
})
export class AvvisiComponent {
  private dialog = inject(MatDialog);
  private avvisiService = inject(AvvisiService);
  avvisi: Avviso[];

  ngOnInit(){
    this.avvisiService.getAvvisi().subscribe({
      next:(data)=>{
        this.avvisi = data;
        this.avvisi.forEach((avviso)=>{
          if(avviso.attivo)
          this.openDialog(avviso)
        })
      }
    })
  }

  openDialog(avviso: Avviso) {
    this.dialog.open(AvvisiDialogComponent, { data: avviso });
  }
}

@Component({
  selector: 'app-avvisi-dialog',
  imports: [MatDialogContent, CommonModule, MatButton, MatDialogModule],
  templateUrl: './avvisi.dialog.component.html',
  styleUrl: './avvisi.component.scss'
})

export class AvvisiDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public avviso: Avviso){}
  ngOnInit(){
    console.log(this.avviso)
  }
}