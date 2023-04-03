import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  defer,
  Observable,
  of,
  ReplaySubject,
  shareReplay,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Yad2APIURL } from 'src/assets/api/api';
import {
  Yad2ErrorResponse,
  Yad2Response,
} from '../models/yad2-response.interface';
import { User } from '../models/user.interface';
import { TokenService } from './token.service';
import { Yad2Resource } from '../models/yad2resource.interface';
import { ApiRequestService } from './api-request.service';
@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private _tokenService = inject(TokenService);
  private _http = inject(HttpClient);
  private _apiRequestService = inject(ApiRequestService);

  constructor() {
    this.setSession();
  }

  private _user = new BehaviorSubject<User | null>(null);
  private _propertyStates$!: Observable<Yad2Resource[]>;
  private _propertyType$!: Observable<Yad2Resource[]>;
  private _propertyFeatures$!: Observable<Yad2Resource[]>;


  user$ = this._user.asObservable();

  getPropertyTypes() {
    if (!this._propertyType$) {
      this._propertyType$ = this._apiRequestService
        .getPropertyTypes()
        .pipe(shareReplay(1));
    }
    return this._propertyType$;
  }

  getPropertyStates() {
    if (!this._propertyStates$) {
      this._propertyStates$ = this._apiRequestService
        .getPropertyStates()
        .pipe(shareReplay(1));
    }
    return this._propertyStates$;
  }

  getPropertyFeatures() {
    if (!this._propertyFeatures$) {
      this._propertyFeatures$ = this._apiRequestService
        .getPropertyFeatures()
        .pipe(shareReplay(1), take(1));
    }
    return this._propertyFeatures$;
  }

  setSession() {
    const token = this._tokenService.getToken();
    if (!token) return;

    const isTokenExpired = this._tokenService.isTokenExpired();
    if (isTokenExpired) {
      this._tokenService.removeToken();
    }

    this.setUser();
  }

  private setUser() {
    this._http.get<Yad2Response>(`${Yad2APIURL}/users`).subscribe({
      next: (r) => {
        this._user.next(r.data);
      },
      error: (err: Yad2ErrorResponse) => {
        if (err.code === 'ID_NOT_FOUND') {
          console.log('Token expired, removing...');
          this._tokenService.removeToken();
        }
      },
      complete: () => {
        console.log('You are logged in.');
      },
    });
  }
}
