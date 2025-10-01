import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgcCookieConsentConfig, provideNgcCookieConsent } from 'ngx-cookieconsent';
import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { provideHttpClient } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideLottieOptions } from 'ngx-lottie';

import player from 'lottie-web/build/player/lottie_svg';

import { environment } from '../environments/environment';

const cookieConfig: NgcCookieConsentConfig = {
  "cookie": {
    "domain": environment.cookie
  },
  "position": "bottom-left",
  "theme": "classic",
  "palette": {
    "popup": {
      "background": "#ef550b",
      "text": "#ffffff",
      "link": "#ffffff"
    },
    "button": {
      "background": "#fefefe",
      "text": "#000000",
      "border": "transparent"
    }
  },
  "type": "opt-out",
  "content": {
    "message": "Utilizziamo i cookie essenziali per far funzionare il nostro sito. Con il tuo consenso, potremmo anche utilizzare i cookie non essenziali per migliorare l'esperienza utente e analizzare il traffico verso il sito web. Cliccando su “Accetta“, acconsenti all'utilizzo dei cookie da parte del nostro sito web secondo quanto descritto nella nostra Politica sull'utilizzo dei cookie.",
    "dismiss": "Capito!",
    "deny": "Rifiuta",
    "allow": "Consenti",
    "link": "Scopri di più",
    "href": "/privacy-policy",
    "policy": "Cookie Policy"
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideNgcCookieConsent(cookieConfig),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideNativeDateAdapter(),
    provideLottieOptions({
      player: () => player,
    }),
    importProvidersFrom([BrowserModule, BrowserAnimationsModule]),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
};
