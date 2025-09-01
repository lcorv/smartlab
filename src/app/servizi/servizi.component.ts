import { Component, Inject, inject } from '@angular/core';
import { SERVIZI } from '../shared/servizi';
import { CommonModule } from '@angular/common';
import { flyIn } from '../animations/enterAnimations';
import { ParallaxDirective } from '../directives/parallax.directive';
import { StaggerDirective } from '../directives/stagger.directive';
import { EnterDirective } from "../directives/enter.directive";
import { MatRippleModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { Servizio } from '../shared/servizio';
import { ServiziService } from '../services/servizi.service';
import { MatButtonModule } from '@angular/material/button';
import { CarouselComponent } from '../carousel/carousel.component';


@Component({
  selector: 'app-servizi',
  imports: [CarouselComponent, ParallaxDirective, CommonModule, EnterDirective, ParallaxDirective, MatRippleModule, RouterModule, MatDialogModule],
  animations: [flyIn()],
  templateUrl: './servizi.component.html',
  styleUrl: './servizi.component.scss'
})
export class ServiziComponent {
  servizi: Servizio[];
  init = false;
  serviziService = inject(ServiziService);
  dialog = inject(MatDialog);

  ngOnInit() {
    this.getServizi();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.init = true
    }, 100);
  }

  getServizi() {
    this.serviziService.getServizi().subscribe({
      next: (servizi) => this.servizi = servizi,
      error: (err) => console.log(err)
    });
  }
    openDialog(servizio: Servizio) {
    const dialogRef = this.dialog.open(ServiziDialog,{
      data: servizio
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'servizi-dialog.html',
  styleUrl: './servizi-dialog.component.scss',
  imports: [MatDialogModule, MatButtonModule]
})
export class ServiziDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public servizio: Servizio) {}

}
