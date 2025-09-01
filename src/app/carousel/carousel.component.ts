import { Component, Inject, inject, input, Input, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TipoOperatore } from '../shared/operatori';
import { OperatoriService } from '../services/operatori.service';
import { Operatore } from '../shared/operatore';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';

@Component({
	selector: 'app-carousel',
	imports: [NgbCarouselModule, FormsModule, MatRippleModule],
	templateUrl: './carousel.component.html',
	styleUrl: './carousel.component.scss'
})
export class CarouselComponent {

	@Input() slide: boolean;
	TipoOperatore = TipoOperatore
	operatoriService = inject(OperatoriService);
	dialog = inject(MatDialog);
	paused = false;
	operatori: Operatore[];
	unpauseOnArrow = false;
	pauseOnIndicator = false;
	pauseOnHover = true;
	pauseOnFocus = true;

	@ViewChild('carousel', { static: true }) carousel: NgbCarousel;

	ngOnInit(){
		this.getOperatori()
	}

	togglePaused() {
		if (this.paused) {
			this.carousel.cycle();
		} else {
			this.carousel.pause();
		}
		this.paused = !this.paused;
	}

	getOperatori() {
		this.operatoriService.getOperatori().subscribe({
			next: (operatori) => this.operatori = operatori,
			error: (err) => console.log(err)
		})
	}

	onSlide(slideEvent: NgbSlideEvent) {
		if (
			this.unpauseOnArrow &&
			slideEvent.paused &&
			(slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
		) {
			this.togglePaused();
		}
		if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
			this.togglePaused();
		}
	}

	  openDialog(operatore: Operatore) {
		const dialogRef = this.dialog.open(ServiziDialog,{
		  data: operatore
		});
	
		dialogRef.afterClosed().subscribe(result => {
		  console.log(`Dialog result: ${result}`);
		});
	  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'carousel-dialog.html',
  styleUrl: './carousel-dialog.scss',
  imports: [MatDialogModule, MatButtonModule]
})
export class ServiziDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public operatore: Operatore) {}

}
