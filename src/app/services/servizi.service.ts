import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ServiziService {
  private apiUrl = environment.api; // Modifica con l'endpoint corretto
  private endpoint = 'servizi'
  constructor(private http: HttpClient) { }

  getServizi(params?): Observable<any> {
    let url = `${this.apiUrl}${this.endpoint}/`
    if(params){
      params.orderBy?url = `${url}?orderby=${params.orderBy}`:'';
      params.dir?url = `${url}&dir=${params.dir}`:''
    }
    return this.http.get(url);
  }
  updateServizio(data): Observable<any> {
    return this.http.put(`${this.apiUrl}${this.endpoint}?action=update`, data)
  }


  saveServizio(data): Observable<any> {
    return this.http.post(`${this.apiUrl}${this.endpoint}?action=add`, data)
  }

  deleteServizio(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${this.endpoint}/?id=${id}`)
  }
}