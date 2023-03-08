import { Injectable } from '@angular/core';
import { LocalStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private lss: LocalStorageService) {}

  setSession(token: string) {
    this.lss.saveToken(token);
  }

  isLoggedIn(): boolean {
    return this.lss.getToken() ? true : false;
  }
}
