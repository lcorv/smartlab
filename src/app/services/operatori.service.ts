import { Injectable } from '@angular/core';
import { OPERATORI } from '../shared/operatori';
import { Observable, of } from 'rxjs';
import { Operatore } from '../shared/operatore';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OperatoriService {
  apiUrl = environment.api;
  endpoint = 'operatori'

  Operatori: Operatore[] = OPERATORI;

  constructor(private http: HttpClient) { }

  getOperatori(params?): Observable<Operatore[]> {
    let url = `${this.apiUrl}${this.endpoint}/`
    if(params){
      params.orderBy?url = `${url}?orderby=${params.orderBy}`:'';
      params.dir?url = `${url}&dir=${params.dir}`:''
    }
    return this.http.get<Operatore[]>(url);
  }

  updateOperatore(data): Observable<any> {
    return this.http.put(`${this.apiUrl}${this.endpoint}/`, data)
  }

  saveOperatore(data): Observable<any> {
    return this.http.post(`${this.apiUrl}${this.endpoint}/`, data)
  }

  deleteOpertatore(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${this.endpoint}/?id=${id}`)
  }
}
