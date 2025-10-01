import { Component, ElementRef, inject, Input, input, signal, viewChild } from '@angular/core';
import { ReviewService } from '../services/review.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Icons } from '../shared/icons';
import { Review } from '../shared/review';
import { EnterDirective } from '../directives/enter.directive';

@Component({
  selector: 'app-reviews',
  imports: [CommonModule, FontAwesomeModule, MatCardModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {

  @Input() auto:boolean;
  @Input() interval: number;
  reviews: Review[];
  icons = Icons;
  init = true;
  currentIndex = signal(1);
  readonly carouselContainer = viewChild<ElementRef>('carouselContainer');


  private reviewService = inject(ReviewService);

  ngOnInit() {
    this.reviewService.getReviews().subscribe({
      next: (res) => {
        this.reviews = res['reviews'];
        this.inizializzaCarosello(this.reviews);
      }
    })
  }

  numSequence(n: number): Array<number> {
    return Array(n);
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
    if(this.auto){
      this.autoSlide();
    }
	}

  onScrollEnd(array: Review[]) {
		const container = this.carouselContainer();
		if (container) {
			let scrollLeft = container.nativeElement.scrollLeft;
			let width = container.nativeElement.scrollWidth - container.nativeElement.clientWidth / 3;
			let scrollValue = Math.round((scrollLeft * array.length) / width);

			if (this.init) {
				let left = 1 * width / array.length
				setTimeout(() => {
					container.nativeElement.scrollTo({ left: left, behavior: 'instant' });
					this.init = false;
				}, 0)
				return
			}
			this.currentIndex.set(scrollValue) ;
		
			if (this.currentIndex() == array.length - 1) {
				let left = 1 * width / array.length
				setTimeout(() => {
					container.nativeElement.scrollTo({ left: left, behavior: 'instant' });
				}, 0)
			}
			if (this.currentIndex() == 0) {
				let left = (array.length - 2) * width / array.length
				setTimeout(() => {
					container.nativeElement.scrollTo({ left: left, behavior: 'instant' });
				}, 0)
			}
		}
	}


	nextSlide(): void {
		const container = this.carouselContainer();
		if (container) {
      if(container.nativeElement.matches(':hover')){
        return
      }
			container.nativeElement.scrollBy({ left: container.nativeElement.offsetWidth / 3, behavior: 'smooth' });
		}
	}

	prevSlide(): void {
		const container = this.carouselContainer();
		if (container) {
			container.nativeElement.scrollBy({ left: -container.nativeElement.offsetWidth / 3, behavior: 'smooth' });
		}
	}

  autoSlide(){
    setInterval(()=>{
      this.nextSlide();
    }, this.interval)
  }

}
