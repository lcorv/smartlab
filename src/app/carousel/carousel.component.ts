import { AfterViewInit, ChangeDetectorRef, Component, effect, ElementRef, Inject, inject, input, Input, NgZone, signal, viewChild, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TipoOperatore } from '../shared/operatori';
import { OperatoriService } from '../services/operatori.service';
import { Operatore } from '../shared/operatore';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../services';
import { EnterDirective } from "../directives/enter.directive";
import { Icons } from '../shared/icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
	selector: 'app-carousel',
	imports: [FontAwesomeModule, FormsModule, MatRippleModule, CommonModule, EnterDirective],
	templateUrl: './carousel.component.html',
	styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements AfterViewInit {
	readonly carouselContainer = viewChild<ElementRef>('carouselContainer');

	icons = Icons;
	@Input() slide: boolean;
	TipoOperatore = TipoOperatore
	operatoriService = inject(OperatoriService);
	dialog = inject(MatDialog);
	cdf = inject(ChangeDetectorRef);
	zone = inject(NgZone);
	paused = false;
	operatori: Operatore[];
	unpauseOnArrow = false;
	pauseOnIndicator = false;
	pauseOnHover = true;
	pauseOnFocus = true;
	init: boolean = true;

	currentIndex = signal(1);
	transformValue: string = '0';
	noTransition: boolean = false;

	ngOnInit() {
		this.getOperatori()
	}

	ngAfterViewInit() {
	}

	inizializzaCarosello(array: any[]) {
		// Duplica gli elementi per il loop infinito
		let fakeId = 99999;
		const firstItem = JSON.parse(JSON.stringify(array[0]));
		firstItem.id = fakeId++;
		const lastItem = JSON.parse(JSON.stringify(array[array.length - 1]));
		lastItem.id = fakeId;
		array.unshift(lastItem);
		array.push(firstItem);
	}

	getOperatori() {
		this.operatoriService.getOperatori().subscribe({
			next: (operatori) => {
				this.operatori = operatori;
				this.inizializzaCarosello(this.operatori);
			},
			error: (err) => console.log(err)
		})
	}

	onScrollEnd() {
		const container = this.carouselContainer();
		if (container) {
			let scrollLeft = container.nativeElement.scrollLeft;
			let width = container.nativeElement.scrollWidth - container.nativeElement.clientWidth / 3;
			let scrollValue = Math.round((scrollLeft * this.operatori.length) / width);

			if (this.init) {
				let left = 1 * width / this.operatori.length
				setTimeout(() => {
					container.nativeElement.scrollTo({ left: left, behavior: 'instant' });
					this.init = false;
				}, 0)
				return
			}
			this.currentIndex.set(scrollValue) ;
		
			if (this.currentIndex() == this.operatori.length - 1) {
				let left = 1 * width / this.operatori.length
				setTimeout(() => {
					container.nativeElement.scrollTo({ left: left, behavior: 'instant' });
				}, 0)
			}
			if (this.currentIndex() == 0) {
				let left = (this.operatori.length - 2) * width / this.operatori.length
				setTimeout(() => {
					container.nativeElement.scrollTo({ left: left, behavior: 'instant' });
				}, 0)
			}
		}
	}


	nextSlide(): void {
		const container = this.carouselContainer();
		if (container) {
			container.nativeElement.scrollBy({ left: container.nativeElement.offsetWidth / 3, behavior: 'smooth' });
		}
	}

	prevSlide(): void {
		const container = this.carouselContainer();
		if (container) {
			container.nativeElement.scrollBy({ left: -container.nativeElement.offsetWidth / 3, behavior: 'smooth' });
		}
	}

	openDialog(operatore: Operatore) {
		const dialogRef = this.dialog.open(ServiziDialog, {
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
	analytics = inject(AnalyticsService);
	constructor(@Inject(MAT_DIALOG_DATA) public operatore: Operatore) { }
	ngOnInit() {
		this.analytics.trackEvent('open_dialog_operatori', `apertura_dialog_${this.operatore.nome}`, 'informazioni')
	}

}
