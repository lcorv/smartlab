import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { flyIn } from '../animations/enterAnimations';
import { ParallaxDirective } from '../directives/parallax.directive';
import { EnterDirective } from "../directives/enter.directive";
import { MatRippleModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { Servizio } from '../shared/servizio';
import { ServiziService } from '../services/servizi.service';
import { MatButtonModule } from '@angular/material/button';
import { CarouselComponent } from '../carousel/carousel.component';
import { AnalyticsService } from '../services';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Icons } from '../shared/icons';
import { AnimatedLogoComponent } from "../animated-logo/animated-logo.component";


@Component({
  selector: 'app-servizi',
  imports: [CarouselComponent, FontAwesomeModule, ParallaxDirective, CommonModule, EnterDirective, ParallaxDirective, MatRippleModule, RouterModule, MatDialogModule, AnimatedLogoComponent],
  animations: [flyIn()],
  templateUrl: './servizi.component.html',
  styleUrl: './servizi.component.scss'
})
export class ServiziComponent {
  servizi: Servizio[];
  init = false;
  icons = Icons;
  serviziService = inject(ServiziService);
  dialog = inject(MatDialog);
  analytics = inject(AnalyticsService);

  ngOnInit() {
    this.getServizi();
    this.analytics.trackEvent('page_view', 'pagina_servizi_caricata', 'page_load');
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.init = true
    }, 100);
  }

  getServizi() {
    this.serviziService.getServizi().subscribe({
      next: (servizi) => {
        this.servizi = servizi;
      },
      error: (err) => console.log(err)
    });
  }
  openDialog(servizio: Servizio) {
    const dialogRef = this.dialog.open(ServiziDialog, {
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

  constructor(@Inject(MAT_DIALOG_DATA) public servizio: Servizio) { }
  analytics = inject(AnalyticsService);
  ngOnInit() {
    this.analytics.trackEvent('open_dialog_servizi', `apertura_dialog_${this.servizio.titolo}`, 'informazioni')
  }

}
