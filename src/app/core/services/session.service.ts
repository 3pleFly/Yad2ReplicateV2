import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
} from 'rxjs';
import { Yad2APIURL } from 'src/assets/api/api';
import { Yad2Response } from '../models/yad2-response.interface';
import { User } from '../models/user.interface';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private tokenService: TokenService, private http: HttpClient) {
    this.setSession();
  }

  private _user = new BehaviorSubject<User | null>(null);
  public user$ = this._user.asObservable();

  setSession() {
    const token = this.tokenService.getToken();
    if (!token) return;

    const isTokenExpired = this.tokenService.isTokenExpired();
    if (isTokenExpired) {
      this.tokenService.removeToken();
    }

    this.getUser();
  }

  getUser() {
    this.http
      .get<Yad2Response>(`${Yad2APIURL}/user`)
      .pipe(map((r) => this._user.next(<User>r.data)))
      .subscribe();
  }

  isLoggedIn(): boolean {
    return this.tokenService.getToken() ? true : false;
  }
}
