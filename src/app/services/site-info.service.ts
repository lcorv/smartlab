import { Injectable } from '@angular/core';
import { OPERATORI } from '../shared/operatori';
import { Observable, of } from 'rxjs';
import { SiteInfo } from '../shared/siteInfo';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SiteInfoService {
  apiUrl = environment.api;
  endpoint = 'siteinfo'

  constructor(private http: HttpClient) { }

  getSiteInfo(): Observable<SiteInfo> {
    let url = `${this.apiUrl}${this.endpoint}/`
    return this.http.get<SiteInfo>(url);
  }

  updateSiteInfo(data): Observable<any> {
    return this.http.put(`${this.apiUrl}${this.endpoint}/`, data)
  }

  saveSiteInfo(data): Observable<any> {
    return this.http.post(`${this.apiUrl}${this.endpoint}/`, data)
  }

  deleteSiteInfo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${this.endpoint}/?id=${id}`)
  }
}
