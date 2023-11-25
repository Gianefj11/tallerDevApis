import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { LoginComponent } from '../pages/login/login.component';
import { Login, User } from '../../../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.apiUrl;
  public isLoged!: Observable<boolean>;
  public valiGian:boolean = false;
  constructor(
    private http: HttpClient
  ) { }

  login(user:User):Observable<HttpResponse<Login>> {
    const url = `${ this.baseUrl }/auth/login`;
    const body = {
      email: user.email,
      password: user.password
    }
    return this.http.post<Login>(url, body, {observe: 'response'});
  }

  register(user:User):Observable<HttpResponse<Login>> {
    const url = `${ this.baseUrl }/auth/register`;
    const body = {
      username: user.username,
      email: user.email,
      password: user.password
    }
    return this.http.post<Login>(url, body, {observe: 'response'});
  }

}
