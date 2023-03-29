import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Yad2APIURL } from 'src/assets/api/api';
import {
  Yad2ErrorResponse,
  Yad2Response,
} from '../models/yad2-response.interface';
import { User } from '../models/user.interface';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private tokenService: TokenService, private http: HttpClient) {
    this.setSession();
  }

  user: User | null = null;
  isLoggedIn = false;

  setSession() {
    const token = this.tokenService.getToken();
    if (!token) return;

    const isTokenExpired = this.tokenService.isTokenExpired();
    if (isTokenExpired) {
      this.tokenService.removeToken();
    }
    this.setUser();
  }

  private setUser() {
    this.http
      .get<Yad2Response>(`${Yad2APIURL}/users`)
      .pipe(map((r) => (this.user = <User>r.data)))
      .subscribe({
        next: () => {
          this.isLoggedIn = true;
        },
        error: (err: Yad2ErrorResponse) => {
          if (err.code === 'ID_NOT_FOUND') {
            console.log('Token expired, removing...');
            this.tokenService.removeToken();
          }
        },
        complete: () => {
          console.log('You are logged in.');
        },
      });
  }
}
