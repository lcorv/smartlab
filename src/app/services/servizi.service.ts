import { Injectable } from '@angular/core';
import { SERVIZI } from '../shared/servizi';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiziService {
  servizi = SERVIZI
  constructor() { }
  getServizi(){
    return of(this.servizi);
  }
}
