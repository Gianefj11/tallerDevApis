import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
const token = 'auth_session';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor( private router: Router,
               public auth: AuthService ) { }


  signOut(): void {
    window.sessionStorage.clear();
    this.auth.valiGian =false;
    this.router.navigate(['/auth']);
  }

  public SaveToken(session: any): void {
    window.sessionStorage.removeItem(token);
    window.sessionStorage.setItem(token, JSON.stringify(session));
  }

  public getToken(): any {
    return JSON.parse(sessionStorage.getItem(token)!);
  }

}
