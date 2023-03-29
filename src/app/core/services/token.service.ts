import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { ClaimsData } from '../models/claims-data.interface';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isTokenExpired(): boolean {
    const claims = this.decodeToken();
    const now = new Date();
    if (claims) {
      const tokenExpirationDate = new Date(claims.exp * 1000);
      if (tokenExpirationDate > now) return false;
    }
    console.log('token is expired');
    return true;
  }

  private decodeToken(): ClaimsData | null {
    const token = this.getToken();
    if (!token) return null;
    return <ClaimsData>jwtDecode(token);
  }
}
