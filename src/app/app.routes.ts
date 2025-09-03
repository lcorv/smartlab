import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { LogoComponent } from './logo/logo.component';
import { ServiziComponent } from './servizi/servizi.component';
import { ServizioComponent } from './servizio/servizio.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { GestisciOperatoriComponent } from './gestisci-operatori/gestisci-operatori.component';
import { CreateOperatoreComponent } from './create-operatore/create-operatore.component';

export const routes: Routes = [
  {component: HomeComponent, path:'', pathMatch: 'full'},
  {component: HomeComponent, path:'home', data:{tab:1, name: 'home'}},
  {component: AboutComponent, path:'chi-siamo', data:{tab:2, name: 'Chi siamo'}},
  {component: ContactComponent, path:'contact', data:{tab:3, name: 'Contatti'}},
  {component: ServiziComponent, path:'servizi', data:{tab:4, name: 'Servizi'}},
  {component: ServizioComponent, path:'servizi/:id', data:{tab:4, name: 'Servizio'}},
  {component: LoginComponent, path:'login', data:{tab:4, name: 'Login'}},
  {component: LogoComponent, path: 'logo'},
  {component: AdminComponent, path: 'admin-smartlab', data:{tab:5, name: 'Admin'}, canActivate: [AuthGuard]},
  {component: GestisciOperatoriComponent, path:'gestisci-operatori', canActivate: [AuthGuard]},
  {component: CreateOperatoreComponent, path: 'crea-operatore', canActivate: [AuthGuard]}
]
