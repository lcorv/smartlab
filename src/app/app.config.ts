import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { provideHttpClient } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideLottieOptions } from 'ngx-lottie';

import  player  from 'lottie-web';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(withInterceptorsFromDi()),
    provideNativeDateAdapter(),
      provideLottieOptions({
      player: () => player,
    }),
    importProvidersFrom([BrowserModule, BrowserAnimationsModule]),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }

  ]
};
