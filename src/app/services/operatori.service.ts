import { Injectable } from '@angular/core';
import { OPERATORI } from '../shared/operatori';
import { Observable, of } from 'rxjs';
import { Operatore } from '../shared/operatore';

@Injectable({
  providedIn: 'root'
})
export class OperatoriService {

  Operatori: Operatore[] = OPERATORI;

  constructor() { }

  getOperatori():Observable<Operatore[]>{
    return of(this.Operatori);
  }
}
