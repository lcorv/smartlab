import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatInputModule } from '@angular/material/input';
import { Icons } from '../shared/icons';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EnterDirective } from '../directives/enter.directive';
import { MatButtonModule } from '@angular/material/button';
import { flyIn } from '../animations/enterAnimations';
import { ParallaxDirective } from '../directives/parallax.directive';
import { CONSTANTS } from '../shared/constants';
import { SiteInfo } from '../shared/siteInfo';
import { SiteInfoService } from '../services/site-info.service';
import { AnalyticsService } from '../services';
import { AnimatedLogoComponent } from "../animated-logo/animated-logo.component";

@Component({
  selector: 'app-contact',
  imports: [FontAwesomeModule, FormsModule, CommonModule, ReactiveFormsModule, EnterDirective, MatInputModule, MatButtonModule, ParallaxDirective, AnimatedLogoComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  animations: [flyIn()],


})
export class ContactComponent implements OnInit {
  Icons = Icons;
  constants: SiteInfo;
  infoService = inject(SiteInfoService);
  analytics = inject(AnalyticsService);
  emailLink: string = '';
  email: string;
  telNum: string;
  whatsapp: string;
  wmsg: string = '';
  contactForm: FormGroup;
  whatsappForm: FormGroup;
  @ViewChild('cForm') contactFormDirective;
  formErrors = {
    'firstname': '',
    'subject': '',
    'message': '',
    'email': '',
  };
  whatsappErrors = {
    'message': '',
  };

  validationMessages = {
    'firstname': {
      'required': 'Il nome è richiesto',
      'minlength': 'Il nome deve essere lungo almeno 2 caratteri',
      'maxlength': 'Il nome non può essere più lungo di 25 caratteri'
    },
    'subject': {
      'required': 'L\'oggetto è richiesto',
      'minlength': 'L\'oggetto deve essere lungo almeno 2 caratteri',
      'maxlength': 'L\'oggetto non può essere più lungo di 25 caratteri'
    },
    'email': {
      'required': 'L\'email è richiesto',
      'email': 'Email in un formato non valido'
    },
    'message': {
      'required': 'Per favore, scrivi un messaggio',
    },
  }
  init: boolean = false;
  constructor(
    private fb: FormBuilder,
  ) { }
  ngAfterViewInit() {
    setTimeout(() => {
      this.init = true
    })
  }
  ngOnInit(): void {
    this.createForm();
    this.infoService.getSiteInfo().subscribe({
      next: (data) => {
        this.constants = data;
        this.email = data.email
        this.telNum = data.phone;
        this.whatsapp = data.whatsapp;
      }
    })
    this.analytics.trackEvent('page_view', 'pagina_contact_caricata', 'page_load')

  }
  onSubmit(media) {
    if (media == 'email') {
      this.analytics.trackEvent('contact_email', 'invio_email_contact_page', 'contact')
      let form = this.contactForm.value;
      this.emailLink = `mailto: ${this.email}?&subject=${form.subject}&body=${form.message}&body=${form.firstname}`
      console.log(this.emailLink)
      location.href = this.emailLink
    }
    if (media == 'whatsapp') {
      this.analytics.trackEvent('contact_whatsapp', 'invio_whatsapp_contact_page', 'contact')
      let form = this.whatsappForm.value;
      this.wmsg = `https://wa.me/${this.whatsapp}?text=${form.message}`;
      console.log(this.wmsg)
      open(this.wmsg);
    }
  }
  createForm() {

    this.contactForm = this.fb.group({
      subject: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      message: ['', [Validators.required]],

    });
    this.whatsappForm = this.fb.group({
      message: ['', [Validators.required]]
    })


    this.contactForm.setErrors({ 'invalid': true });
    this.contactForm.valueChanges
      .subscribe(data => this.onValueChanged(this.contactForm, this.formErrors, data));
    this.onValueChanged(this.contactForm, this.formErrors); //(re)set form validation messages
    this.whatsappForm.valueChanges
      .subscribe(data => this.onValueChanged(this.whatsappForm, this.whatsappErrors, data));
    this.onValueChanged(this.whatsappForm, this.whatsappErrors); //(re)set form validation messages
  }

  onValueChanged(form: FormGroup, formErrors, data?: any) {
    if (!this.contactForm) { return; }
    for (const field in formErrors) {
      if (formErrors.hasOwnProperty(field)) {
        //clear previous error validationMessages
        formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

}
