import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
    data: { tab: 1, name: 'home' },
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
    data: { tab: 1, name: 'home' },
  },
  {
    path: 'chi-siamo',
    loadComponent: () =>
      import('./about/about.component').then((c) => c.AboutComponent),
    data: { tab: 2, name: 'Chi siamo' },
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./contact/contact.component').then((c) => c.ContactComponent),
    data: { tab: 3, name: 'Contatti' },
  },
  {
    path: 'servizi',
    loadComponent: () =>
      import('./servizi/servizi.component').then((c) => c.ServiziComponent),
    data: { tab: 4, name: 'Servizi' },
  },
  {
    path: 'servizi/:id',
    loadComponent: () =>
      import('./servizio/servizio.component').then((c) => c.ServizioComponent),
    data: { tab: 4, name: 'Servizio' },
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginComponent),
    data: { tab: 4, name: 'Login' },
  },
  {
    path: 'logo',
    loadComponent: () =>
      import('./logo/logo.component').then((c) => c.LogoComponent),
  },
  {
    path: 'admin-smartlab',
    loadComponent: () =>
      import('./admin/admin.component').then((c) => c.AdminComponent),
    data: { tab: 5, name: 'Admin' },
    canActivate: [AuthGuard],
  },
  {
    path: 'gestisci-operatori',
    loadComponent: () =>
      import('./gestisci-operatori/gestisci-operatori.component').then(
        (c) => c.GestisciOperatoriComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'crea-operatore',
    loadComponent: () =>
      import('./create-operatore/create-operatore.component').then(
        (c) => c.CreateOperatoreComponent
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./privacy-policy/privacy-policy.component').then(
        (c) => c.PrivacyPolicyComponent
      ),
    data: { tab: 5, name: 'Privacy policy' },
  },
];