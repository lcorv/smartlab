import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Avviso } from '../shared/avviso';

@Injectable({
  providedIn: 'root'
})
export class AvvisiService {
private apiUrl = environment.api; // Modifica con l'endpoint corretto
  private endpoint = 'avvisi'
  constructor(private http: HttpClient) { }

  getAvvisi(params?): Observable<Avviso[]> {
    let url = `${this.apiUrl}${this.endpoint}/`
    if(params){
      params.orderBy?url = `${url}?orderby=${params.orderBy}`:'';
      params.dir?url = `${url}&dir=${params.dir}`:''
    }
    return this.http.get<Avviso[]>(url);
  }
  updateAvviso(data:Avviso): Observable<any> {
    return this.http.put(`${this.apiUrl}${this.endpoint}/`, data)
  }


  saveAvviso(data:any): Observable<any> {
    return this.http.post(`${this.apiUrl}${this.endpoint}/`, data)
  }

  deleteAvviso(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${this.endpoint}/?id=${id}`)
  }
}
