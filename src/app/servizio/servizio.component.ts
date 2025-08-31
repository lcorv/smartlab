import { CommonModule} from '@angular/common';
import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servizio',
  imports: [CommonModule],
  templateUrl: './servizio.component.html',
  styleUrl: './servizio.component.scss'
})
export class ServizioComponent {
constructor(private route: ActivatedRoute) { }

ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  console.log('id',id);
}
}
