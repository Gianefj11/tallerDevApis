import { Injectable } from '@angular/core';
const token = 'auth_session';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }


  signOut(): void {
    window.sessionStorage.clear();
  }

  public SaveToken(session: any): void {
    window.sessionStorage.removeItem(token);
    window.sessionStorage.setItem(token, JSON.stringify(session));
  }

  public getToken(): any {
    return JSON.parse(sessionStorage.getItem(token)!);
  }

}
