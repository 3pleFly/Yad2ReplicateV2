import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SessionService } from 'src/app/core/services/session.service';
import { Yad2Response } from 'src/app/core/models/yad2-response.interface';
import { Yad2APIURL } from 'src/assets/api/api';
import { AuthenticationDto } from '../models/authenticationDto.interface';
import { TokenService } from 'src/app/core/services/token.service';
@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    private tokenService: TokenService
  ) {}

  login(credentials: AuthenticationDto) {
    return this.http
      .post<Yad2Response>(`${Yad2APIURL}/auth/signin`, {
        username: credentials.username,
        password: credentials.password,
      })
      .pipe(
        tap((r) => this.tokenService.saveToken(r.data.token)),
        tap((_) => this.sessionService.setSession())
      );
  }

  register(credentials: AuthenticationDto): Observable<Yad2Response> {
    return this.http.post<Yad2Response>(`${Yad2APIURL}/auth/signup`, {
      username: credentials.username,
      password: credentials.password,
    });
  }
}
