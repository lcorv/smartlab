import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Orario } from '../shared/orario';

@Injectable({
  providedIn: 'root'
})
export class OrariService {

  private apiUrl = environment.api; // Modifica con l'endpoint corretto
  private endpoint = 'orari'
  constructor(private http: HttpClient) { }


  getOrari(): Observable<Orario[]> {
    let url = `${this.apiUrl}${this.endpoint}/`
    return this.http.get<Orario[]>(url);
  }

  updateOrari(data): Observable<any> {
    return this.http.put(`${this.apiUrl}${this.endpoint}/`, data)
  }

  saveOrario(data): Observable<any> {
    return this.http.post(`${this.apiUrl}${this.endpoint}/`, data)
  }

}
