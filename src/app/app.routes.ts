import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { LogoComponent } from './logo/logo.component';
import { ServiziComponent } from './servizi/servizi.component';
import { ServizioComponent } from './servizio/servizio.component';

export const routes: Routes = [
  {component: HomeComponent, path:'', pathMatch: 'full'},
  {component: HomeComponent, path:'home', data:{tab:1, name: 'home'}},
  {component: AboutComponent, path:'chi-siamo', data:{tab:2, name: 'Chi siamo'}},
  {component: ContactComponent, path:'contact', data:{tab:3, name: 'Contatti'}},
  {component: ServiziComponent, path:'servizi', data:{tab:4, name: 'Servizi'}},
  {component: ServizioComponent, path:'servizi/:id', data:{tab:4, name: 'Servizio'}},
  {component: LogoComponent, path: 'logo'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
