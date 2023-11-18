import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dev } from 'src/app/interface/interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DevsService {

  apiURL: string = environment.apiUrl;

  constructor( private http: HttpClient ) { }

  getDevs(): Observable<HttpResponse<Dev[]>>{
    return this.http.get<Dev[]>(`${this.apiURL}/devs`, {observe: 'response'});
  }

  getDevById(id: number): Observable<HttpResponse<Dev>>{
    return this.http.get<Dev>(`${this.apiURL}/devs/${id}`, {observe: 'response'});
  }

  createDev(dev: Dev): Observable<HttpResponse<Dev>>{
    return this.http.post<Dev>(`${this.apiURL}/devs`, dev, {observe: 'response'});
  }

  updateDev(dev: Dev): Observable<HttpResponse<Dev>>{
    return this.http.put<Dev>(`${this.apiURL}/devs/${dev.id}`, dev, {observe: 'response'});
  }

  deleteDev(id: number): Observable<HttpResponse<Dev>>{
    return this.http.delete<Dev>(`${this.apiURL}/devs/${id}`, {observe: 'response'});
  }
}
