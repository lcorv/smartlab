import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  apiUrl = environment.api;
  endpoint = 'recensioni'
  mapsApi = environment.mapsApi;
  mapsId = environment.mapsId;

  constructor(private http: HttpClient) { }

  getReviews(){
    let url = `${this.apiUrl}${this.endpoint}/?place_id=000`
    return this.http.get(url)
  }
}
