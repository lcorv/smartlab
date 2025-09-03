import { Component, inject } from '@angular/core';
import { SiteInfoService } from '../services/site-info.service';
import { SiteInfo } from '../shared/siteInfo';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-site-info',
  imports: [CommonModule, MatFormFieldModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './site-info.component.html',
  styleUrl: './site-info.component.scss'
})
export class SiteInfoComponent {
  infoService = inject(SiteInfoService);
  alert = inject(AlertService);
  fb = inject(FormBuilder);
  siteInfo: SiteInfo;
  siteInfoForm: FormGroup;

  constructor() {

    this.siteInfoForm = this.fb.group({
      site_name: ['', Validators.required],
      address: ['', Validators.required],
      maps: ['', Validators.required],
      phone: ['', Validators.required],
      whatsapp: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      facebook: [''],
      instagram: ['']
    });
  }

  ngOnInit() {
    this.infoService.getSiteInfo().subscribe({
      next: (data) => {
        this.siteInfo = data;
        this.siteInfoForm.patchValue(this.siteInfo);
      }
    })

  }
  onSubmit(): void {
    if (this.siteInfoForm.valid) {
      this.infoService.updateSiteInfo(this.siteInfoForm.value).subscribe({
        next: (res)=> {
          this.alert.showSuccess(res.message)
        }
      });
      console.log('Informazioni aggiornate:', this.siteInfoForm.value);
    } else {
      console.error('Il modulo non è valido.');
    }
  }
}
